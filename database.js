require("dotenv").config();

const mysql = require("mysql2/promise");

const database = mysql.createPool({
    host: process.env.DB_HOST, // address of the server
    port: process.env.DB_PORT, // port of the DB server (mysql), not to be confused with the APP_PORT !
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  database
  .getConnection()
  .then(() => {
    console.log("Can reach database");
  })
  .catch((err) => {
    console.error(err);
  });
  const postMovie = (req, res) => {
    const { title, director, year, color, duration } = req.body;
  
    database
      .query(
        "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
        ["titanic", "spielsberg","2000","1", "150"]
      )
      .then(([result]) => {
        res.location(`/api/movies/${result.insertId}`).sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error saving the movie");
      });
  };

  const postUser = (req, res) => {
    const { firstname, lastname, email, city, language} = req.body;
  
    database
      .query(
        "INSERT INTO movies(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
        ["Leo", "Dicaprio", "leo.di@example.com","italy", "english"]
      )
      .then(([result]) => {
        res.location(`/api/users/${result.insertId}`).sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error saving the user");
      });
  };

module.exports = database;