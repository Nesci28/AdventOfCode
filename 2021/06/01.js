/* eslint-disable no-restricted-syntax */
const fs = require("fs");

const inputs = fs
  .readFileSync("./inputs.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .split("\n")
  .filter(Boolean)
  .map((l) => l.split(","))
  .flat()
  .map(Number);

class Lanternfish {
  internalTimer;

  constructor(internalTimer) {
    this.internalTimer = internalTimer;
  }

  minusDay() {
    if (this.internalTimer === -1) {
      this.internalTimer = 6;
    }
    this.internalTimer -= 1;
  }
}

const lanterfishes = inputs.map((i) => new Lanternfish(i));

for (let i = 1; i <= 80; i += 1) {
  lanterfishes.forEach((l) => {
    l.minusDay();
    if (l.internalTimer === -1) {
      lanterfishes.push(new Lanternfish(8));
    }
  });
}

const total = lanterfishes.length;
console.log("total :>> ", total);
