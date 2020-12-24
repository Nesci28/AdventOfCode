const rawInputs = require("./inputs");

const inputs = rawInputs.split("").map((x) => +x);

const { lowestCup, highestCup } = findLowestAndHighestCup();
const numberOfTurn = 100;
let selectedCup = inputs[0];

inputs.unshift(inputs.pop());

for (let i = 0; i < numberOfTurn; i++) {
  inputs.push(inputs.shift());
  const deletedNumbers = inputs.splice(1, 3);
  const destination = findDestination(selectedCup) + 1;
  inputs.splice(destination, 0, ...deletedNumbers);
  let index = findIndexOfSelectedNumber(selectedCup);
  index += 1;
  if (index > inputs.length - 1) {
    index = 0;
  }
  selectedCup = inputs[index];
}

const index = findIndexOfSelectedNumber(1);
const part1 = inputs.splice(index + 1);
inputs.pop();

console.log("counter :>> ", `${part1.join("")}${inputs.join("")}`);

function findLowestAndHighestCup() {
  const sortedInputs = JSON.parse(JSON.stringify(inputs)).sort((a, b) => a - b);
  return {
    lowestCup: sortedInputs.shift(),
    highestCup: sortedInputs.pop(),
  };
}

function findIndexOfSelectedNumber(number) {
  return inputs.indexOf(number);
}

function findDestination(currentCup) {
  let counter = currentCup;
  while (true) {
    counter -= 1;
    if (counter < lowestCup) {
      counter = highestCup;
    }
    const index = findIndexOfSelectedNumber(counter);
    if (index !== -1) {
      return index;
    }
  }
}
