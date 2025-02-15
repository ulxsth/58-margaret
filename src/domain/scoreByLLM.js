import askLLM from "../infra/LLM.js";

/**
 * あいうえお作文の採点を行う。
 * @param {string} text ユーザーが書いたあいうえお作文
 * @return {Map<string, number[]>} 各LLMの名前と、LLMの採点結果（3項目それぞれ）を持つMap
 */

const useLLM = ["gemini", "groq"];
const result = {};

export async function score(text) {
	const prompt = `以下の文章を 3 つの基準で 100 点満点で採点してください。
	### 評価基準:
	1. **関連性**: お題に沿っているか（100 = 完全に沿っている, 1 = ほぼ無関係）
	2. **面白さ**: 意外性やユーモアがあるか（100 = とても面白い, 1 = 退屈）
	3. **表現力**: 言葉のセンスがあるか（100 = 魅力的な言葉遣い, 1 = 単調）
	
	### お題:
	あいうえを作文で，愛してる
	
	### 文章:
	${text}
	
	### 出力フォーマット:
	JSON 形式で出力だけしてください。
	例
	{'関連性' : 100,'面白さ' : 100,'表現力' : 100}
	`;

	for (let i = 0; i < useLLM.length; i++) {
		const res = await askLLM(useLLM[i], prompt);
		if (!(useLLM[i] === "groq")) {
			result[useLLM[i]] = res;
		} else {
			result[useLLM[i]] = res.choices[0]?.message?.content || "";
		}
	}
	return result;
}

const text = `あなたを
いつも
しょっちゅう
ていきてきに
るーぷして考える`;

const output = await score(text);
console.log(JSON.stringify(output));
