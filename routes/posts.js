const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

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