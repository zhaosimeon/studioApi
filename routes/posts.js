const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
  try{
    const posts = await Post.find();
    console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/:postid', async (req, res) => {
  try{
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