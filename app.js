const express = require("express");
const morgan = require('morgan');
const app = express();
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


//routes
app.get('/', (req, res) => {
    res.send("We are at home");
});

//connect to db
mongoose.connect(process.env.DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true }, ()=> console.log('connected to DB'));
/* const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("PeopleDB").collection("postPerson");
    console.log('connected to DB');
    // perform actions on the collection object
    client.close();
});
 */
//Listing
const port = process.env.PORT;
app.listen(8080, () => console.log("CORS-enabled web server listening on port 8080"));