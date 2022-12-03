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

app.use(express.json());
app.use(express.urlencoded());
app.use(express.text({ type: "text/html" }));
app.use(cors(corsOptions));

app.get("/", async (req, res) => {
  res.send("Hello world");
});

//BOOK
app.put("/book/:id", (req, res) => {
  const id = req.params["id"];
  const { title, img, author, pageCount, genre, user, rating } = req.body;
  pool.query(
    "Update book SET title = $1, img = $2, author = $3, pagecount = $4, genre = $5, rating = $6 WHERE id = $7",
    [title, img, author, pageCount, genre, rating, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Updated Row with ID: ${id}`);
    }
  );
});

app.get("/book", async (req, res) => {
  const { rows } = await pool.query("SELECT * From book");
  res.json(rows);
});

app.get("/book/:id", async (req, res) => {
  const id = req.params["id"];
  res.json(
    await (
      await pool.query(`SELECT * From book WHERE id = ${id}`)
    ).rows[0]
  );
});

app.post("/book", (req, res) => {
  const { title, img, author, pageCount, genre, user, rating } = req.body;
  pool.query(
    "INSERT INTO book (title, img, author, pagecount, genre, rating) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [title, img, author, pageCount, genre, rating],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Book added with title: ${title}`);
    }
  );
});

//AUTHOR
app.get("/author", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM author");
  res.json(rows);
});

app.get("/author/:id", async (req, res) => {
  const id = req.params["id"];
  const { rows } = await pool.query(`SELECT * FROM author WHERE id = ${id}`);
  res.json(rows);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
