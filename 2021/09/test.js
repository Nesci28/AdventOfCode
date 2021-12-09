/* eslint-disable no-restricted-syntax */
const fs = require("fs");
const _ = require("lodash");

const inputs = fs
  .readFileSync("./inputs.txt", { encoding: "utf-8" })
  .split("\n")
  .map((x) => x.replace(/[^9]/g, "0"))
  .join("\n");

fs.writeFileSync("./test.txt", inputs);
// .replace(/\r/g, "")
// .split("\n")
// .filter(Boolean)
// .map((x) => x.split("").map(Number));
