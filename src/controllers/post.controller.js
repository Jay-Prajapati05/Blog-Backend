import {Post} from "../models/posts.model.js";

// Create Post
 const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.create({
      title,
      content,
    });

    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Posts
 const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.json({
      success: false,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export{ createPost, getAllPosts}