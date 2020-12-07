const inputs = require("./inputs");

const rules = [];

for (const input of inputs) {
  let [mainBag, secondaryBags] = input.split("contain");
  mainBag = mainBag.replace("bags", "");
  const secondaries = [];
  secondaryBags
    .split(",")
    .forEach((input) =>
      secondaries.push(input.split(" ").slice(0, -1).filter(Boolean).join(" "))
    );
  const element = { [mainBag.trim()]: {} };
  secondaries.forEach((bag) => {
    const number = bag.replace(/\D/g, "");
    const reg = new RegExp(number + " ");
    const bagType = bag.replace(reg, "");
    element[mainBag.trim()][bagType] = number;
  });
  rules.push(element);
}
checkRules();

function checkRules(goldBagsSet = new Set(), type = "shiny gold", i = -1) {
  const size = goldBagsSet.size;
  for (const rule of rules) {
    const mainBag = rule[Object.keys(rule)[0]];
    const keys = Object.keys(mainBag);
    keys.forEach((key) => {
      if (key.match(type)) {
        goldBagsSet.add(Object.keys(rule)[0]);
      }
    });
  }
  if (i === goldBagsSet.size) {
    console.log("size :>> ", size);
    return;
  }
  checkRules(goldBagsSet, Array.from(goldBagsSet)[i], i + 1);
}
