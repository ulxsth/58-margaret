import askLLM from "../infra/LLM.js";

/**
 * あいうえお作文の採点を行う。
 * @param {string} text ユーザーが書いたあいうえお作文
 * @return {Map<string, number[]>} 各LLMの名前と、LLMの採点結果（3項目それぞれ）を持つMap
 */

const useLLM = ["gpt","gemini", "groq"];
const result = {};

export async function score(formData) {
	const topic = formData.topic;
	const text = formData.text.map((val) => val).join("\n");

	const prompt = `以下の文章を 3 つの基準で 100 点満点で採点してください。
	### 評価基準:
	1. **関連性**: お題に沿っているか（100 = 完全に沿っている, 1 = ほぼ無関係）
	2. **面白さ**: 意外性やユーモアがあるか（100 = とても面白い, 1 = 退屈）
	3. **表現力**: 言葉のセンスがあるか（100 = 魅力的な言葉遣い, 1 = 単調）
	
	### お題:
	あいうえを作文で，${topic}
	
	### 文章:
	${text}
	
	### 出力フォーマット:
	以下のように関連性，面白さ，表現力について配列の形式で出力だけしてください。最後に採点の際のコメントも一文で配列に加える．
	例
 [100, 90, 95, 'あいうえおの字を使った独創的な表現は、関連性と面白さをある程度保っていますが、文章全体の流れと言葉の選び方がやや単調で、表現力が不足しています。さらに、最後の単語"るーぷ"の使用が少し疑問符を残すため、その部分に何らかの説明や、よりスムーズな結び方が必要かもしれません。']
	
	`;

	for (let i = 0; i < useLLM.length; i++) {
		const res = await askLLM(useLLM[i], prompt);
		result[useLLM[i]] = res;
		// console.log(JSON.parse(res));
	}
	return result;
}

// const formData = {
// 	topic: "あいしてる",
// 	text: ["あなたを", "いつも", "しょっちゅう", "ていきてきに", "るーぷする"],
// };

// const output = await score(formData);
// console.log('=====================');
// console.log(output.gpt);
// console.log('=====================');
// console.log(output.gemini);
// console.log('=====================');
// console.log(output.groq);
