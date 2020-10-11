const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const products = require('./products');
const multer = require('multer');
const creds = require('./creds');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ubisoft_db'
});

connection.connect();

const port = process.env.PORT || 8001;

const app = express()
    .use(cors({ origin: "*" }))
    .use(bodyParser.json({ limit: '50mb' }))
    .use(products(connection))
    .use(express.static('public'));

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});


