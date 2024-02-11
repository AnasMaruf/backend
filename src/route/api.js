import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import productController from "../controller/product-controller.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get("/api/users/current", userController.get);
userRouter.delete("/api/users/logout", userController.logout);

//Product API
userRouter.post("/api/products", productController.create);
userRouter.get("/api/products", productController.list);
userRouter.put("/api/products/:productId", productController.update);
userRouter.delete("/api/products/:productId", productController.remove);

export { userRouter };
