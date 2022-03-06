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

app.get('/', (req, res) => {
    res.send('Hi There')
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
