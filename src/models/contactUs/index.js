const db = require("../../helpers/db");
const { LIMIT_DATA } = process.env;

exports.getAllContactUs = (
  keyword,
  sortby,
  sort,
  limit = parseInt(LIMIT_DATA),
  offset = 0,
  cb
) => {
  db.query(
    `SELECT * FROM contactus WHERE name LIKE \'%${keyword}%'\ ORDER BY ${sortby} ${sort} LIMIT $1 OFFSET $2`,
    [limit, offset],
    (err, res) => {
      console.log(err);
      cb(err, res);
    }
  );
};

exports.countAllContactUs = (keyword, cb) => {
  db.query(
    `SELECT * FROM contactus WHERE name LIKE \'%${keyword}%'\ `,
    (err, res) => {
      cb(err, res.rowCount);
    }
  );
};

//

exports.createContactUs = (data, cb) => {
    const q =
      "INSERT INTO contactus(name, email, message) VALUES ($1, $2, $3) RETURNING *";
    const val = [
      data.name,
      data.email,
      data.message,
    ];
    db.query(q, val, (err, res) => {
    //   console.log(res);
      cb(res.rows);
    });
  };
  
  exports.deleteContactUs = (id, cb) => {
    const q = "DELETE FROM contactus WHERE id=$1 RETURNING *";
    const val = [id];
    db.query(q, val, (err, res) => {
      cb(res);
    });
  };
  