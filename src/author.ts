import pg from "pg";
import { Request, Response } from "express";

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
  res: Response
) => {
  const id = req.params["id"];
  try {
    const { rows } = await pool.query(`SELECT * FROM author WHERE id = ${id}`);
    res.json(rows);
  } catch {
    res.statusMessage = "Failed Getting Author";
    res.status(400).end();
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
};
