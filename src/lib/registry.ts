import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export interface AgentInterface {
  available: boolean;
  docs_url?: string;
  package?: string;
  install?: string;
}

export interface SDK {
  lang: string;
  package: string;
}

export interface Tool {
  id: string;
  name: string;
  category: string;
  tagline: string;
  last_verified: string;
  agent_interfaces: {
    api: AgentInterface;
    mcp: AgentInterface;
    cli: AgentInterface;
    sdk: SDK[];
  };
  pricing: {
    free_tier: boolean;
    starting_price: string;
  };
  solopreneur_use_cases: string[];
  curriculum_days?: number[];
  blog_url: string;
  quickstart: string;
}

let cachedTools: Tool[] | null = null;

function getRegistryPath(): string {
  const currentFile = fileURLToPath(import.meta.url);
  const currentDir = dirname(currentFile);
  // In dist: dist/index.js → ../registry/tools
  // In src: src/lib/registry.ts → ../../registry/tools
  const distPath = join(currentDir, "..", "registry", "tools");
  const srcPath = join(currentDir, "..", "..", "registry", "tools");

  try {
    readdirSync(distPath);
    return distPath;
  } catch {
    return srcPath;
  }
}

export function loadTools(): Tool[] {
  if (cachedTools) return cachedTools;

  const toolsDir = getRegistryPath();
  const files = readdirSync(toolsDir).filter((f: string) => f.endsWith(".json"));

  const tools = files.map((file: string) => {
    const content = readFileSync(join(toolsDir, file), "utf-8");
    return JSON.parse(content) as Tool;
  });
  cachedTools = tools;

  return tools;
}

export function findTool(id: string): Tool | undefined {
  return loadTools().find((t) => t.id === id);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase();
  return loadTools().filter((tool) => {
    return (
      tool.id.includes(q) ||
      tool.name.toLowerCase().includes(q) ||
      tool.tagline.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      tool.solopreneur_use_cases.some((uc) => uc.toLowerCase().includes(q))
    );
  });
}

export function recommendTools(context: string): Tool[] {
  const words = context.toLowerCase().split(/\s+/);
  const scored = loadTools().map((tool) => {
    let score = 0;
    const searchable = [
      tool.tagline,
      tool.category,
      ...tool.solopreneur_use_cases,
    ]
      .join(" ")
      .toLowerCase();

    for (const word of words) {
      if (searchable.includes(word)) score++;
    }

    // Boost tools with more agent interfaces
    const interfaces = tool.agent_interfaces;
    if (interfaces.api.available) score += 0.5;
    if (interfaces.mcp.available) score += 0.5;
    if (interfaces.cli.available) score += 0.5;

    return { tool, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.tool);
}
