import type { Metadata } from "next";

import AgentList from "@/components/agent/agent-list"; 
import { agents } from "@/data/agents"; 
import Link from "next/link";

export const metadata: Metadata = {
  title: "Agents List",
};

export default function AgentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Agents List</h1>

       <Link
  href="/agent/create"
  className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
>
  + Add Agent
</Link>

      </div>

      {/* <section className="rounded-xl bg-card p-3 sm:p-4">
        <AgentList agents={agents} />
      </section> */}
    </div>
  );
}