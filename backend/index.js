import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Vaibhav11@",
    database: "test",
});

//so that we can change data through backend only.
app.use(express.json())

//it give permission to frontend part to fetch data from backend.
app.use(cors())

app.get("/",(req,res)=>{
  res.json("hello this is backend");
})

//if its give you error past below commond on DB
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Vaibhav11@';

app.get("/books", (req, res) => {

    const q = "SELECT * FROM books";

    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800,()=>{
  console.log("Connected to backend")
})