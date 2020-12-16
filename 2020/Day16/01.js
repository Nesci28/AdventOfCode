const inputs = require("./inputs");

const rules = inputs.rules;
const tickets = inputs["nearby tickets"];

let counter = 0;
for (const ticket of tickets) {
  for (const num of ticket.split(",")) {
    if (!isNumberValid(num)) {
      counter += +num;
    }
  }
}

console.log("counter :>> ", counter);

function isNumberValid(num) {
  for (const ruleNumbers of Object.values(rules)) {
    for (const rule of ruleNumbers) {
      if (isNumberBetween(num, rule)) {
        return true;
      }
    }
  }

  return false;
}

function isNumberBetween(num, limits) {
  const [lower, higher] = limits.split("-");
  return +num >= +lower && +num <= +higher;
}
