import { askLLM, askGemini } from "../../src/infra/LLM";


describe("askLLM: 指定したLLMを使用する", ()=>{
  describe("askGemini: Geminiを使用した回答", ()=>{
    test("'あいしてる'がお題 => true", async ()=>{
      const text = `
                  あなたを
                  いつも
                  しょっちゅう
                  ていきてきに
                  るーぷして考える`;

    const inputText = `以下の文章を 3 つの基準で 100 点満点で採点してください。
                    ### 評価基準:
                    1. **関連性**: お題に沿っているか（100 = 完全に沿っている, 1 = ほぼ無関係）
                    2. **面白さ**: 意外性やユーモアがあるか（100 = とても面白い, 1 = 退屈）
                    3. **表現力**: 言葉のセンスがあるか（100 = 魅力的な言葉遣い, 1 = 単調）

                    ### お題:
                    あいうえを作文で，愛してる

                    ### 文章:
                    ${text}

                    ### 出力フォーマット:
                    JSON 形式で出力してください。`;
      const result = await askLLM("gemini", inputText);
      expect(!!result).toBe(true);
    });
  })
})