import express from "express";
import pg from "pg";

const pool = new pg.Pool();

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.text({ type: "text/html" }));

app.put("/:id/book", (req, res) => {
  const id = req.params["id"];
  console.log(id);
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
