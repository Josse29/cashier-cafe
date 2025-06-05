import { noNumberRgx1 } from "./regex";

const formatCurrency = (num) => {
  if (!num) return "";
  let number_string = num.toString().replace(noNumberRgx1, "");
  let split = number_string.split(",");
  let integerPart = split[0].replace(/^0+(?!$)/, "");
  let remain = integerPart.length % 3;
  let currency = integerPart.substr(0, remain);
  let thousands = integerPart.substr(remain).match(/\d{3}/gi);
  if (thousands) {
    let separator = remain ? "." : "";
    currency += separator + thousands.join(".");
  }
  currency = split[1] !== undefined ? currency + "," + split[1] : currency;
  return currency ? "Rp " + currency : "";
};
const unFormatCurrency = (val) => {
  const price = val
    ? val
        .replace(/^Rp\s*/, "")
        .replace(/\./g, "")
        .replace(/,/g, ".")
    : 0;
  return price;
};
export { formatCurrency, unFormatCurrency };
