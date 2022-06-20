import express from "express";
import { getTags, createTag, pushTag } from "../controllers/tag.js";

const router = express.Router();

//http://localhost:5000/tags

router.get("/", getTags);

router.post("/", createTag);
router.post("/addPost", pushTag);

export default router;
