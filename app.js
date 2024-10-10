import express from "express";
import ProductsRouter from "./src/Routes/ProductsRoute.js";
import CartsRouter from "./src/Routes/CartsRoute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", ProductsRouter);
app.use("/api/carts", CartsRouter);

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
