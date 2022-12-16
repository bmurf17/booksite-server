import pg from "pg";
const pool = new pg.Pool();

const updateBook = async (
  req: {
    params: { [x: string]: any };
    body: {
      title: any;
      img: any;
      author: any;
      pageCount: any;
      genre: any;
      user: any;
      rating: any;
    };
  },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: { (arg0: string): void; new (): any };
    };
  }
) => {
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
};

const getAllBooks = async (req: any, res: { json: (arg0: any[]) => void }) => {
  const { rows } = await pool.query("SELECT * From book");
  res.json(rows);
};

const getBookByid = async (
  req: { params: { [x: string]: any } },
  res: { json: (arg0: any) => void }
) => {
  const id = req.params["id"];
  res.json(
    await (
      await pool.query(`SELECT * From book WHERE id = ${id}`)
    ).rows[0]
  );
};

const addBook = (
  req: {
    body: {
      title: any;
      img: any;
      author: any;
      pageCount: any;
      genre: any;
      user: any;
      rating: any;
    };
  },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: { (arg0: string): void; new (): any };
    };
  }
) => {
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
};

module.exports = {
  updateBook,
  getAllBooks,
  getBookByid,
  addBook,
};
