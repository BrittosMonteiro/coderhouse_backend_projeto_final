import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readProductManager = () => {
  return new Promise((resolve, reject) => {
    const productManagerPath = path.join(__dirname, "../data/carts.json");

    fs.readFile(productManagerPath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};
