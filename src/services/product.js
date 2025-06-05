import * as SQLiteDatabase from "expo-sqlite";
import hostName from "./hostName";

const getProductAPI = async () => {
  const db = await SQLiteDatabase.openDatabaseAsync(hostName);
  const query = `
  SELECT * FROM Product
  `;
  const products = await db.getAllAsync(query);
  return products;
};
const createProductAPI = async (req) => {
  const { productName, productPrice, productImg, productInfo } = req;
  if ((!productName, !productPrice)) {
    const errMsg = `Product name and price are required !`;
    throw new Error(errMsg);
  }
  const db = await SQLiteDatabase.openDatabaseAsync(hostName);
  const query = `
  INSERT 
  INTO 
  Product
  (ProductName, ProductPrice, ProductImg, ProductInfo)
  VALUE 
  (?, ?, ?, ?)
  `;
  await db.execAsync(query, [
    productName,
    productPrice,
    productImg,
    productInfo,
  ]);
};
export { getProductAPI, createProductAPI };
