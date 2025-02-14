import askLLM from '../infra/LLM.js';

/**
 * あいうえお作文の採点を行う。
 * @param {string} text ユーザーが書いたあいうえお作文
 * @return {Map<string, number[]>} 各LLMの名前と、LLMの採点結果（3項目それぞれ）を持つMap
 */

const useLLM = ['gemini', 'groq'];
let results = {};
function score(text) {
	for (i=0; i < useLLM.length; i++) {
		const res = askLLM(useLLM[i], text);
		const result = {
			name : useLLM[i],
			scores : res
		}
		results = {...results, result};
	}
	return results;
}

score(text);
