import { prismaClient } from "../application/database.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res
        .status(401)
        .json({
          errors: "Unauthorized",
        })
        .end();
    }
    const user = await prismaClient.user.findFirst({
      where: {
        token: refreshToken,
      },
    });
    if (!user) {
      res
        .status(403)
        .json({
          errors: "Forbidden",
        })
        .end();
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          res
            .status(403)
            .json({
              errors: "Forbidden",
            })
            .end();
        }
        const id = user.id;
        const email = user.email;
        const password = user.password;
        const accessToken = jwt.sign(
          { id, email, password },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "60s",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (e) {
    next(e);
  }
};
