import express from "express";
import { refreshToken } from "../controller/refresh-token-controller.js";
import userController from "../controller/user-controller.js";

const tokenRouter = express.Router();

// Token API
tokenRouter.get("/api/token", refreshToken);
export { tokenRouter };
tokenRouter.delete;

// User API
tokenRouter.delete("/api/users/logout", userController.logout);
