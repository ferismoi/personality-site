import { GROUP_META } from "@/lib/theme";
import type { LoveType } from "@/lib/loveTypes";

// タイプごとのオリジナルキャラクター(絵文字+グラデーション円)
export default function TypeAvatar({
  type,
  size = "md",
}: {
  type: LoveType;
  size?: "sm" | "md" | "lg";
}) {
  const g = GROUP_META[type.group];
  const sizes = {
    sm: "h-12 w-12 text-2xl",
    md: "h-20 w-20 text-4xl",
    lg: "h-28 w-28 text-6xl",
  };
  return (
    <div
      className={`${sizes[size]} ${g.avatar} grid shrink-0 place-items-center rounded-full shadow-lg ring-4 ring-white/60`}
    >
      <span className="drop-shadow-sm">{type.emoji}</span>
    </div>
  );
}
