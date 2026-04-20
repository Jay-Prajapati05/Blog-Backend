import {Post} from "../models/posts.model.js";

// Create Post
 const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

     //  Validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    // create in DB
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
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

    // get singl post

const getSinglePost = async(req,res)=>{
  try {
    const {id} = req.params;
  
    const post= await Post.findById(id);
  
    if(!post){
      return res.status(404).json({
        success: false,
        message: "POST NOT FOUND"
      });
    }
  
    res.json({
      success: true,
      data: post,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


    // delete post

const deletepost = async (req,res)=>{
  try {
    const {id} = req.params;
  
    const post = await Post.findByIdAndDelete(id);
  
    if(!post){
      res.status(404).json({
        success: false,
        message: "POST NOT FOUND",
      });
    }
  
    res.json({
      success: true,
      message: "POST DELETED SUCCESSFULLY",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      
    })
  }
}
export{ createPost, getAllPosts,getSinglePost,deletepost}
