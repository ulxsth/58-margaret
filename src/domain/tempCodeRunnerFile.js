const formData = {
	topic: "あいしてる",
	text: ["あなたを", "いつも", "しょっちゅう", "ていきてきに", "るーぷする"],
};

const output = await score(formData);
console.log(output.gemini);
console.log('=====================');
console.log(output.groq);