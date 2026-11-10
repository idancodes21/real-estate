import { auth } from "@/auth"; 
import { prisma } from "@/lib/prisma";

type Role = "ADMIN" | "MANAGER" | "AGENT" | "CUSTOMER";

export async function requireRole(allowed: Role[]) {
  const session = await auth();
  const id = session?.user?.id;

  if (!id) throw new Error("Not signed in.");

  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, role: true, isActive: true },
  });

  if (!user || !user.isActive || !allowed.includes(user.role)) {
    throw new Error("You are not allowed to do this.");
  }

  return user;
}