require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const db = mysql.createPool({
  host: 'Localhost',
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'crud_movie'
});

app.get('/api/movie', (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews"
  db.query(sqlSelect, (err, result) => {
    if (err) console.log('Error/GET', err.message)
    res.send(result)
  })
})

app.post('/api/movie', (req, res) => {
  const title = req.body.title;
  const review = req.body.review;

  const sqlInsert = "INSERT INTO movie_reviews (title, review) VALUES (?, ?);"
  db.query(sqlInsert, [title, review], (err, result) => {
    if (err) console.log('Error/POST', err.message)
  })

  // const sqlInsert = "INSERT INTO movie_reviews (title, review) VALUES ('superman', 'excellent');"
  
  // db.query(sqlInsert, (err, result) => {
  //   if (err) {
  //     console.log(err.message);
  //   }
  //   res.send('db inserted sucessfully')
  // })
})

app.delete('/api/movie/:id', (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM movie_reviews WHERE id= ?"
  db.query(sqlDelete, id, (err, result) => {
    if (err) console.log('Error/DELETE', err.message)
    res.send(result)
  })
})

app.put('/api/movie/:id', (req, res) => {
  const id = req.params.id;
  const newReview = req.body.newReview;
  const sqlUpdate = "UPDATE movie_reviews SET review=? WHERE id=?"
  db.query(sqlUpdate, [newReview, id], (err, result) => {
    if (err) console.log('Error/UPDATE', err.message)
    res.send(result)
  })
})


app.listen(4001, () => console.log('Server running on port 4001'));