const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shaunak@1234",
  database: "electricity",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected");
});

module.exports = db;
