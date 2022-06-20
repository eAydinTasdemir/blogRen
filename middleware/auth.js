import jwt from "jsonwebtoken";

function auth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    const verifed = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verifed.user;
    next(); //Continue from middleware to call func.
  } catch (error) {
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

export default auth;
