import type { Metadata } from "next";

import AddAgentForm from "@/components/agent/add-agent-form";

export const metadata: Metadata = {
  title: "Add New Agent",
};

export default function NewAgentPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Add New Agent</h1>
      <AddAgentForm />
    </div>
  );
}