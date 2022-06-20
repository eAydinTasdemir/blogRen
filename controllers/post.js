/*Posts control, Fecth,get,,add,delete ,update function for posts*/

import Post from "../models/posts.js";
import Tags from "../models/tags.js";

export const getPosts = async (req, res) => {
  try {
    //await bcof async
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    //await bcof async
    const { id: _id } = req.params;
    const post = await Post.findById(_id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const createPost = async (req, res) => {
  const newPost = new Post(req.body);
  console.log(newPost);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const post = await Post.findById(_id);
    console.log(post);
    if (post.username === req.body.username) {
      try {
        const updatePost = await Post.findByIdAndUpdate(
          _id,
          { $set: req.body },
          { new: true }
        );
        console.log(updatePost);
        res.status(200).json(updatePost);
      } catch (error) {
        res.status(500).json({
          error,
        });
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const post = await Post.findById(_id);
    if (post.username === req.body.username) {
      try {
        const deletedPost = await Post.findByIdAndDelete(_id);
        res.status(200).json(deletedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    await post.updateOne({ $push: { comment: req.body.comment } });
    res.status(200).json("The comment has been added");
  } catch (err) {
    res.status(500).json(err);
  }
};
