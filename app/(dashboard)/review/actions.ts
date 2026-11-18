"use server";

import { revalidatePath } from "next/cache";

import { requireRole } from "@/lib/require-role";
import { setReviewStatus } from "@/lib/reviews";

export async function approveReview(id: string) {
  await requireRole(["ADMIN", "MANAGER"]); 
  await setReviewStatus(id, "PUBLISHED");
  revalidatePath("/review");
}

export async function rejectReview(id: string) {
  await requireRole(["ADMIN", "MANAGER"]);
  await setReviewStatus(id, "DELETED");
  revalidatePath("/review");
}