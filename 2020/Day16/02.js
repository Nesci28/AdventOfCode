const inputs = require("./inputs");

const rules = inputs.rules;
const myTicket = inputs["your ticket"];
const nearbyTickets = inputs["nearby tickets"];
const tickets = [...myTicket, ...nearbyTickets];

// Getting the invalid tickets
const invalidTickets = [];
for (const ticket of tickets) {
  nestedLoop: for (const num of ticket.split(",")) {
    if (isNumberValid(num).length === 0) {
      invalidTickets.push(ticket);
      break nestedLoop;
    }
  }
}

// Getting the valid tickets
const validTickets = [];
for (const ticket of tickets) {
  if (!invalidTickets.includes(ticket)) {
    validTickets.push(ticket);
  }
}

const validTicketsSplitted = validTickets.reduce((accu, curr) => {
  accu.push(curr.split(","));
  return accu;
}, []);

// Map columns to rules
const maps = [];
for (let i = 0; i < validTicketsSplitted[0].length; i++) {
  const mapped = Object.keys(rules).reduce(
    (accu, curr) => ({
      ...accu,
      [curr]: 0,
    }),
    {}
  );
  const numbers = validTicketsSplitted.reduce((accu, curr) => {
    accu.push(curr[i]);
    return accu;
  }, []);

  for (const num of numbers) {
    const rule = isNumberValid(num);
    if (rule.length > 0) {
      rule.forEach((r) => (mapped[r] += 1));
    }
  }
  maps.push(mapped);
}

// Getting possible rules for each column
const possibleRules = [];
for (const map of maps) {
  possibleRules.push(
    Object.entries(map)
      .filter((m) => m[1] === validTickets.length)
      .map((e) => e[0])
  );
}

// Defining each rules for each column
const definedRules = Array(Object.keys(rules).length).fill(undefined);
for (let i = 0; i < possibleRules.length; i++) {
  let rule = possibleRules[i];
  rule = rule.filter((r) => !definedRules.includes(r));
  if (rule.length === 1) {
    definedRules[i] = rule[0];
    i = -1;
  }
}

// Getting the indexes of "departure" fields
const indexes = [];
definedRules.forEach((d, i) => {
  if (d.includes("departure")) {
    indexes.push(i);
  }
});

// Getting the result
let counter = 1;
indexes.forEach((i) => (counter *= +myTicket[0].split(",")[i]));

console.log("counter :>> ", counter);

function isNumberValid(num) {
  const allRules = [];
  for (const [ruleTitle, ruleNumbers] of Object.entries(rules)) {
    for (const rule of ruleNumbers) {
      if (isNumberBetween(num, rule)) {
        allRules.push(ruleTitle);
      }
    }
  }

  return allRules;
}

function isNumberBetween(num, limits) {
  const [lower, higher] = limits.split("-");
  return +num >= +lower && +num <= +higher;
}
