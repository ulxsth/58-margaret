import fetch from "node-fetch"


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