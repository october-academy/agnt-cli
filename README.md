# @agentic30/agnt

> Agent-friendly CLI for solo developer tool discovery and curriculum

AI 에이전트가 1인 개발자용 도구를 탐색하고 추천받을 수 있는 CLI 도구입니다.
[Agentic30](https://agentic30.app) 생태계의 일부로, 솔로프리너와 인디해커를 위한 도구 레지스트리를 제공합니다.

## Installation

```bash
npm install -g @agentic30/agnt
```

## Usage

```bash
# 모든 도구 목록
agnt tools list

# 특정 도구 상세 정보
agnt tools info exa-search

# 맥락 기반 도구 추천
agnt tools recommend --context "analytics for my landing page"

# 커리큘럼 개요
agnt learn --day 3

# 도구 + 커리큘럼 검색
agnt search "web scraping"

# CLI 상태
agnt status
```

## Output

모든 명령어는 기본적으로 JSON을 stdout으로 출력합니다 (AI 에이전트 파싱 최적화).
`--pretty` 플래그로 사람이 읽기 쉬운 포맷을 사용할 수 있습니다.

```bash
agnt tools list --pretty
```

## Tool Registry

| Tool | Category | API | MCP | CLI | SDK |
|------|----------|-----|-----|-----|-----|
| [Exa Search](https://agentic30.app/blog/exa-search-guide) | Research | ✅ | ✅ | ✅ | Python, JS |
| [PostHog](https://agentic30.app/blog/posthog-guide) | Analytics | ✅ | ✅ | - | Python, JS, Node |
| [Adriel](https://agentic30.app/blog/adriel-guide) | Advertising | ✅ | - | - | - |
| [Manus](https://agentic30.app/blog/manus-guide) | AI Agent | ✅ | - | - | - |
| [Genspark](https://agentic30.app/blog/genspark-guide) | Search | ✅ | - | - | - |

## For AI Agents

See [AGENTS.md](./AGENTS.md) for machine-readable documentation.

## License

MIT
