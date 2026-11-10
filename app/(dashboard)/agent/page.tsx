
import type { Metadata } from "next";
import Link from "next/link";

import AgentList from "@/components/agent/agent-list";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Agents List",
};

export default async function AgentPage() {
  const agents = await prisma.agent.findMany({
    where: {
      user: {
        role: "AGENT",
      },
    },
    select: {
      id: true,
      designation: true,
      experience: true,
      isVerified: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          avatar: true,
          profile: {
            select: {
              city: true,
              country: true,
            },
          },
        },
      },
      _count: {
        select: {
          properties: true,
          inquiries: true,
        },
      },
    },
    orderBy: {
      user: {
        createdAt: "desc",
      },
    },
  });

  console.log(
  "AGENT AVATARS:",
  agents.map((agent) => ({
    name: agent.user.name,
    avatar: agent.user.avatar,
  })),
);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">
          Agents List
        </h1>

        <Link
          href="/agent/create"
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          + Add Agent
        </Link>
      </div>

      <section className="rounded-xl bg-card p-3 sm:p-4">
        <AgentList agents={agents} />
      </section>
    </div>
  );
}
