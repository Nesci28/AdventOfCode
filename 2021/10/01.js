/* eslint-disable default-case */
/* eslint-disable no-restricted-syntax */
const fs = require("fs");

const inputs = fs
  .readFileSync("./inputs.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .split("\n");

let total = 0;
const closingOrders = [];
for (const input of inputs) {
  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    const currentTotal = total;
    switch (char) {
      case "(":
        closingOrders.unshift(")");
        break;
      case "[":
        closingOrders.unshift("]");
        break;
      case "{":
        closingOrders.unshift("}");
        break;
      case "<":
        closingOrders.unshift(">");
        break;
      case ")":
        closingOrders[0] !== ")"
          ? total += 3
          : closingOrders.shift();
        break;
      case "]":
        closingOrders[0] !== "]"
          ? total += 57
          : closingOrders.shift();
        break;
      case "}":
        closingOrders[0] !== "}"
          ? total += 1197
          : closingOrders.shift();
        break;
      case ">":
        closingOrders[0] !== ">"
          ? total += 25137
          : closingOrders.shift();
        break;
    }

    if (total > currentTotal) {
      closingOrders.length = 0;
      break;
    }
  }
}

console.log("total :>> ", total);
