import { tokenize } from "kuromojin";
/**
 * 「あい」から始まる単語をランダムに返す関数。
 * （例. 愛、アイス、アインシュタイン）
 *
 * @return 「あい」から始まる単語
 */

// TODO: 出力から，「・」，「=」の除去
// TODO: 文字数制限
export async function getRandomAI() {
	// 取得するページ番号の最大値
	const maxPage = 170;
	// URLのキーワード，ページ番号決定
	const keyWord = "あい";
	const randomPage = Math.floor(Math.random() * maxPage) + 1;

	const apiURL = `https://jisho.org/api/v1/search/words?keyword=${keyWord}&page=${randomPage}#`;

	try {
		// APIによる情報取得
		const response = await fetch(apiURL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		// データをjson形式化
		const jsonData = await response.json();

		if (jsonData) {
			// データ長さ
			const dataNums = jsonData.data.length;
			// ページからランダムに単語取得(読み，単語)
			const randomItem = Math.floor(Math.random() * dataNums);
			const { word, reading } = jsonData.data[randomItem].japanese[0];

			return word && reading ? `${word}(${reading})` : word ? word : reading;
		}
	} catch (error) {
		return console.error(error);
	}
}
// テスト用コード
// const word = await getRandomAI();
// console.log(word);

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
