import getDB from "./db";
import {
  capitalizeWord,
  formatCurrency1,
  formatDateTime,
  numberRgx,
} from "../utils";
//   const sql =
//     await db.getAllAsync(`SELECT * FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
// `);
//   console.log(sql);
const cashSchema = async () => {
  const db = await getDB();
  await db.execAsync(`
  CREATE
  TABLE IF NOT EXISTS
  Cash (
  CashId INTEGER PRIMARY KEY NOT NULL,
  CashDate TEXT,
  CashTime TEXT,
  CashName TEXT,
  CashBalance INTEGER,
  CashInfo TEXT
  );
  `);
};
const createCashAPI = async (req) => {
  const { cashName, cashBalance, cashInfo } = req;
  // validation
  if (!cashName && !cashBalance) {
    const msg = `Cash Name and Balance are required.`;
    throw new Error(msg);
  }
  // validate price
  const isNumber = numberRgx.test(cashBalance);
  if (!isNumber) {
    const errMsg = `Cash Balance must be Number`;
    throw new Error(errMsg);
  }
  const db = await getDB();
  const { yearNow, monthNow, dateNow, hourNow, minuteNow } = formatDateTime();
  if (cashBalance < 0) {
    const query = `
    SELECT 
    COALESCE(SUM(CashBalance), 0) AS CashSum 
    FROM Cash`;
    const { CashSum } = await db.getFirstAsync(query);
    if (Math.abs(cashBalance) > CashSum) {
      const errMsg = `Uppps Total Cash Available : ${formatCurrency1(CashSum)}`;
      throw new Error(errMsg);
    }
  }
  // execute
  const query = `
  INSERT 
  INTO 
  Cash
  (CashDate, CashTime, CashName, CashBalance, CashInfo)
  VALUES 
  (?, ?, ?, ?, ?)
  `;
  await db.runAsync(query, [
    `${yearNow}-${monthNow}-${dateNow}`,
    `${hourNow}:${minuteNow}`,
    capitalizeWord(cashName),
    cashBalance,
    cashInfo,
  ]);
  const msg = `${capitalizeWord(cashName)} - Has Been Created`;
  return msg;
};
const getCashAPI = async () => {
  const db = await getDB();
  const query = `
  SELECT * FROM Cash
  `;
  const data = await db.getAllAsync(query);
  const query1 = `
  SELECT 
  COALESCE(SUM(CashBalance), 0) AS CashSum 
  FROM Cash`;
  const { CashSum } = await db.getFirstAsync(query1);
  return { CashSum, data };
};
export { cashSchema, createCashAPI, getCashAPI };
