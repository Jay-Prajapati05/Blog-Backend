import {Post} from "../models/posts.model.js";
import asyncHandler from "../middlwares/asyncHandler.js";
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

// Get All Posts old code
//  const getAllPosts = async (req, res) => {
//   try {
//     const posts = await Post.find();

//     res.json({
//       success: true,
//       data: posts,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// add pagination


const getAllPosts = async (req,res)=>{
  try {
    
    // query params

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page-1) * limit;

    // DB QUERY 

    const search = req.query.search || "";

    const searchQuery = search
  ? { title: { $regex: search, $options: "i" } }
  : {};

    const posts = await Post.find(searchQuery)
    .skip(skip)
    .limit(limit)
    .sort({createdAt: -1})

    // total count 

    const total = await Post.countDocuments(searchQuery);

    res.json({
      success: true,
      page,
      totalPages: Math.ceil(total/limit),
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
     return res.status(404).json({
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
