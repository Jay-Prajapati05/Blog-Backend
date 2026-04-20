import express from "express";
import { createPost, deletepost, getAllPosts, getSinglePost} from "../controllers/post.controller.js";
import { login, register } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlwares/auth.middleware.js";

const router = express.Router();


router.get("/", (req, res) => {
  res.json({ message: "GET ALL POSTS" });
});

// router.get("/:id", (req, res) => {
//   res.json({
//     success: true,
//     data: [],
//   });

router.post("/createpost",authMiddleware,createPost);
router.get("/allpost",getAllPosts);
router.get("/single/:id",getSinglePost);
router.get("/deletepost/:id",deletepost);
router.post("/register",register);
router.post("/login",login);


export default router;
