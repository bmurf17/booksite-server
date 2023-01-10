import pg from "pg";
const pool = new pg.Pool();
const tableName = "site_user";

const getUserByid = async (
  req: { params: { [x: string]: any } },
  res: { json: (arg0: any) => void }
) => {
  const id = req.params["id"];
  console.log(id);
  res.json(
    await (
      await pool.query(`SELECT * From ${tableName} WHERE id = ${id}`)
    ).rows[0]
  );
};

const login = async (
  req: {
    body: {
      name: string;
      dateCreated?: string;
      img: string;
      uuid: string;
    };
  },
  res: { json: (arg0: any) => void }
) => {
  const { name, dateCreated, img, uuid } = req.body;

  var { rows, rowCount } = await pool.query(
    `SELECT * from ${tableName} where uuid = $1`,
    [uuid]
  );

  if (rowCount >= 1) {
    res.json(rows[0]);
    return;
  }

  res.json(
    await (
      await pool.query(
        `INSERT INTO ${tableName} (name, img) VALUES ($1, $2) RETURNING *`,
        [name, img]
      )
    ).rows[0]
  );
};

module.exports = {
  getUserByid,
  login,
};
