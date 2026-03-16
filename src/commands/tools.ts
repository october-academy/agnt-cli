import { loadTools, findTool, recommendTools } from "../lib/registry.js";

export function toolsCommand(args: string[]): unknown {
  const subcommand = args[0];

  switch (subcommand) {
    case "list":
      return listTools();
    case "info":
      return infoTool(args[1]);
    case "recommend":
      return recommend(args);
    default:
      return listTools();
  }
}

function listTools(): unknown {
  const tools = loadTools();
  return tools.map((t) => ({
    id: t.id,
    name: t.name,
    category: t.category,
    tagline: t.tagline,
    agent_interfaces: {
      api: t.agent_interfaces.api.available,
      mcp: t.agent_interfaces.mcp.available,
      cli: t.agent_interfaces.cli.available,
      sdk_count: t.agent_interfaces.sdk.length,
    },
  }));
}

function infoTool(id: string | undefined): unknown {
  if (!id) {
    throw new Error("Tool ID required. Usage: agnt tools info <id>");
  }

  const tool = findTool(id);
  if (!tool) {
    throw new Error(`Tool not found: ${id}. Run 'agnt tools list' to see available tools.`);
  }

  return tool;
}

function recommend(args: string[]): unknown {
  const contextIndex = args.indexOf("--context");
  if (contextIndex === -1 || !args[contextIndex + 1]) {
    throw new Error('Context required. Usage: agnt tools recommend --context "your context"');
  }

  const context = args[contextIndex + 1];
  const results = recommendTools(context);

  if (results.length === 0) {
    return { recommendations: [], message: "No matching tools found for the given context." };
  }

  return {
    context,
    recommendations: results.map((t, i) => ({
      rank: i + 1,
      id: t.id,
      name: t.name,
      tagline: t.tagline,
      quickstart: t.quickstart,
      blog_url: t.blog_url,
    })),
  };
}
