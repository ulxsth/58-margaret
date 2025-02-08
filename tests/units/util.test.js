import { startsWithHiragana } from "../../src/domain/util";

describe("startsWithHiragana は文字列の読みをそのままにして平仮名のみに置換する", () => {
  test("'あいうえお'に対し'あ'が渡されたとき、trueを返す", () => {
    // given, when
    const result = startsWithHiragana("あいうえお", "あ");

    // then
    expect(result).toBe(true);
  });

  test("'あいうえお'に対し'い'が渡されたとき、falseを返す", () => {
    // given, when
    const result = startsWithHiragana("あいうえお", "い");

    // then
    expect(result).toBe(false);
  });

  test("'色は匂へど散りぬるを'に対し'い'が渡されたとき、trueを返す", () => {
    // given, when
    const result = startsWithHiragana("色は匂へど散りぬるを", "い");

    // then
    expect(result).toBe(true);
  });
});
