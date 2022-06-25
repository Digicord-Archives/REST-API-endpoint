const mysql = require("mysql2");

require("dotenv/config");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database:DB_NAME
});

module.exports = pool.promise()



// connection.connect((err) => {
//   if (err) {
//     console.log(err);
//   }
// });

// // Create Database if it does not exist
// exports.createDB = () => {
//   connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`, (err, _) => {
//     if (err) {
//       return console.log(err);
//     }

//     this.createTables();

//     return console.log(`DATABASE ${DB_NAME} created successfully`);
//   });
// };

// const createUserTable = `
// CREATE TABLE IF NOT EXISTS doctors (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     doctor_id INT NOT NULL,
//     first_name VARCHAR(50) NULL,
//     last_name VARCHAR(50) NULL,
//     email VARCHAR(50) NOT NULL UNIQUE,
//     password VARCHAR(50) NOT NULL,
//     specialization VARCHAR(50) NOT NULL,
//     phone_number INT NOT NULL,
//     id_no  INT  NOT NULL,
//     location VARCHAR(100) NOT NULL,
//     sex ENUM NOT NULL,
//     image_url VARCHAR(255) NOT NULL,
//     is_available BOOLEAN DEFAULT 0,
//     is_admin BOOLEAN DEFAULT 0,
//     created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
//     )
//     `;
    
//     const createTodoTable = `
//     CREATE TABLE IF NOT EXISTS patients (
//       id INT PRIMARY KEY AUTO_INCREMENT,
//       doctor_id INT,
//       patient_id INT NOT NULL,
//       first_name VARCHAR(50) NULL,
//       last_name VARCHAR(50) NULL,
//       email VARCHAR(50) NOT NULL UNIQUE,
//       password VARCHAR(50) NOT NULL,
//       phone_number INT NOT NULL,
//       age  INT  NOT NULL,
//       sex ENUM NOT NULL,
//       location VARCHAR(100) NOT NULL,
//       image_url VARCHAR(255) NOT NULL,
//       is_available BOOLEAN DEFAULT 0,
//       created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
//       FOREIGN KEY(doctor_id) REFERENCES doctors(doctor_id),
//     )
// `;

// exports.createTables = () => {
//   let pool = mysql.createPool({
//     host: DB_HOST,
//     user: DB_USER,
//     password: DB_PASSWORD,
//     database: DB_NAME,
//   });

//   pool.execute(createUserTable, (err, _) => {
//     if (err) {
//       return console.log(err);
//     }
//     return console.log("Doctor Table Created Successfully");
//   });

//   pool.execute(createTodoTable, (err, _) => {
//     if (err) {
//       return console.log(err);
//     }
//     return console.log("Patient Table Created Successfully");
//   });
// };

this.createDB();

setTimeout(() => {
  process.exit(0);
}, 2000);
