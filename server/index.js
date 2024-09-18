import express from "express";
import mysql2 from "mysql2";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors());

const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: PASSWORD,
  database: DATABASE,
});

// req: Request passed by Client
// res: Response sent by Server

app.get("/", (req, res) => {
  res.json("You're connected to server");
});

app.get("/books", (req, res) => {
  const sql = `SELECT * FROM books`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const sql =
    "INSERT INTO books (`TITLE`,`DESCRIPTION`,`PRICE`,`COVER`) values (?)";
  const values = [
    req.body.TITLE,
    req.body.DESCRIPTION,
    req.body.PRICE,
    req.body.COVER,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created succesfully");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const sql = "DELETE FROM books WHERE ID = ?";
  db.query(sql, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted succesfully");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const sql =
    "UPDATE books SET `TITLE` = ?, `DESCRIPTION` = ?, `PRICE` = ?, `COVER` = ? WHERE ID = ?";
  const values = [
    req.body.TITLE,
    req.body.DESCRIPTION,
    req.body.PRICE,
    req.body.COVER,
  ];
  db.query(sql, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated succesfully");
  });
});

app.listen(8800, () => {
  console.log("Database Connected Succesfully");
});
