const mysql = require("mysql2");




const connection = mysql.createPool({
  host:"",
  user:"",
  password:"",
  database:""
})




module.exports = connection;
