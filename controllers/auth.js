import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//const JWT_SECRET = "z7K5y]mp+wj{*?H2Ya[w)cNqSNGYXeF)sN.8Vz!*jMm'z-7";
export const createUser = async (req, res) => {
  try {
    const {
      email,
      password,
      passwordVerify,
      username,
      firstName,
      lastName,
      image,
    } = req.body;

    //Validation for User
    if (!email || !password || !passwordVerify) {
      console.log(email, password, passwordVerify);
      return res.json(400).json({
        errorMessage: "Please enter all required..",
      });
    }

    if (password !== passwordVerify) {
      return res.status(400).json({
        errorMessage: "Please Enter at same password..",
      });
    }

    //Check existing User
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        errorMessage: "We have an accout eith this email..",
      });
    }

    //Hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    //console.log(passwordHash);
    //Create new account to db

    const newUser = new User({
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: passwordHash,
      image: image,
    });
    console.log(newUser);
    const savedUser = await newUser.save();
    //console.log(savedUser);

    //Creat token  user email and user_id with jwt token
    const token = {
      email: email,
      user: jwt.sign(
        {
          user: savedUser._id,
        },
        process.env.JWT_SECRET
      ),
    };

    console.log(token);

    //Send token to cookie with http-only
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

export const loggedIn = async (req, res) => {
  try {
    const token = {
      id: req.cookies.token.user,
      email: req.cookies.token.email,
    };

    if (!token) return res.json(false);

    //console.log(token);
    jwt.verify(token.id, process.env.JWT_SECRET);

    //console.log(res);
    res.send(true);
  } catch (error) {
    res.json(false);
  }
};

//Login an verify
export const login = async (req, res) => {
  try {
    //Check Valid res for account and user
    const { email, password } = req.body;

    //Validation ..
    if (!email || !password) {
      return res.json(400).json({
        errorMessage: "Please enter all required..",
      });
    }

    //Find User..
    const existingUser = await User.findOne({ email });

    //Wrong Password..
    if (!existingUser) {
      return res
        .status(400)
        .json({ errorMessage: "Wrong Passsword or Email1" });
    }

    //Validate password with bcrypt.
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordCorrect) {
      return res.status(401).json({ errorMessage: "Wrong Passsword or Email" });
    }
    //Creat token  user email and user_id with jwt token
    const token = {
      email: email,
      user: jwt.sign(
        {
          user: existingUser._id,
        },
        process.env.JWT_SECRET
      ),
    };

    //console.log(token);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json(existingUser);
  } catch (error) {
    res.status(500).send();
  }
};

export const logout = async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), // Date 0 because invalid token from past.. // Clear for token and token is invalid.
    })
    .send();
};
