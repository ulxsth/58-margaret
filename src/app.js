import express from "express";
import expressEjsLayouts from "express-ejs-layouts";

const PORT = 8080

const app = express();
app.use(express.json());
app.use(express.static("assets"));

app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(expressEjsLayouts);

app.get("/", (req, res) => {
	res.render("index");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
