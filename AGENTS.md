# agnt — Agent-Friendly Tool Discovery for Solo Developers

## What this is

CLI tool that helps AI agents discover and recommend developer tools for solopreneurs, indie hackers, and solo developers. Part of the [Agentic30](https://agentic30.app) ecosystem.

## Installation

```bash
npm install -g @agentic30/agnt
```

## Commands

| Command | Output | Description |
|---------|--------|-------------|
| `agnt tools list` | JSON array | All tools in registry |
| `agnt tools info <id>` | JSON object | Tool detail (API, MCP, CLI, SDK, pricing) |
| `agnt tools recommend --context "..."` | Ranked JSON | Context-based tool recommendations |
| `agnt learn --day N` | JSON object | Curriculum day overview |
| `agnt search <query>` | JSON object | Search tools + curriculum |
| `agnt status` | JSON object | Version + registry stats |

## Output Format

All commands return JSON to stdout. Use `--pretty` for human-readable formatting.
Errors return `{"error": "message", "code": "ERROR_CODE"}` with exit code 1.

## Tool Registry

13 curated tools for solopreneurs:

| ID | Category | API | MCP | CLI |
|----|----------|-----|-----|-----|
| exa-search | research | yes | yes | yes |
| posthog | analytics | yes | yes | no |
| adriel | advertising | yes | no | no |
| manus | ai-agent | yes | no | no |
| genspark | search | yes | no | no |
| railway | deployment | yes | yes | yes |
| linear | project-management | yes | yes | no |
| google-workspace-cli | productivity | yes | no | yes |
| discord | community | yes | no | no |
| agent-browser | browser-automation | no | no | yes |
| vercel-agent-skills | agent-framework | no | no | yes |
| skills-cli | agent-framework | no | no | yes |
| dev3000 | debugging | no | no | yes |

## Agent Plugins

16 curated plugins for AI coding agents: https://github.com/october-academy/agent-plugins
Install: `npx skills add october-academy/agent-plugins -a claude-code --skill '*' -y`

## For AI Agents

This tool is designed to be used by AI agents. Key design decisions:
- JSON output by default (machine-parseable)
- Deterministic responses (no LLM dependency)
- Exit codes for error handling (0 = success, 1 = error)
- Structured error messages with error codes
- Static registry (no network calls, fast execution)
