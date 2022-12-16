import pg from "pg";
const pool = new pg.Pool();

const getAllAuthors = async (
  req: any,
  res: { json: (arg0: any[]) => void }
) => {
  const { rows } = await pool.query("SELECT * FROM author");
  res.json(rows);
};

const getAuthorById = async (
  req: { params: { [x: string]: any } },
  res: { json: (arg0: any[]) => void }
) => {
  const id = req.params["id"];
  const { rows } = await pool.query(`SELECT * FROM author WHERE id = ${id}`);
  res.json(rows);
};

module.exports = {
  getAllAuthors,
  getAuthorById,
};
