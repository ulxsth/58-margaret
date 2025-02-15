import fs from "node:fs";
import dotenv from "dotenv";
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import { score } from "./domain/scoreByLLM.js";
import {
	convertToYomi,
	getRandomAI,
	startsWithHiragana,
} from "./domain/util.js";
dotenv.config();
const PORT = 8080;
const baseURL = process.env.BASE_URL;

const app = express();
app.use(express.json());
app.use("/assets", express.static("assets"));

app.set("view engine", "ejs");
app.set("views", "views");
app.use(expressEjsLayouts);

// pages
app.get("/", (req, res) => {
	res.render("index");
});

app.get("/aiueo-sakubun/input", async (req, res) => {
	let word;
	let yomi;
	if (fs.existsSync("./wordDict.json")) {
		const wordDict = JSON.parse(fs.readFileSync("./wordDict.json", "utf8"));
		const randomWord = wordDict[Math.floor(Math.random() * wordDict.length)];
		word = randomWord.word;
		yomi = randomWord.yomi;
	} else {
		console.log("wordDict.json not exists. use api altanatively");

		const data = await getRandomAI();
		word = data.japanese[0].word ?? data.japanese[0].reading;
		yomi = await convertToYomi(word);
	}

	res.render("aiueo-sakubun/input", { baseURL, word, yomi });
});

app.get("/aiueo-sakubun/result", (req, res) => {
	res.render("aiueo-sakubun/result");
});

// apis
/**
 * ランダムな「あい」から始まるお題を返すAPI
 * GET /api/v1/word
 */
app.get("/api/v1/word", async (req, res) => {
	let data;
	if (fs.existsSync("./wordDict.json")) {
		const wordDict = JSON.parse(fs.readFileSync("./wordDict.json", "utf8"));
		data = wordDict[Math.floor(Math.random() * wordDict.length)];
	} else {
		data = await getRandomAI();
	}
	res.json(data);
});

/**
 * あいうえお作文の採点を行うAPI
 * POST /api/v1/score
 * Content-Type: application/json
 *
 * Request Body:
 * {
 *   "topic": string,
 *   "text": string[]
 * }
 */
app.post("/api/v1/score", async (req, res) => {
	const scores = await score(req.body);
	// console.log(scores);
	res.send(scores);
});

/**
 * 受け取った文字列が指定された文字で始まっているかを返すAPI
 * POST /api/v1/score
 * Content-Type: application/json
 *
 * Request Body:
 * {
 *  "text": string,
 * "prefix": string
 * }
 */
app.post("/api/v1/starts-with", async (req, res) => {
	const { text, prefix } = req.body;
	if (typeof text !== "string" || typeof prefix !== "string") {
		return res.status(400).json({ error: "Invalid input" });
	}
	const result = await startsWithHiragana(text, prefix);
	res.json(result);
});

/**
 * 受け取った文字列を読みに変換するAPI
 * POST /api/v1/to-yomi
 */
app.post("/api/v1/to-yomi", async (req, res) => {
	const { text } = req.body;
	if (typeof text !== "string") {
		return res.status(400).json({ error: "Invalid input" });
	}
	const result = await convertToYomi(text);
	res.json(result);
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
