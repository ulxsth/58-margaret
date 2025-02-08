import { startsWithHiragana } from "../../src/domain/util";

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
  })

  describe("異常系", () => {
    test("'', 'あ' => IllegalArgumentError", async () => {
      // given, when
      const result = startsWithHiragana("", "あ");

      // then
      await expect(result).rejects.toThrow("引数が不正です");
    });

    test("'あいうえお', '' => IllegalArgumentError", async () => {
      // given, when
      const result = startsWithHiragana("あいうえお", "");

      // then
      await expect(result).rejects.toThrow("引数が不正です");
    });

    test("'あいうえお', 'あいうえお' => IllegalArgumentError", async () => {
      // given, when
      const result = startsWithHiragana("あいうえお", "あいうえお");

      // then
      await expect(result).rejects.toThrow("excepted は1文字の平仮名である必要があります");
    });

    test("'あいうえお', 'ア' => IllegalArgumentError", async () => {
      // given, when
      const result = startsWithHiragana("あいうえお", "ア");

      // then
      await expect(result).rejects.toThrow("excepted は1文字の平仮名である必要があります");
    });
  })
});
