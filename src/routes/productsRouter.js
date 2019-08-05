import { Router } from "express";
import {
  getProducts,
  getProductById,
  getProductReviews,
  addProduct
} from "../controllers/products";
const productsRouter = Router();
productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProductById);
productsRouter.get("/:id/reviews", getProductReviews);
productsRouter.post("/", addProduct);
export default productsRouter;
