import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LOVE_TYPES } from "@/lib/loveTypes";
import { GROUP_META, AXES } from "@/lib/theme";
import TypeAvatar from "@/components/TypeAvatar";

type Params = Promise<{ type: string }>;
type Search = Promise<{ [key: string]: string | string[] | undefined }>;

function num(v: string | string[] | undefined): number | null {
  const s = Array.isArray(v) ? v[0] : v;
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) && n >= 0 && n <= 100 ? Math.round(n) : null;
}

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { type } = await props.params;
  const t = LOVE_TYPES[type?.toUpperCase() ?? ""];
  if (!t) return {};
  return {
    title: `【${t.name}(${t.code})】あなたの恋愛タイプ | 恋愛タイプ診断`,
    description: t.catch,
  };
}

export default async function ResultPage(props: {
  params: Params;
  searchParams: Search;
}) {
  const { type } = await props.params;
  const sp = await props.searchParams;

  const t = LOVE_TYPES[type?.toUpperCase() ?? ""];
  if (!t) notFound();

  const meta = GROUP_META[t.group];
  const pcts: Record<string, number | null> = {
    e: num(sp.e),
    n: num(sp.n),
    f: num(sp.f),
    p: num(sp.p),
  };
  const hasScores = Object.values(pcts).every((v) => v !== null);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const shareText = `私の恋愛タイプは【${t.name}(${t.code})】でした💘\n\n#恋愛タイプ診断\n${siteUrl}/result/${t.code}`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  return (
    <main>
      {/* ヒーロー: タイプ名を大きく(明るいパステル背景) */}
      <section className={meta.tintBg}>
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-5 pb-16 pt-14 text-center">
          <p className={`text-xs font-bold tracking-[0.3em] ${meta.tintText}`}>
            {hasScores ? "あなたの恋愛タイプ" : meta.label}
          </p>
          <div className="mt-8">
            <TypeAvatar type={t} size="lg" />
          </div>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
            {t.name}
          </h1>
          <p
            className={`mt-3 rounded-full bg-white px-4 py-1 text-sm font-black tracking-[0.35em] ${meta.tintText}`}
          >
            {t.code}
          </p>
          <p className="mt-7 max-w-md text-base font-bold leading-relaxed text-gray-600">
            「{t.catch}」
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-3xl px-5">
        {/* 特性グラフ */}
        {hasScores && (
          <section className="-mt-8 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-center text-lg font-black tracking-tight">
              あなたの特性バランス
            </h2>
            <div className="mt-7 space-y-7">
              {AXES.map((axis) => {
                const rightPct = pcts[axis.key]!;
                const leftPct = 100 - rightPct;
                const rightWins = rightPct >= 50;
                const winnerLabel = rightWins ? axis.right : axis.left;
                const winnerPct = rightWins ? rightPct : leftPct;
                return (
                  <div key={axis.key}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-[11px] font-black uppercase tracking-widest text-gray-300">
                        {axis.title}
                      </span>
                      <span className={`text-sm font-black ${axis.text}`}>
                        {winnerLabel} {winnerPct}%
                      </span>
                    </div>
                    <div className="relative mt-2.5 h-3 rounded-full bg-gray-100">
                      <div
                        className={`absolute left-0 top-0 h-full rounded-full ${axis.bar} opacity-25`}
                        style={{ width: `${rightPct}%` }}
                      />
                      <div
                        className={`absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 bg-white shadow-md ${axis.bar.replace("bg-", "border-")}`}
                        style={{ left: `${rightPct}%` }}
                      />
                    </div>
                    <div className="mt-2 flex justify-between text-xs font-bold">
                      <span className={rightWins ? "text-gray-300" : "text-gray-600"}>
                        {axis.left}({axis.leftCode}) {leftPct}%
                      </span>
                      <span className={rightWins ? "text-gray-600" : "text-gray-300"}>
                        {axis.right}({axis.rightCode}) {rightPct}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 恋愛スタイル解説 */}
        <section className="mt-10">
          <h2 className="text-lg font-black tracking-tight">
            <span className={meta.tintText}>#</span> あなたの恋愛スタイル
          </h2>
          <p className="mt-4 text-[15px] leading-loose text-gray-900">
            {t.desc}
          </p>
        </section>

        {/* 強み / 注意点 */}
        <section className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-violet-50 p-6 ring-1 ring-inset ring-violet-100">
            <h2 className="text-sm font-black text-violet-700">💪 恋愛での強み</h2>
            <ul className="mt-4 space-y-3">
              {t.good.map((g) => (
                <li
                  key={g}
                  className="flex gap-2.5 text-sm font-medium leading-relaxed text-gray-700"
                >
                  <span className="mt-0.5 text-violet-400">◆</span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-rose-50 p-6 ring-1 ring-inset ring-rose-100">
            <h2 className="text-sm font-black text-rose-700">⚠️ 気をつけたいこと</h2>
            <ul className="mt-4 space-y-3">
              {t.caution.map((c) => (
                <li
                  key={c}
                  className="flex gap-2.5 text-sm font-medium leading-relaxed text-gray-700"
                >
                  <span className="mt-0.5 text-rose-400">◆</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 相性 */}
        <section className="mt-10">
          <h2 className="text-lg font-black tracking-tight">
            <span className={meta.tintText}>#</span> 相性のいいタイプ
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {t.partners.map((code) => {
              const p = LOVE_TYPES[code];
              if (!p) return null;
              const pm = GROUP_META[p.group];
              return (
                <Link
                  key={code}
                  href={`/result/${code}`}
                  className={`rounded-3xl ${pm.tintBg} p-5 text-center ring-1 ring-inset ${pm.tintRing} transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]`}
                >
                  <div className="flex justify-center">
                    <TypeAvatar type={p} size="sm" />
                  </div>
                  <p className={`mt-3 text-sm font-black ${pm.tintText}`}>
                    {p.name}
                  </p>
                  <p className="mt-1 text-[10px] font-bold tracking-[0.2em] text-gray-400">
                    {p.code}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* シェア・再診断 */}
        <section className="mt-12 rounded-[2rem] bg-gray-50 p-6 text-center sm:p-8">
          <p className="text-sm font-black text-gray-700">
            結果をシェアして、友達のタイプも聞いてみよう
          </p>
          <div className="mx-auto mt-5 flex max-w-sm flex-col gap-2.5">
            <a
              href={tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-gray-900 py-4 text-sm font-black text-white shadow-md transition hover:opacity-90 active:scale-[0.98]"
            >
              𝕏 で結果をシェアする
            </a>
            <Link
              href="/test"
              className="rounded-2xl border border-gray-200 bg-white py-4 text-sm font-black text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
            >
              {hasScores ? "もう一度診断する" : "自分のタイプを診断する"}
            </Link>
            <Link
              href="/#types"
              className="py-2 text-xs font-bold text-gray-400 underline"
            >
              16タイプの一覧を見る
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
