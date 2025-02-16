import {getRandomAI, startsWithHiragana } from "../../src/domain/util";

describe("getRandomAI: 「あい」で始まる単語をランダムに返すか検査する", ()=>{

	// 処理の中の fetch 関数の返り値を固定の値にする
	// 例：アインシュタイン
	describe("正常系",()=>{
		test("'あい'=>true", async()=>{
		const result = await getRandomAI("あい");
		// then
		expect(!!result).toBe(true);
		}
	)});
});

describe("startsWithHiragana: 指定した平仮名から始まる文字列かを検査する", () => {
	describe("正常系", () => {
		test("'あいうえお', 'あ' => true", async () => {
			// given, when
			const result = await startsWithHiragana("あいうえお", "あ");

			// then
			expect(result).toBe(true);
		});

		test("'あいうえお', 'い' => false", async () => {
			// given, when
			const result = await startsWithHiragana("あいうえお", "い");

			// then
			expect(result).toBe(false);
		});

		test("'色は匂へど散りぬるを', 'い' => true", async () => {
			// given, when
			const result = await startsWithHiragana("色は匂へど散りぬるを", "い");

			// then
			expect(result).toBe(true);
		});

		test("'色は匂へど散りぬるを', 'あ' => false", async () => {
			// given, when
			const result = await startsWithHiragana("色は匂へど散りぬるを", "あ");

			// then
			expect(result).toBe(false);
		});
	});
});


