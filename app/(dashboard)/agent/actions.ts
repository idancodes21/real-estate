
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/require-role";
import { agentSchema } from "@/lib/validation/agent";
import {
  uploadAgentAvatar,
  deleteAgentAvatar,
} from "@/lib/cloudinary";

export interface AgentFormState {
  message?: string;
  errors?: Record<string, string[] | undefined>;
  values?: Record<string, string>;
}

const MAX_AVATAR_SIZE = 5 * 1024 * 1024;

const ALLOWED_AVATAR_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export async function createAgent(
  _prevState: AgentFormState,
  formData: FormData,
): Promise<AgentFormState> {
  // Verify permissions
  try {
    await requireRole(["ADMIN", "MANAGER"]);
  } catch {
    return {
      message: "You are not allowed to add agents.",
    };
  }

  // Extract text form values
  const values = Object.fromEntries(
    [...formData.entries()].filter(
      ([, value]) => typeof value === "string",
    ),
  ) as Record<string, string>;

  // Validate form fields
  const parsed = agentSchema.safeParse(values);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      values,
    };
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    dateOfBirth,
    gender,
    country,
  } = parsed.data;

  // Validate profile picture
  const avatarFile = formData.get("avatar");

  if (avatarFile && !(avatarFile instanceof File)) {
    return {
      message: "Invalid profile picture.",
      values,
    };
  }

  if (avatarFile instanceof File && avatarFile.size > 0) {
    if (!ALLOWED_AVATAR_TYPES.includes(avatarFile.type)) {
      return {
        message: "Please upload a JPG, PNG, or WebP image.",
        values,
      };
    }

    if (avatarFile.size > MAX_AVATAR_SIZE) {
      return {
        message: "Profile picture must not exceed 5 MB.",
        values,
      };
    }
  }

  let uploadedAvatar: {
    url: string;
    publicId: string;
  } | null = null;

  try {
    // Upload avatar to Cloudinary if provided
    if (avatarFile instanceof File && avatarFile.size > 0) {
      uploadedAvatar = await uploadAgentAvatar(avatarFile);
    }

    // Create agent and associated user/profile
    await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email,
        phone,
        role: "AGENT",
        avatar: uploadedAvatar?.url ?? null,

        profile: {
          create: {
            country,
            dateOfBirth: new Date(
              `${dateOfBirth}T00:00:00.000Z`,
            ),
            gender,
          },
        },

        agent: {
          create: {},
        },
      },
    });
  } catch (error) {
    console.error("CREATE AGENT ERROR:", error);

    // Remove uploaded image if agent creation fails
    if (uploadedAvatar) {
      try {
        await deleteAgentAvatar(uploadedAvatar.publicId);
      } catch (cleanupError) {
        console.error("AVATAR CLEANUP ERROR:", cleanupError);
      }
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return {
        errors: {
          email: ["This email is already in use."],
        },
        values,
      };
    }

    return {
      message: "Something went wrong. Please try again.",
      values,
    };
  }

  revalidatePath("/agent");
  redirect("/agent");
}
