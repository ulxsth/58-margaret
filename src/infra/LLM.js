// import fetch from "node-fetch";
import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * LLM API に問い合わせる関数。
 * @param {string} model - 使用するモデルの名前。
 * @param {string} prompt - LLM に送信する質問
 * @param {Object} [options={}] - 追加の設定オプション
 * @returns {Promise<string>} - LLMの応答
 * @throws {Error} - APIエラー発生時
 */
export async function askLLM(model, prompt, options = {}) {
	switch (model) {
		case "gpt":
			return await askGPT(prompt, options);
		default:
			throw new Error(`Unsupported model: ${model}`);
	}
}

async function askGPT() {}

// gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function askGemini(_prompt){
	const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = _prompt;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
}

// test
const text = `
あなたを
いつも
しょっちゅう
ていきてきに
るーぷして考える`

const inputText = `以下の文章を 3 つの基準で 100 点満点で採点してください。
### 評価基準:
1. **関連性**: お題に沿っているか（100 = 完全に沿っている, 1 = ほぼ無関係）
2. **面白さ**: 意外性やユーモアがあるか（100 = とても面白い, 1 = 退屈）
3. **表現力**: 言葉のセンスがあるか（100 = 魅力的な言葉遣い, 1 = 単調）

### お題:
あいうえを作文で，愛してる

### 文章:
${text}

### 出力フォーマット:
JSON 形式で出力してください。`;

askGemini(inputText).then((res) => console.log(res));