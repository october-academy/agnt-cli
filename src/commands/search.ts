import { searchTools } from "../lib/registry.js";

export function searchCommand(args: string[]): unknown {
  const query = args.join(" ").trim();

  if (!query) {
    throw new Error("Search query required. Usage: agnt search <query>");
  }

  const toolResults = searchTools(query);

  return {
    query,
    results: {
      tools: toolResults.map((t) => ({
        id: t.id,
        name: t.name,
        category: t.category,
        tagline: t.tagline,
        blog_url: t.blog_url,
      })),
      total: toolResults.length,
    },
  };
}
