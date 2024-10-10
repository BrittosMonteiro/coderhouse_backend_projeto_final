import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProductList,
  updateProduct,
} from "../Controllers/ProductsController.js";

const ProductsRouter = Router();

ProductsRouter.post("/", addProduct);
ProductsRouter.get("/", getProductList);
ProductsRouter.get("/:pid", getProductById);
ProductsRouter.put("/:pid", updateProduct);
ProductsRouter.delete("/:pid", deleteProduct);

export default ProductsRouter;
