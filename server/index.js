const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv')

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3101;

const db = mysql.createPool({
    host: process.env.Database_Host,
    user: process.env.Database_User,
    password: process.env.Database_Password,
    database: process.env.Database
});

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/getBooks', (req, res) => {
    const SelectQuery = "SELECT * FROM books_reviews";
    db.query(SelectQuery, (err,result) => {
        res.send(result);
    });
});

app.post('/insertBook', (req,res) => {
    // const newBook = {
    //     bookName: req.body.setBookName,
    //     bookReview: req.body.setReview,
    // };
    const bookName = req.body.setBookName;
    const bookReview = req.body.setReview;
    console.log(req.body.setBookName);
    

    const InsertQuery = "INSERT INTO books_reviews (book_name, book_review) VALUES (?, ?)";
    db.query(InsertQuery, [bookName, bookReview], (err, result) => {
        res.send(`New Book added to the database successfully. + ${result}`)
    });
});

app.delete('/deleteBook/:bookId', (req,res) => {
    const bookId = req.params.bookId;
    const DeleteQuery = "DELETE FROM books_reviews WHERE id = ?";
    db.query(DeleteQuery, bookId, (err, result) => {
        if (err) {
            throw (err)
        } else {
            res.send(`Book successfully deleted. + ${result}`)
        }
    })
})

app.put("/updateBook/:bookId", (req, res) => {
    const bookReview = req.body.reviewUpdate;
    const bookId = req.params.bookId;
    const UpdateQuery = "UPDATE books_reviews SET book_review = ? WHERE id = ?";
    db.query(UpdateQuery, [bookReview, bookId], (err, result) => {
        if (err) console.log(err)
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
