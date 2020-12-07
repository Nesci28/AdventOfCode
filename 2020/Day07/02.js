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
    element[mainBag.trim()][bagType] = +number;
  });
  rules.push(element);
}

const routes = [];
checkRules();

function checkRules(type = ["shiny gold"]) {
  const lastEl = type[type.length - 1];
  const index = rules
    .map((r) => Object.keys(r))
    .flat()
    .findIndex((t) => t === lastEl);
  const rule = rules[index][lastEl];
  const entries = Object.entries(rule);
  for (const entry of entries) {
    if (entry[0] === "noother") {
      routes.push(type);
      return;
    } else {
      checkRules([...type, entry[0]]);
    }
  }
}

const uniqueRoutes = new Set();
for (const route of routes) {
  for (let i = 0; i <= route.length; i++) {
    const finalRoute = route.slice(0, i).join("-");
    if (finalRoute) {
      uniqueRoutes.add(finalRoute);
    }
  }
}
let counter = 0;

[...uniqueRoutes].forEach((r) => {
  const activeRoute = r.split("-");
  let activeCounter = 1;
  for (let i = 0; i < activeRoute.length - 1; i++) {
    const type = activeRoute[i];
    const nextType = activeRoute[i + 1];
    const index = rules
      .map((r) => Object.keys(r))
      .flat()
      .findIndex((t) => t === type);
    const number = rules[index][type][nextType];
    activeCounter *= number;
  }
  counter += activeCounter;
});

console.log("counter :>> ", counter - 1);
