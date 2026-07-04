// サイト全体で共有するデザイン定義
// Tailwindはクラス名を文字列そのままで検出するので、必ずリテラルで書くこと

import type { GroupKey } from "./loveTypes";

export const GROUP_META: Record<
  GroupKey,
  {
    label: string;
    hero: string; // 結果ページのヒーロー背景
    tintBg: string;
    tintText: string;
    tintRing: string;
    avatar: string; // キャラクター円の背景
  }
> = {
  NT: {
    label: "クールな頭脳派",
    hero: "bg-gradient-to-br from-violet-600 via-violet-600 to-indigo-700",
    tintBg: "bg-violet-50",
    tintText: "text-violet-700",
    tintRing: "ring-violet-200",
    avatar: "bg-gradient-to-br from-violet-400 to-indigo-500",
  },
  NF: {
    label: "夢見るロマンチスト派",
    hero: "bg-gradient-to-br from-fuchsia-500 via-pink-500 to-rose-500",
    tintBg: "bg-pink-50",
    tintText: "text-pink-700",
    tintRing: "ring-pink-200",
    avatar: "bg-gradient-to-br from-fuchsia-400 to-pink-500",
  },
  SJ: {
    label: "誠実な安定派",
    hero: "bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600",
    tintBg: "bg-sky-50",
    tintText: "text-sky-700",
    tintRing: "ring-sky-200",
    avatar: "bg-gradient-to-br from-sky-400 to-blue-500",
  },
  SP: {
    label: "自由な行動派",
    hero: "bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400",
    tintBg: "bg-amber-50",
    tintText: "text-amber-700",
    tintRing: "ring-amber-200",
    avatar: "bg-gradient-to-br from-amber-300 to-orange-400",
  },
};

// 結果ページの特性グラフ(右側の文字に向かうパーセントを表示する)
export const AXES = [
  {
    key: "e",
    title: "エネルギーの向き",
    left: "内向型",
    leftCode: "I",
    right: "外向型",
    rightCode: "E",
    bar: "bg-violet-500",
    text: "text-violet-600",
  },
  {
    key: "n",
    title: "ものの見方",
    left: "現実型",
    leftCode: "S",
    right: "直感型",
    rightCode: "N",
    bar: "bg-sky-500",
    text: "text-sky-600",
  },
  {
    key: "f",
    title: "心の判断",
    left: "思考型",
    leftCode: "T",
    right: "感情型",
    rightCode: "F",
    bar: "bg-rose-500",
    text: "text-rose-600",
  },
  {
    key: "p",
    title: "恋の進め方",
    left: "計画型",
    leftCode: "J",
    right: "柔軟型",
    rightCode: "P",
    bar: "bg-amber-500",
    text: "text-amber-600",
  },
] as const;
