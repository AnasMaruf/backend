import express from "express";
import userController from "../controller/user-controller.js";
import productController from "../controller/product-controller.js";
import { verifyToken } from "../middleware/verify-token.js";

const userRouter = new express.Router();

// userRouter.use(authMiddleware);
userRouter.use(verifyToken);

// User API
userRouter.get("/api/users/current", userController.get);

//Product API
userRouter.post("/api/products", productController.create);
userRouter.get("/api/products", productController.list);
userRouter.put("/api/products/:productId", productController.update);
userRouter.delete("/api/products/:productId", productController.remove);

export { userRouter };
