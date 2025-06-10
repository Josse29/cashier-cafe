import getDB from "./db";
import { capitalizeWord, validateProduct } from "../utils";

const productSchema = async () => {
  const db = await getDB();
  await db.execAsync(`
  CREATE 
  TABLE IF NOT EXISTS 
  Product (
  ProductId INTEGER PRIMARY KEY NOT NULL, 
  ProductName VARCHAR(255), 
  ProductPrice INTEGER,
  ProductImg BLOB,
  ProductInfo TEXT
  );
  `);
};
const getProductAPI = async (req) => {
  const { search, limit, offset } = req;
  const db = await getDB();
  const query = `
  SELECT 
  * 
  FROM Product
  WHERE 
  ProductName LIKE ?
  ORDER BY ProductName ASC
  LIMIT ?
  OFFSET ?
  `;
  const products = await db.getAllAsync(query, [
    `%${search}%`,
    limit,
    (offset - 1) * limit,
  ]);
  const query1 = `
  SELECT 
  COUNT(*) AS TotalProduct
  FROM 
  Product
  WHERE 
  ProductName LIKE ?
  `;
  const { TotalProduct } = await db.getFirstAsync(query1, [`%${search}%`]);
  const pagination =
    TotalProduct % limit === 0
      ? parseInt(TotalProduct / limit)
      : parseInt(TotalProduct / limit) + 1;

  return { products, pagination };
};
const getProductIdAPI = async (id) => {
  const db = await getDB();
  const query = `
  SELECT 
  * 
  FROM Product
  WHERE ProductId = ?
  `;
  const productId = await db.getFirstAsync(query, [parseInt(id)]);
  return productId;
};
const createProductAPI = async (req) => {
  const { productName, productPrice, productImg, productInfo } = req;
  const db = await getDB();
  await validateProduct(db, req);
  // execute
  const query = `
  INSERT 
  INTO 
  Product
  (ProductName, ProductPrice, ProductImg, ProductInfo)
  VALUES 
  (?, ?, ?, ?)
  `;
  await db.runAsync(query, [
    capitalizeWord(productName),
    productPrice,
    productImg.base64,
    productInfo,
  ]);
  const msg = `${capitalizeWord(productName)} - Has Been Created`;
  return msg;
};
const updateProductAPI = async (req) => {
  const { productId, productName, productPrice, productImg, productInfo } = req;
  const db = await getDB();
  await validateProduct(db, req);
  const query = `
  UPDATE
  Product 
  SET 
  ProductName = ?,
  ProductPrice = ?,
  ProductImg = ?,
  ProductInfo = ? 
  WHERE ProductId = ?
  `;
  await db.runAsync(query, [
    capitalizeWord(productName),
    productPrice,
    productImg.base64 || productImg,
    productInfo,
    productId,
  ]);
  const msg = `${capitalizeWord(productName)} - Has Been Updated`;
  return msg;
};
const deleteProductId = async (id, productName) => {
  const db = await getDB();
  const query = `
  DELETE 
  FROM
  Product 
  WHERE ProductId = ?`;
  await db.runAsync(query, [[parseInt(id)]]);
  const msg = `${capitalizeWord(productName)} - Has Been Deleted`;
  return msg;
};
export {
  productSchema,
  getProductAPI,
  getProductIdAPI,
  createProductAPI,
  updateProductAPI,
  deleteProductId,
};
