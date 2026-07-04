"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS, SCALE, type Letter } from "@/lib/questions";

const OPPOSITE: Record<Letter, Letter> = {
  E: "I",
  I: "E",
  S: "N",
  N: "S",
  T: "F",
  F: "T",
  J: "P",
  P: "J",
};

// 回答からタイプと各軸のパーセントを計算する
function computeResult(answers: (number | null)[]) {
  const score: Record<Letter, number> = {
    E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0,
  };
  QUESTIONS.forEach((q, i) => {
    const v = answers[i] ?? 0;
    if (v > 0) score[q.dir] += v;
    else if (v < 0) score[OPPOSITE[q.dir]] += -v;
  });
  const pct = (a: Letter, b: Letter) => {
    const total = score[a] + score[b];
    return total === 0 ? 50 : Math.round((score[a] / total) * 100);
  };
  const e = pct("E", "I");
  const n = pct("N", "S");
  const f = pct("F", "T");
  const p = pct("P", "J");
  const type =
    (e >= 50 ? "E" : "I") +
    (n >= 50 ? "N" : "S") +
    (f >= 50 ? "F" : "T") +
    (p >= 50 ? "P" : "J");
  return { type, e, n, f, p };
}

// 7段階ボタン(両端ほど大きい)
const DOT_SIZE = [
  "h-13 w-13 sm:h-14 sm:w-14",
  "h-11 w-11 sm:h-12 sm:w-12",
  "h-9 w-9 sm:h-10 sm:w-10",
  "h-8 w-8",
  "h-9 w-9 sm:h-10 sm:w-10",
  "h-11 w-11 sm:h-12 sm:w-12",
  "h-13 w-13 sm:h-14 sm:w-14",
];

export default function TestPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );
  const [finishing, setFinishing] = useState(false);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  const answeredCount = answers.filter((a) => a !== null).length;
  const progress = Math.round((answeredCount / QUESTIONS.length) * 100);
  const allAnswered = answeredCount === QUESTIONS.length;

  const select = (index: number, value: number) => {
    const next = [...answers];
    next[index] = value;
    setAnswers(next);

    // 次の未回答の質問へ自動スクロール
    const nextUnanswered = next.findIndex((a, i) => a === null && i > index);
    const target =
      nextUnanswered !== -1 ? nextUnanswered : next.findIndex((a) => a === null);
    setTimeout(() => {
      if (target !== -1) {
        blockRefs.current[target]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else {
        blockRefs.current[QUESTIONS.length]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 150);
  };

  const finish = () => {
    if (!allAnswered || finishing) return;
    setFinishing(true);
    const { type, e, n, f, p } = computeResult(answers);
    router.push(`/result/${type}?e=${e}&n=${n}&f=${f}&p=${p}`);
  };

  return (
    <main>
      {/* 固定プログレスバー */}
      <div className="sticky top-16 z-20 border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-12 w-full max-w-3xl items-center gap-4 px-5">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-violet-500 transition-all duration-500"
              style={{ width: `${Math.max(progress, 2)}%` }}
            />
          </div>
          <span className="w-20 text-right text-xs font-black text-gray-500">
            {answeredCount} / {QUESTIONS.length} 問
          </span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl px-5">
        {/* 導入 */}
        <div className="pt-12 text-center">
          <h1 className="text-2xl font-black tracking-tight">恋愛タイプ診断</h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-500">
            それぞれの文章について、あなたにどのくらい当てはまるかを選んでください。
            <br />
            深く考えず、直感で答えるのがコツです。
          </p>
        </div>

        {/* 質問リスト */}
        <div className="mt-8">
          {QUESTIONS.map((q, index) => {
            const answered = answers[index] !== null;
            return (
              <div
                key={index}
                ref={(el) => {
                  blockRefs.current[index] = el;
                }}
                className={`border-b border-gray-100 py-14 text-center transition-opacity duration-300 ${
                  answered ? "opacity-40" : "opacity-100"
                }`}
              >
                <p className="mx-auto max-w-lg text-lg font-bold leading-relaxed tracking-tight sm:text-xl">
                  {q.text}
                </p>

                <div className="mt-8 flex items-center justify-center gap-4 sm:gap-6">
                  <span className="hidden w-20 text-right text-xs font-bold text-gray-400 sm:block">
                    そう思わない
                  </span>
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    {SCALE.map((v, i) => {
                      const selected = answers[index] === v;
                      const idle =
                        v < 0
                          ? "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                          : v > 0
                            ? "border-violet-300 hover:border-violet-400 hover:bg-violet-50"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50";
                      const fill =
                        v < 0
                          ? "border-gray-400 bg-gray-400"
                          : v > 0
                            ? "border-violet-500 bg-violet-500"
                            : "border-gray-300 bg-gray-300";
                      return (
                        <button
                          key={v}
                          aria-label={
                            v === 0
                              ? "どちらでもない"
                              : v > 0
                                ? `そう思う(強さ${v})`
                                : `そう思わない(強さ${-v})`
                          }
                          onClick={() => select(index, v)}
                          className={`${DOT_SIZE[i]} grid place-items-center rounded-full border-[2.5px] transition active:scale-90 ${
                            selected ? fill : idle
                          }`}
                        >
                          {selected && (
                            <span className="text-sm font-black text-white">✓</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <span className="hidden w-20 text-left text-xs font-bold text-violet-500 sm:block">
                    そう思う
                  </span>
                </div>
                {/* スマホ用ラベル */}
                <div className="mx-auto mt-3 flex max-w-xs justify-between text-[11px] font-bold sm:hidden">
                  <span className="text-gray-400">そう思わない</span>
                  <span className="text-violet-500">そう思う</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 結果ボタン */}
        <div
          ref={(el) => {
            blockRefs.current[QUESTIONS.length] = el;
          }}
          className="py-16 text-center"
        >
          {!allAnswered && (
            <p className="text-xs font-bold text-gray-400">
              あと {QUESTIONS.length - answeredCount} 問! すべて答えると結果が見られます
            </p>
          )}
          <button
            onClick={finish}
            disabled={!allAnswered || finishing}
            className={`mt-4 w-full max-w-sm rounded-2xl py-4 text-base font-black transition active:scale-[0.97] ${
              allAnswered
                ? "bg-violet-600 text-white shadow-sm hover:bg-violet-700"
                : "cursor-not-allowed bg-gray-100 text-gray-300"
            }`}
          >
            {finishing ? "結果を計算中…" : "結果を見る →"}
          </button>
        </div>
      </div>
    </main>
  );
}
