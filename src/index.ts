import express from "express";
import pg from "pg";

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const pool = new pg.Pool();

const app = express();
const port = process.env.PORT || 3333;

const authors = require("./author");
const books = require("./book");
const user = require("./user");

app.use(express.json());
app.use(express.urlencoded());
app.use(express.text({ type: "text/html" }));
app.use(cors(corsOptions));

app.get("/", async (req, res) => {
  res.send("Hello world");
});

//BOOK
app.put("/book/:id", books.updateBook);

app.get("/book", books.getAllBooks);

app.get("/book/:id", books.getBookByid);

app.post("/book", books.addBook);

//AUTHOR
app.get("/author", authors.getAllAuthors);

app.get("/author/:id", authors.getAuthorById);

//USER
app.get("/user/:id", user.getUserByid);
app.post("/user/login", user.login);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
