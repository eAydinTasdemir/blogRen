import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import accountRoutes from "./routes/account.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.js";
import tagRoutes from "./routes/tags.js";
import session from "express-session";
import passport from "passport";

//Creat Express
const app = express();
//Load Config
dotenv.config();
//Confirm Json Objects
app.use(express.json({ limit: "100mb" }));
//Confirm cookie
app.use(cookieParser());

//Load Express Defualt with

//set header policy for our origin host (in develomnet)
app.use(
  bodyParser.json({
    limit: "100mb",
    extended: true,
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

//set header policy for our origin host (in develomnet)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

//APP routes the call from client to in each router
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/account", accountRoutes);
app.use("/user", userRoutes);
app.use("/tag", tagRoutes);

//Conent db with mongoose
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port: " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.error(error.message);
  });
