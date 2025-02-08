import express from "express";

const app = express();
app.use(express.json());
app.use(express.static("assets"));

app.set("view engine", "ejs");
app.set("views", "assets/views");

app.get("/", (req, res) => {
	res.render("index");
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
