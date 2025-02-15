// import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";
import axios from "axios";
/**
 * LLM API に問い合わせる関数。
 * @param {string} model - 使用するモデルの名前。
 * @param {string} prompt - LLM に送信する質問
 * @param {Object} [options={}] - 追加の設定オプション
 * @returns {Promise<string>} - LLMの応答
 * @throws {Error} - APIエラー発生時
 */
export default async function askLLM(model, prompt, options = {}) {
	switch (model) {
		case "gpt":
			return await askGPT(prompt, options);
		case "gemini":
			return await askGemini(prompt, options);
		case "groq": {
			const res = await askGroq(prompt, options);
			return res.choices[0].message.content;
		}
		default:
			throw new Error(`Unsupported model: ${model}`);
	}
}

export async function askGPT(prompt) {
	const apiUrl = 'https://api.openai.com/v1/chat/completions';
	try {
    const response = await axios.post(apiUrl, {
      model: 'gpt-3.5-turbo',  // 使用するGPTのモデル
      messages: [{ role: 'user', content: prompt }],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    // レスポンスをコンソールに表示
    // console.log(response.data.choices[0].message.content);
		return response.data.choices[0].message.content
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
  }
}

// gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export async function askGemini(prompt) {
	try {
		const model = genAI.getGenerativeModel({ model: "gemini-pro" });
		const result = await model.generateContent(prompt);
		const response = result.response;
		const text = response.text();
		return text;
	} catch (error) {
		return error;
	}
}

// groq api
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
export async function askGroq(prompt) {
	try {
		return groq.chat.completions.create({
			messages: [
				{
					role: "user",
					content: prompt,
				},
			],
			model: "llama-3.3-70b-versatile",
		});
	} catch (error) {
		return error;
	}
}
