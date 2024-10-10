import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productManagerPath = path.join(__dirname, "../data/products.json");

const readProductList = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(productManagerPath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const addProduct = async (req, res) => {
  let data = req.body;
  const hasProduct = await isProductInList(data);

  if (hasProduct) {
    await changeProductQuantity(hasProduct.id, data.stock);
    return;
  }

  data = { ...data, id: uuidv4() };
  saveData(data);
};

const isProductInList = async (data) => {
  const { products } = await readProductList();

  if (!products || products.length === 0) return;

  const product = products.filter(
    (prod) => prod.title === data.title || prod.code === data.code
  )[0];

  return product;
};

const updateProduct = async (req, res) => {};

const changeProductQuantity = async (idProduct, newQuantity) => {
  const { products } = await readProductList();

  const newProductsList = products.map((product) => {
    if (product.id === idProduct) {
      const newStockQuantity = product.stock + newQuantity;
      return { ...product, stock: newStockQuantity };
    }
    return product;
  });

  new Promise((resolve, reject) => {
    fs.writeFile(
      productManagerPath,
      JSON.stringify({ products: newProductsList }, null, 2),
      "utf-8",
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });

  res.send(newProductsList);
};

const deleteProduct = async (req, res) => {};

const getProductList = async (req, res) => {
  const { limit } = req.query;
  const { products } = await readProductList();

  if (!limit) res.send(products);

  res.send(products.slice(0, limit));
};

const getProductById = async (req, res) => {
  const { pid } = req.params;
  const { products } = await readProductList();

  const product = products.find((product) => product.id === pid);

  res.send(product);
};

const saveData = async (data) => {
  let { products } = await readProductList();
  products.push(data);

  new Promise((resolve, reject) => {
    fs.writeFile(
      productManagerPath,
      JSON.stringify({ products }, null, 2),
      "utf-8",
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });

  res.send(products);
};

export {
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductList,
};
