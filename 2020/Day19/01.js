const rawInputs = require("./inputs");

const rules = {};
const inputs = [];
for (const line of rawInputs) {
  if (line.includes(":")) {
    const [ruleNumber, rest] = line.split(":");
    rules[ruleNumber] = rest.trim();
  } else {
    inputs.push(line);
  }
}

const memoize = {};

function computeRules(value, rules) {
  if (value in memoize) {
    return memoize[value];
  }
  let result = "";
  if (value === "a" || value === "b") {
    result = value;
  } else if (/\|/.test(value)) {
    const [first, second] = value.split(" | ");
    result = `(${computeRules(first, rules)}|${computeRules(second, rules)})`;
  } else {
    const keys = value.split(" ");
    result = keys.map((k) => computeRules(rules[k], rules)).join(" ");
  }

  memoize[value] = result;
  return result;
}

computeRules(rules[0], rules);

let counter = 0;
const reg = new RegExp(`^${memoize[rules["0"]].replace(/ /g, "")}$`);
for (const input of inputs) {
  if (reg.test(input)) {
    counter += 1;
  }
}
console.log("counter :>> ", counter);
