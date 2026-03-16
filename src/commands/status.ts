import { loadTools } from "../lib/registry.js";

export function statusCommand(): unknown {
  const tools = loadTools();
  const categories = [...new Set(tools.map((t) => t.category))];

  return {
    version: "0.2.0",
    registry: {
      total_tools: tools.length,
      categories,
      tools: tools.map((t) => t.id),
    },
    ecosystem: {
      agent_plugins: {
        repo: "https://github.com/october-academy/agent-plugins",
        total_plugins: 16,
        install: "npx skills add october-academy/agent-plugins -a claude-code --skill '*' -y",
      },
      blog: {
        url: "https://agentic30.app/blog",
        tool_guides: tools.filter((t) => t.blog_url).length,
      },
      curriculum: {
        url: "https://agentic30.app/learn",
        total_days: 31,
      },
    },
    project: {
      name: "agnt",
      description: "Agent-friendly tool discovery for solo developers",
      homepage: "https://agentic30.app",
      repository: "https://github.com/october-academy/agnt-cli",
    },
  };
}
