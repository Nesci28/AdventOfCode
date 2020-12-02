const inputs = require("./inputs.js");

let valid = 0;
for (const input of inputs) {
  const positions = input[0].split("-");
  const [posOne, posTwo] = positions;

  const letter = Object.keys(input[1])[0];
  const password = Object.values(input[1])[0];

  let counter = 0;
  if (password[posOne - 1] === letter) {
    counter = counter + 1;
  }
  if (password[posTwo - 1] === letter) {
    counter = counter + 1;
  }

  if (counter === 1) {
    valid = valid + 1;
  }
}

console.log("valid :>> ", valid);
