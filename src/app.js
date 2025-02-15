import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import { getRandomAI } from "./domain/util.js";

const PORT = 8080;

const app = express();
app.use(express.json());
app.use(express.static("assets"));

app.set("view engine", "ejs");
app.set("views", "views");
app.use(expressEjsLayouts);

// pages
app.get("/aiueo-sakubun/input", (req, res) => {
	res.render("aiueo-sakubun/input");
});

app.get("/aiueo-sakubun/result", (req, res) => {
	res.render("aiueo-sakubun/result");
});

// apis
app.get("/api/v1/word", async (req, res) => {
	const data = await getRandomAI();
	res.json(data);
});

app.post("/api/v1/starts-with", (req, res) => {
	const { text, prefix } = req.body;
	if (typeof text !== "string" || typeof prefix !== "string") {
		return res.status(400).json({ error: "Invalid input" });
	}
	const result = text.startsWith(prefix);
	res.json({ result });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
