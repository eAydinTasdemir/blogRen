import express from "express";
import { getUser } from "../controllers/user.js";

const router = express.Router();
//http://localhost:5000/user

//GET USER
router.get("/:id", getUser);

export default router;
