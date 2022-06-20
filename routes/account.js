import express from "express";
import auth from "../middleware/auth.js";
import {
  createAccount,
  getAccount,
  getMediumToken,
} from "../controllers/account.js";

const router = express.Router();
//http://...com.tr/account

router.post("/", auth, createAccount);
router.get("/", auth, getAccount);
router.get("/medium", getMediumToken);

export default router;
