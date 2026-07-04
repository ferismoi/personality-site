import type { Metadata } from "next";
import Link from "next/link";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: "恋愛タイプ診断(β) | 16タイプでわかるあなたの恋愛スタイル",
  description:
    "24の質問に答えるだけで、あなたの恋愛スタイルを16タイプで診断。相性のいいタイプもわかる無料診断テスト。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full scroll-smooth">
      <body
        className={`${notoSansJP.className} flex min-h-full flex-col bg-white text-gray-900 antialiased`}
      >
        {/* ヘッダー: ロゴ + ナビ + CTA */}
        <header className="sticky top-0 z-30 border-b border-gray-100 bg-white">
          <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5">
            <Link
              href="/"
              className="flex items-center gap-2 text-base font-black tracking-tight text-gray-900"
            >
              <span className="text-xl">💘</span>
              <span>
                恋愛タイプ診断
                <span className="ml-1.5 align-middle text-[10px] font-bold text-gray-300">
                  beta
                </span>
              </span>
            </Link>
            <nav className="flex items-center gap-1 sm:gap-2">
              <Link
                href="/#types"
                className="hidden rounded-xl px-3 py-2 text-sm font-bold text-gray-500 transition hover:bg-gray-50 hover:text-gray-800 sm:block"
              >
                16タイプ一覧
              </Link>
              <Link
                href="/#about"
                className="hidden rounded-xl px-3 py-2 text-sm font-bold text-gray-500 transition hover:bg-gray-50 hover:text-gray-800 sm:block"
              >
                この診断について
              </Link>
              <Link
                href="/test"
                className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-black text-white transition hover:bg-violet-700 active:scale-[0.97]"
              >
                診断する
              </Link>
            </nav>
          </div>
        </header>

        <div className="flex-1">{children}</div>

        {/* フッター */}
        <footer className="mt-20 border-t border-gray-100 bg-gray-50">
          <div className="mx-auto w-full max-w-5xl px-5 py-10">
            <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
              <div>
                <p className="flex items-center gap-2 text-sm font-black">
                  <span>💘</span> 恋愛タイプ診断(β)
                </p>
                <p className="mt-2 max-w-xs text-xs leading-relaxed text-gray-400">
                  24の質問で、あなたの恋愛スタイルを16タイプで診断する無料テストです。
                </p>
              </div>
              <nav className="flex gap-10 text-xs font-bold text-gray-500">
                <div className="flex flex-col gap-2.5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">
                    メニュー
                  </p>
                  <Link href="/test" className="hover:text-gray-800">
                    診断テスト
                  </Link>
                  <Link href="/#types" className="hover:text-gray-800">
                    16タイプ一覧
                  </Link>
                  <Link href="/#about" className="hover:text-gray-800">
                    この診断について
                  </Link>
                </div>
              </nav>
            </div>
            <p className="mt-10 border-t border-gray-200 pt-6 text-[11px] leading-relaxed text-gray-400">
              ※本診断はユングのタイプ論を参考にしたエンターテインメントコンテンツです。MBTI®(The
              Myers-Briggs
              Company)とは関係ありません。診断結果は性格や相性を保証するものではありません。
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
