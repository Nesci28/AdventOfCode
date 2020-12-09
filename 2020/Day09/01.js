const inputs = require("./inputs");

const interval = 25;

for (let i = interval; i < inputs.length; i++) {
  const number = inputs[i];
  const preamble = inputs.slice(i - interval, i);
  const isValid = checkPreamble(preamble, number);
  if (!isValid) {
    console.log("number :>> ", number);
    break;
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
