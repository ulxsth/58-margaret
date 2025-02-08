import { startsWithHiragana } from "../../src/domain/util";

describe("startsWithHiragana: 指定した平仮名から始まる文字列かを検査する", () => {
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
