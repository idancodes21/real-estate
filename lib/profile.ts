import { auth } from "@/auth"; 
import { prisma } from "@/lib/prisma";

export async function getProfile() {
  const session = await auth();
  const id = session?.user?.id;

  if (!id) return null;

  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatar: true,
      role: true,
      profile: {
        select: { address: true, city: true, state: true, country: true },
      },
    },
  });
}

export type ProfileUser = NonNullable<Awaited<ReturnType<typeof getProfile>>>;