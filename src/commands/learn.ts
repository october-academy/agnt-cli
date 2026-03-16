import { loadTools } from "../lib/registry.js";

interface DayOverview {
  day: number;
  title: string;
  description: string;
  tools_referenced: string[];
  curriculum_url: string;
}

const CURRICULUM_DAYS: Record<number, { title: string; description: string }> = {
  0: { title: "견습생의 마을", description: "개발 환경 설정과 AI 에이전트 셋업" },
  1: { title: "자기 소개", description: "자기 소개와 목표 설정" },
  2: { title: "아이디어 탐험", description: "문제 발견과 아이디어 검증" },
  3: { title: "시장 조사", description: "타겟 시장 리서치와 경쟁 분석" },
  4: { title: "SPEC 작성", description: "제품 스펙 정의와 MVP 범위 설정" },
  5: { title: "랜딩 페이지", description: "랜딩 페이지 제작과 배포" },
  6: { title: "피드백 수집", description: "초기 피드백 수집과 분석" },
  7: { title: "회고의 호수", description: "Week 1 회고와 방향 재설정" },
};

export function learnCommand(args: string[]): unknown {
  const dayIndex = args.indexOf("--day");

  if (dayIndex === -1 || args[dayIndex + 1] === undefined) {
    return listDays();
  }

  const dayNum = parseInt(args[dayIndex + 1], 10);
  if (isNaN(dayNum) || dayNum < 0 || dayNum > 30) {
    throw new Error("Day must be a number between 0 and 30.");
  }

  return getDayOverview(dayNum);
}

function listDays(): unknown {
  return {
    total_days: 31,
    available_overviews: Object.keys(CURRICULUM_DAYS).map(Number),
    curriculum_url: "https://agentic30.app/learn",
    message: "Use --day <N> for a specific day overview.",
  };
}

function getDayOverview(day: number): DayOverview {
  const info = CURRICULUM_DAYS[day];
  const tools = loadTools();
  const referencedTools = tools
    .filter((t) => t.curriculum_days?.includes(day))
    .map((t) => t.id);

  return {
    day,
    title: info?.title ?? `Day ${day}`,
    description: info?.description ?? "Curriculum content available on the web.",
    tools_referenced: referencedTools,
    curriculum_url: `https://agentic30.app/learn/day/${day}`,
  };
}
