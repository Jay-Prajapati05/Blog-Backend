import express from "express";
import { createPost, getAllPosts } from "../controllers/post.controller.js";

const router = express.Router();


router.get("/", (req, res) => {
  res.json({ message: "GET ALL POSTS" });
});

// router.get("/:id", (req, res) => {
//   res.json({
//     success: true,
//     data: [],
//   });

router.post("/createpost",createPost);
router.get("/allpost",getAllPosts);


export default router;
