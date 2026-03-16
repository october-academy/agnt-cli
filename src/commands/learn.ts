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
  1: { title: "자기 소개의 광장", description: "자기 소개와 목표 설정, Discord 커뮤니티 합류" },
  2: { title: "아이디어의 숲", description: "문제 발견과 아이디어 검증, 리서치 도구 활용" },
  3: { title: "인터뷰의 다리", description: "고객 인터뷰와 시장 조사, Mom Test 실전" },
  4: { title: "설계의 탑", description: "SPEC 작성과 MVP 범위 설정, 프로젝트 관리" },
  5: { title: "랜딩의 항구", description: "랜딩 페이지 제작, 배포, 분석 도구 연결" },
  6: { title: "홍보의 거리", description: "프로모션 채널 탐색, 광고, 커뮤니티 운영" },
  7: { title: "회고의 호수", description: "Week 1 회고와 데이터 분석, 방향 재설정" },
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
