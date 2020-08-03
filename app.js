const express = require("express");
const morgan = require('morgan');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'ReactClient')));
var cors = require('cors');
app.use(cors());
const mongoose = require('mongoose')
//const MongoClient = require('mongodb').MongoClient;
require('dotenv/config');
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(morgan('common'));
const postsRoute = require('./routes/posts');
//middleware
app.use('/posts', postsRoute);

app.get('/tests', (req, res) => {
    res.statusCode(200).send('you are on tests');
});
//routes
app.get('/', (req, res) => {
    console.log('send index file');
    res.sendFile(path.join(__dirname, 'ReactClient', 'index.html'));
});

//connect to db
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('connected to DB'));

//Listing
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`web server listening on port ${port}`));