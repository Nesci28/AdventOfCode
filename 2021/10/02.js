/* eslint-disable default-case */
/* eslint-disable no-restricted-syntax */
const fs = require("fs");

const inputs = fs
  .readFileSync("./inputs.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .split("\n");

const errorsScore = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

const scores = [];
const closingOrders = [];
for (const input of inputs) {
  let subTotal = 0;
  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    const currentTotal = subTotal;
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
          ? subTotal += 3
          : closingOrders.shift();
        break;
      case "]":
        closingOrders[0] !== "]"
          ? subTotal += 57
          : closingOrders.shift();
        break;
      case "}":
        closingOrders[0] !== "}"
          ? subTotal += 1197
          : closingOrders.shift();
        break;
      case ">":
        closingOrders[0] !== ">"
          ? subTotal += 25137
          : closingOrders.shift();
        break;
    }

    if (subTotal > currentTotal) {
      closingOrders.length = 0;
      break;
    }
  }

  let total = 0;
  for (const closingOrder of closingOrders) {
    total *= 5;
    total += errorsScore[closingOrder];
  }
  closingOrders.length = 0;
  if (total) {
    scores.push(total);
  }
}

scores.sort((a, b) => a - b);
const total = scores[Math.floor(scores.length / 2)];

console.log("total :>> ", total);
