import * as SQLite from "expo-sqlite";

const db = await SQLite.openDatabaseAsync("coffeeShop");
await db.execAsync(`
PRAGMA journal_mode = WAL;
CREATE 
TABLE IF NOT EXISTS 
Product (
ProductId INTEGER PRIMARY KEY NOT NULL, 
ProductName TEXT, 
ProductPrice INTEGER,
ProductImg TEXT,
ProductInfo TEXT
);
INSERT 
INTO 
Product 
(ProductName, ProductPrice) 
VALUES ('Coffee', 12000);
INSERT 
INTO 
Product 
(ProductName, ProductPrice) 
VALUES ('Coffee-1', 12000);
`);

const result = await db.runAsync(
  "INSERT INTO Product (ProductName, ProductPrice) VALUES (?, ?)",
  "ProductName",
  100
);
