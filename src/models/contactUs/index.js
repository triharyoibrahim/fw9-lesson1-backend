const db = require("../../helpers/db");

exports.getAllContactUs = () => {
    db.query(
        "SELECT * FROM contactus",
        (err, res) => {
          console.log(err);
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
  