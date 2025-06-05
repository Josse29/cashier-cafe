const noNumberRgx = /[^.\d]/g;
const noNumberRgx1 = /[^,\d]/g;
const numberRgx = /^(?:-?(?:0\.\d+|[1-9]\d*(?:\.\d+)?)(?:[eE][-+]?\d+)?)$/;
export { noNumberRgx, noNumberRgx1, numberRgx };
