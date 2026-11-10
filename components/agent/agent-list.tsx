
import AgentCard, { type AgentCardData } from "./agent-card";

export default function AgentList({
  agents,
}: {
  agents: AgentCardData[];
}) {
  if (agents.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No agents found.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {agents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
}
