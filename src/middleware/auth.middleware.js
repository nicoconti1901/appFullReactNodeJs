import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  jwt.verify(token, "dfgfg23435", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token is not valid" });
    }

    req.userId = decoded.id;

    next();
  });
};
