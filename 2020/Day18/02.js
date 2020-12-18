const inputs = require("./inputs");

const answers = [];

for (const input of inputs) {
  const equation = input.replace(/\s/g, "");
  const answer = findInnerParentheses(equation);
  answers.push(answer);
}

const counter = answers.reduce((accu, curr) => (accu += curr), 0);
console.log("counter; :>> ", counter);

function findInnerParentheses(equation) {
  if (!equation.includes("(")) {
    const finalAnswer = solveEquation(equation);
    return finalAnswer;
  }
  let maxCounter = 0;
  let counter = 0;
  for (let i = 0; i < equation.length; i++) {
    const char = equation[i];
    if (char === "(") {
      counter += 1;
    } else if (char === ")") {
      if (counter > maxCounter) {
        maxCounter = counter;
      }
      counter -= 1;
    }
  }
  counter = 0;
  const innerEquation = [];
  for (let i = 0; i < equation.length; i++) {
    const char = equation[i];
    if (char === "(") {
      counter += 1;
      if (counter === maxCounter) {
        innerEquation.push(char);
      }
    } else if (counter !== maxCounter && char === ")") {
      counter -= 1;
    } else if (counter === maxCounter && char === ")") {
      innerEquation.push(char);
      const smallEquation = innerEquation.join("");
      const answer = solveEquation(smallEquation);
      equation = equation.replace(smallEquation, answer);
      innerEquation.length = 0;
      return findInnerParentheses(equation);
    } else if (counter === maxCounter) {
      innerEquation.push(char);
    }
  }
}

function solveEquation(equation) {
  equation = equation.replace("(", "").replace(")", "");
  if (equation.includes("+")) {
    const [firstPart, secondPart] = equation.split("+");
    const firstDigit = getDigitsReversed(firstPart, firstPart.length - 1);
    const secondDigit = getDigits(secondPart, 0);
    const answer = eval(`${firstDigit}+${secondDigit}`);
    equation = equation.replace(`${firstDigit}+${secondDigit}`, answer);
    return solveEquation(equation);
  }
  if (equation.includes("*")) {
    const [firstPart, secondPart] = equation.split("*");
    const firstDigit = getDigitsReversed(firstPart, firstPart.length - 1);
    const secondDigit = getDigits(secondPart, 0);
    const answer = eval(`${firstDigit}*${secondDigit}`);
    equation = equation.replace(`${firstDigit}*${secondDigit}`, answer);
    return solveEquation(equation);
  }

  return +equation;
}

function getDigitsReversed(equation, i) {
  let digits = [];
  let counter = i;
  while (
    equation[counter] !== "+" &&
    equation[counter] !== "*" &&
    equation[counter] !== undefined
  ) {
    digits.push(equation[counter]);
    counter -= 1;
  }

  digits = digits.reverse().join("");
  return digits;
}

function getDigits(equation, i) {
  let digits = [];
  let counter = i;
  while (
    equation[counter] !== "+" &&
    equation[counter] !== "*" &&
    equation[counter] !== undefined
  ) {
    digits.push(equation[counter]);
    counter += 1;
  }
  return digits.join("");
}
