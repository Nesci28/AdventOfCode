const inputs = require("./inputs");

const interval = 25;

const invalidNumber = findInvalidNumber(inputs, interval);
const contiguousNumbers = findContiguous(inputs, invalidNumber);
const sum = findSumOfSmallAndBig(contiguousNumbers);
console.log("sum :>> ", sum);

function findSumOfSmallAndBig(numbers) {
  const sorted = numbers.sort((a, b) => +a - +b);
  return +sorted[0] + +sorted[sorted.length - 1];
}

function findContiguous(inputs, invalidNumber) {
  for (let i = 0; i < inputs.length; i++) {
    let counter = 0;
    let result = 0;
    while (true) {
      result += +inputs[i + counter];
      if (result === +invalidNumber && counter > 0) {
        return inputs.splice(i, counter + 1);
      }
      if (result > invalidNumber) {
        break;
      }
      counter += 1;
    }
  }
}

function findInvalidNumber(inputs, interval) {
  for (let i = interval; i < inputs.length; i++) {
    const number = inputs[i];
    const preamble = inputs.slice(i - interval, i);
    const isValid = checkPreamble(preamble, number);
    if (!isValid) {
      return number;
    }
  }
}

function checkPreamble(inputs, number) {
  for (let i = 0; i < inputs.length; i++) {
    const firstNumber = inputs[i];
    for (let j = i + 1; j < inputs.length; j++) {
      const secondNumber = inputs[j];
      if (+firstNumber + +secondNumber === +number) {
        return true;
      }
    }
  }
  return false;
}
