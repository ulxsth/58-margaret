import express from "express";
import expressEjsLayouts from "express-ejs-layouts";

const app = express();
app.use(express.json());
app.use(express.static("assets"));

app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(expressEjsLayouts);

app.get("/", (req, res) => {
	res.render("index");
});

// あいうえお作文
app.get("aiueo-sakubun/input", (req, res) => {
	res.render("aiueo-sakubun/input");
});

app.get("aiueo-sakubun/result", (req, res) => {
	res.render("aiueo-sakubun/input");
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
