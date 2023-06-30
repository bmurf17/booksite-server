import pg from "pg";
const fetch = require('node-fetch')

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
      new(): any;
      send: { (arg0: string): void; new(): any };
    };
  }
) => {
  const id = req.params["id"];
  const { title, img, author, pageCount, genre, user, rating } = req.body;

  var { rows, rowCount } = await pool.query(
    `SELECT * from author where name = $1`,
    [author]
  );

  var authorId;

  if (rowCount == 0) {
    var { rows } = await pool.query(
      "INSERT INTO author (name) VALUES ($1) RETURNING *",
      [author]
    );
    authorId = rows[0].id;
  } else {
    authorId = rows[0].id;
  }

  pool.query(
    "Update book SET title = $1, img = $2, author = $3, pagecount = $4, genre = $5, rating = $6 WHERE id = $7",
    [title, img, authorId, pageCount, genre, rating, id],
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

const addBook = async (
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
      new(): any;
      send: { (arg0: string): void; new(): any };
    };
  }
) => {
  const { title, img, author, pageCount, genre, user, rating } = req.body;

  var { rows, rowCount } = await pool.query(
    `SELECT * from author where name = $1`,
    [author]
  );

  var authorId;

  if (rowCount == 0) {
    var { rows } = await pool.query(
      "INSERT INTO author (name) VALUES ($1) RETURNING *",
      [author]
    );
    authorId = rows[0].id;
  } else {
    authorId = rows[0].id;
  }

  pool.query(
    "INSERT INTO book (title, img, author, pagecount, genre, rating) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [title, img, authorId, pageCount, genre, rating],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Book added with title: ${title}`);
    }
  );
};

type ImageLinks = {
  thumbnail: string;
  large: string;
}

type VolumeInfo = {
  title: string;
  authors: string[];
  description: string;
  pageCount: number;
  categories: string[];
  imageLinks: ImageLinks;
}

type GoogleBooksResponse = {
  items: VolumeInfo[]
}

const getBookFromGoogle = async (
  req: { params: { [x: string]: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new(): any;
      send: { (arg0: GoogleBooksResponse): void; new(): any };
    };
  }
) => {
  const title = req.params["title"];

  try {
    var temp = "https://www.googleapis.com/books/v1/volumes?q=" + encodeURIComponent(title) + "&fields=items(volumeInfo%2Fdescription,volumeInfo%2Ftitle,volumeInfo%2Fauthors,volumeInfo%2FpageCount,volumeInfo%2FimageLinks%2Fthumbnail,volumeInfo%2FimageLinks%2Flarge,volumeInfo%2Fcategories)";
    console.log(temp)
    const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=" + encodeURIComponent(title) + "&fields=items(volumeInfo%2Fdescription,volumeInfo%2Ftitle,volumeInfo%2Fauthors,volumeInfo%2FpageCount,volumeInfo%2FimageLinks%2Fthumbnail,volumeInfo%2FimageLinks%2Flarge,volumeInfo%2Fcategories)");


    const data: GoogleBooksResponse = await response.json();
    res.status(201).send(data);
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
  }
};

module.exports = {
  updateBook,
  getAllBooks,
  getBookByid,
  addBook,
  getBookFromGoogle
};
