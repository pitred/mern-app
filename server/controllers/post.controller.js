const Post = require('../models/post.model');

// get all posts
exports.getPosts = async (req, res) => {
   try {
      res.status(200).json(await Post.find());
   } catch (err) {
      res.status(500).json(err);
   }
};

// get single post
exports.getPost = async (req, res) => {
   try {
      res.status(200).json(await Post.find({ id: req.params.id }));
   } catch (err) {
      res.status(500).json(err);
   }
};
