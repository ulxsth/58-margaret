import { tokenize } from "kuromojin";
/**
 * 「あい」から始まる単語をランダムに返す関数。
 * （例. 愛、アイス、アインシュタイン）
 *
 * @return 「あい」から始まる単語
 */
export function getRandomAI() {
	return "愛";
}

/**
 * 文字列が、指定されたひらがなから始まっているかを確かめる関数。
 * @param {string} text 検査したい文字列
 * @param {string} excepted 頭にくることが期待されている文字（例：あ、い）
 * @return {boolean} 指定した文字で始まっているかどうか
 */
export async function startsWithHiragana(text, excepted) {
	if (!text || text === "" || !excepted || excepted === "") {
		throw new Error("引数が不正です");
	}

	if (excepted.length !== 1 || !isHiragana(excepted)) {
		throw new Error("excepted は1文字の平仮名である必要があります");
	}

	const yomi = await convertToYomi(text);
	const hiragana = kanaToHira(yomi);
	console.log(hiragana);
	return hiragana.startsWith(excepted);
}

/**
 * 与えられた文字列を、カタカナのみの読みに変換する関数。
 * @param {string} text 変換対象の文字列
 * @returns 読み（カタカナ）に変換された文字列
 */
async function convertToYomi(text) {
	return tokenize(text).then((tokens) => {
		return tokens
			.map((token) => {
				return token.reading || token.surface_form;
			})
			.join("");
	});
}

function kanaToHira(str) {
	return str.replace(/[\u30a1-\u30f6]/g, (match) => {
		const chr = match.charCodeAt(0) - 0x60;
		return String.fromCharCode(chr);
	});
}

function isHiragana(str) {
	const regex = /^[\p{scx=Hiragana}]+$/u;
	return regex.test(str);
}
