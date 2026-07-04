import Link from "next/link";
import { LOVE_TYPES, GROUPS, type GroupKey } from "@/lib/loveTypes";
import { GROUP_META } from "@/lib/theme";
import TypeAvatar from "@/components/TypeAvatar";

const STEPS = [
  {
    emoji: "📝",
    title: "24の質問に答える",
    desc: "深く考えず、直感で。所要時間は約5分です。",
  },
  {
    emoji: "💘",
    title: "恋愛タイプが判明",
    desc: "16タイプの中から、あなたの恋愛スタイルを判定します。",
  },
  {
    emoji: "💞",
    title: "相性までわかる",
    desc: "あなたと相性のいいタイプもチェックできます。",
  },
];

export default function Home() {
  const groups = Object.keys(GROUPS) as GroupKey[];
  const heroTypes = ["ENFP", "INTJ", "ESFP", "INFJ"].map((c) => LOVE_TYPES[c]);

  return (
    <main>
      {/* ヒーロー(白背景・紫はアクセントのみ) */}
      <section className="mx-auto w-full max-w-5xl px-5 pt-16 text-center sm:pt-20">
        <p className="inline-block rounded-full bg-violet-50 px-4 py-1.5 text-xs font-bold tracking-widest text-violet-600">
          16タイプ恋愛スタイル診断
        </p>
        <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-gray-900 sm:text-5xl">
          あなたの恋は、
          <br className="sm:hidden" />
          <span className="text-violet-600">どのタイプ?</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-gray-500 sm:text-base">
          24の質問に直感で答えるだけで、あなたの恋愛スタイルと相性のいい相手がわかります。登録不要・完全無料。
        </p>

        {/* キャラクターの顔ぶれ */}
        <div className="mt-10 flex justify-center -space-x-3">
          {heroTypes.map((t) => (
            <TypeAvatar key={t.code} type={t} size="sm" />
          ))}
          <div className="grid h-12 w-12 place-items-center rounded-full bg-violet-50 text-xs font-black text-violet-600 ring-4 ring-white">
            +12
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center">
          <Link
            href="/test"
            className="w-full max-w-sm rounded-2xl bg-violet-600 py-4 text-center text-base font-black text-white shadow-sm transition hover:bg-violet-700 active:scale-[0.97]"
          >
            無料で診断をはじめる →
          </Link>
          <p className="mt-3 text-xs font-medium text-gray-400">
            全24問 / 約5分 / 登録不要
          </p>
        </div>
      </section>

      {/* 3ステップ */}
      <section id="about" className="mx-auto w-full max-w-5xl px-5 pt-20">
        <h2 className="text-center text-2xl font-black tracking-tight text-gray-900">
          かんたん3ステップ
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <div
              key={s.title}
              className="relative rounded-3xl border border-gray-100 bg-white p-6 text-center"
            >
              <span className="absolute left-5 top-5 text-xs font-black text-gray-200">
                0{i + 1}
              </span>
              <p className="text-4xl">{s.emoji}</p>
              <h3 className="mt-4 text-base font-black text-gray-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 16タイプ一覧 */}
      <section
        id="types"
        className="mx-auto w-full max-w-5xl scroll-mt-20 px-5 pt-20"
      >
        <h2 className="text-center text-2xl font-black tracking-tight text-gray-900">
          16の恋愛タイプ
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          あなたはどのタイプ? 診断テストで確かめよう
        </p>

        {groups.map((g) => {
          const meta = GROUP_META[g];
          return (
            <div key={g} className="mt-10">
              <div className="flex items-center gap-3">
                <h3 className={`text-base font-black ${meta.tintText}`}>
                  {meta.label}
                </h3>
                <div className="h-px flex-1 bg-gray-100" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {Object.values(LOVE_TYPES)
                  .filter((t) => t.group === g)
                  .map((t) => (
                    <div
                      key={t.code}
                      className="rounded-3xl border border-gray-100 bg-white p-5 text-center"
                    >
                      <div className="flex justify-center">
                        <TypeAvatar type={t} size="sm" />
                      </div>
                      <p className="mt-3 text-sm font-black text-gray-800">
                        {t.name}
                      </p>
                      <p className="mt-1 text-[10px] font-bold tracking-[0.2em] text-gray-400">
                        {t.code}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* 下部CTA */}
      <section className="mx-auto w-full max-w-5xl px-5 pt-20">
        <div className="rounded-[2.5rem] bg-violet-50 px-6 py-14 text-center">
          <h2 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
            自分のタイプ、気になりませんか?
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            5分後、あなたは自分の恋愛のクセを知っています。
          </p>
          <Link
            href="/test"
            className="mt-8 inline-block w-full max-w-sm rounded-2xl bg-violet-600 py-4 text-base font-black text-white shadow-sm transition hover:bg-violet-700 active:scale-[0.97]"
          >
            無料で診断をはじめる →
          </Link>
        </div>
      </section>
    </main>
  );
}
