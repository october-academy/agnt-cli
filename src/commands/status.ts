import { loadTools } from "../lib/registry.js";

export function statusCommand(): unknown {
  const tools = loadTools();
  const categories = [...new Set(tools.map((t) => t.category))];

  return {
    version: "0.1.0",
    registry: {
      total_tools: tools.length,
      categories,
      tools: tools.map((t) => t.id),
    },
    project: {
      name: "agnt",
      description: "Agent-friendly tool discovery for solo developers",
      homepage: "https://agentic30.app",
      repository: "https://github.com/october-academy/agnt-cli",
    },
  };
}
