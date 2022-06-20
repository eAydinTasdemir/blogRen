import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  getSinglePost,
  deletePost,
  likePost,
  addComment,
} from "../controllers/post.js";

const router = express.Router();

//http://localhost:5000/posts

// GEt POST DELETE UPDATE PATCH

router.get("/", getPosts);
router.get("/:id", getSinglePost);

router.post("/", createPost);
router.delete("/:id", deletePost);
router.patch("/:id", updatePost);
router.put("/:id/like", likePost);
router.put("/:id/comment", addComment);

export default router;
