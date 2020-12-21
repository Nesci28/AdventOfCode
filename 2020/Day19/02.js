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

rules["8"] = "42 | 42 8";
rules["11"] = "42 31 | 42 11 31";

const memoize = {};

function computeRules(value, rules) {
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

computeRules(rules[42], rules);
computeRules(rules[31], rules);

const reg = new RegExp(
  `^(?<group42>(${memoize[rules[42]].replace(/ /g, "")})+)(?<group31>(${memoize[
    rules[31]
  ].replace(/ /g, "")})+)$`
);

let counter = 0;
for (const input of inputs) {
  const matches = reg.exec(input);
  if (matches) {
    const { groups } = matches;
    const matches42 = groups.group42.match(
      new RegExp(memoize[rules[42]].replace(/ /g, ""), "g")
    ).length;
    const matches31 = groups.group31.match(
      new RegExp(memoize[rules[31]].replace(/ /g, ""), "g")
    ).length;
    if (matches42 > matches31) {
      counter++;
    }
  }
}
console.log("counter :>> ", counter);
