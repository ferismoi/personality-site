// 診断の質問データ(全24問 = 4軸 × 6問)
// axis: どの軸の質問か / dir: 「そう思う」と答えたときに加点される側

export type Axis = "EI" | "SN" | "TF" | "JP";
export type Letter = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export type Question = {
  text: string;
  axis: Axis;
  dir: Letter;
};

export const QUESTIONS: Question[] = [
  // ---- 外向(E) / 内向(I) ----
  { text: "気になる人には、自分からアプローチするほうだ", axis: "EI", dir: "E" },
  { text: "楽しいデートのあとでも、一人の時間で気持ちを回復したい", axis: "EI", dir: "I" },
  { text: "恋の話は、友達にどんどん相談する", axis: "EI", dir: "E" },
  { text: "大人数の合コンより、1対1でゆっくり話すほうが好きだ", axis: "EI", dir: "I" },
  { text: "恋人とは、できれば毎日でも会いたい", axis: "EI", dir: "E" },
  { text: "気持ちは口で伝えるより、LINEなどの文章のほうが伝えやすい", axis: "EI", dir: "I" },

  // ---- 現実(S) / 直感(N) ----
  { text: "恋人との将来を想像して、妄想がふくらむことがよくある", axis: "SN", dir: "N" },
  { text: "デートの思い出は、日付や場所など具体的なことで覚えている", axis: "SN", dir: "S" },
  { text: "「運命の人」は存在すると思う", axis: "SN", dir: "N" },
  { text: "デートプランは、行ったことのある定番スポットだと安心する", axis: "SN", dir: "S" },
  { text: "恋愛映画やラブソングの世界観にどっぷり浸るのが好きだ", axis: "SN", dir: "N" },
  { text: "相手の気持ちは、言葉より行動(実際にしてくれたこと)で判断する", axis: "SN", dir: "S" },

  // ---- 思考(T) / 感情(F) ----
  { text: "恋人に悩みを相談されたら、共感よりも解決策を伝えたくなる", axis: "TF", dir: "T" },
  { text: "相手のちょっとした表情の変化にすぐ気づくほうだ", axis: "TF", dir: "F" },
  { text: "恋人選びでは、価値観や将来性などの条件を冷静に見るほうだ", axis: "TF", dir: "T" },
  { text: "恋人が落ち込んでいると、自分までつられて落ち込んでしまう", axis: "TF", dir: "F" },
  { text: "ケンカのときは、感情的にならず筋道を立てて話し合いたい", axis: "TF", dir: "T" },
  { text: "サプライズで相手を喜ばせるのが大好きだ", axis: "TF", dir: "F" },

  // ---- 計画(J) / 柔軟(P) ----
  { text: "デートの計画は、事前にきっちり立てておきたい", axis: "JP", dir: "J" },
  { text: "その日の気分で行き先を決める、ノープランのデートが好きだ", axis: "JP", dir: "P" },
  { text: "交際は「付き合おう」とはっきり決めてから始めたい", axis: "JP", dir: "J" },
  { text: "恋の展開は、成り行きに任せたいタイプだ", axis: "JP", dir: "P" },
  { text: "記念日や誕生日のお祝いは、前もって準備しておくタイプだ", axis: "JP", dir: "J" },
  { text: "安定した関係より、予測できないドキドキのある関係に惹かれる", axis: "JP", dir: "P" },
];

// 7段階の選択肢(左端=そう思わない 〜 右端=そう思う)
export const SCALE = [-3, -2, -1, 0, 1, 2, 3] as const;
