const db = require("../../helpers/db");

exports.getAllContactUs = (cb) => {
    db.query(
        "SELECT * FROM contactus",
        (err, res) => {
          console.log(err);
          // console.log(res, 999);
          cb(err, res.rows);
        })
    
}
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
  