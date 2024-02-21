import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const refreshToken = req.cookies.refreshToken;
  if (token == null || !refreshToken) {
    res.sendStatus(401);
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};
