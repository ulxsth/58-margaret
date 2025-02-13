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
		case "gemini":
			return await askGemini(prompt,options);
		default:
			throw new Error(`Unsupported model: ${model}`);
	}
}

async function askGPT() {}

// gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function askGemini(prompt){
	try {
		const model = genAI.getGenerativeModel({ model: "gemini-pro"});
		const result = await model.generateContent(prompt);
		const response = result.response;
		const text = response.text();
		return text;
	} catch (error) {
		return error;
	}
}

