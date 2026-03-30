import { toolsCommand } from "./commands/tools.js";
import { learnCommand } from "./commands/learn.js";
import { searchCommand } from "./commands/search.js";
import { statusCommand } from "./commands/status.js";
import { formatOutput } from "./lib/output.js";

const VERSION = "0.3.0";

function printHelp(): void {
  const help = `agnt v${VERSION} — Agent-friendly tool discovery for solo developers

Usage: agnt <command> [options]

Commands:
  tools list                    List all tools in the registry
  tools info <id>               Get detailed info about a tool
  tools recommend --context "…" Get tool recommendations for a context
  learn --day <N>               Get curriculum day overview
  search <query>                Search tools and curriculum
  status                        Show CLI version and registry stats

Options:
  --pretty                      Human-readable output (default: JSON)
  --help, -h                    Show this help message
  --version, -v                 Show version

Examples:
  agnt tools list
  agnt tools info exa-search
  agnt tools recommend --context "analytics for my landing page"
  agnt learn --day 3
  agnt search "web scraping"

All output is JSON by default (for AI agents).
Use --pretty for human-readable formatting.`;

  console.log(help);
}

function main(): void {
  const args = process.argv.slice(2);
  const pretty = args.includes("--pretty");
  const filteredArgs = args.filter((a: string) => a !== "--pretty");

  if (filteredArgs.length === 0 || filteredArgs.includes("--help") || filteredArgs.includes("-h")) {
    printHelp();
    process.exit(0);
  }

  if (filteredArgs.includes("--version") || filteredArgs.includes("-v")) {
    console.log(VERSION);
    process.exit(0);
  }

  const command = filteredArgs[0];
  const subArgs = filteredArgs.slice(1);

  try {
    let result: unknown;

    switch (command) {
      case "tools":
        result = toolsCommand(subArgs);
        break;
      case "learn":
        result = learnCommand(subArgs);
        break;
      case "search":
        result = searchCommand(subArgs);
        break;
      case "status":
        result = statusCommand();
        break;
      default:
        console.error(formatOutput({ error: `Unknown command: ${command}`, code: "UNKNOWN_COMMAND" }, false));
        process.exit(1);
    }

    console.log(formatOutput(result, pretty));
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(formatOutput({ error: message, code: "ERROR" }, false));
    process.exit(1);
  }
}

main();
