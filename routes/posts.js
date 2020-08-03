const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { MongoClient } = require('mongodb');
var url = process.env.MDB_CONNECTION;

router.get('/', async (req, res) => {
  try {
    console.log('your reached /posts');
    const posts = await Post.find().maxTimeMS(30000);//timeout 30 senconds
    console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

router.get('/mdb', async (req, res) => {
  console.log('you reached /posts/mdb');
  try {

    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const database = client.db("PeopleDB");
    const collection = database.collection("posts");
    const query = { "author": "alice" };
    const options = {
      // sort returned documents in ascending order by title (A->Z)
      sort: { author: 1 }
    };
    const post = await collection.findOne(query, options);

    res.json(post);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/:postid', async (req, res) => {
  try {
    const postid = res.params.postid;
    const post = await Post.findById(postid);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/', async (req, res) => {
  const { id, author, title, message } = req.body;
  const post = new Post({
    id, author, title, message
  });
  try {
    const saved = post.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});



module.exports = router;