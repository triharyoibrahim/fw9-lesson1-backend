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

  exports.updateContactUs = (id, data, cb) => {
    console.log();
    let val = [id];
  
    const filtered = {};
  
    const objt = {
      
      name: data.name,
      email: data.email,
      message: data.message,
    };
  
    for (let x in objt) {
      if (objt[x] !== null && objt[x]!= '') {
        filtered[x] = objt[x];
        val.push(objt[x]);
      }
    }
  
    const key = Object.keys(filtered);
    const finalResult = key.map((o, ind) => `${o}=$${ind + 2}`);
  
    const q = `UPDATE contactus SET ${finalResult} WHERE id=$1 RETURNING *`;
    db.query(q, val, (err, res) => {
      if (res) {
        cb(err, res);
      } else {
        cb(err, res);
      }
    });
  };
  