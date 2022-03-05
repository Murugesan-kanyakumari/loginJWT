const mysql = require("mysql2");

const dBConnection = mysql
  .createConnection({
    host: "localhost",
    user: "root",
    database: "testdb",
    password: "",
  })
  .on("error", (err) => {
    console.log("error in db connection :: ", err);
  });

module.exports = dBConnection;