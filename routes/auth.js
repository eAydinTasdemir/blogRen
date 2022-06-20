import express from "express";
import User from "../models/user.js";
import { createUser, loggedIn, login, logout } from "../controllers/auth.js";

const router = express.Router();

//http://localhost:5000/auth

//REGISTER
router.post("/register", createUser);

//LOGIN
router.post("/login", login);
//router.get("/", getPosts);

//LOGGEDIN
router.get("/loggedIn", loggedIn);

//LOGOUT
router.get("/logout", logout);

export default router;
