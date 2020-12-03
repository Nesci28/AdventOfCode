const inputs = require('./inputs.js');

let xPos = 0;
let counter = 0;
for (let i = 1; i < inputs.length; i++) {
  const input = inputs[i];
  xPos = xPos + 3;
  const char = input[xPos];
  if (char === '#') {
    counter = counter + 1;
  }
}

console.log('counter :>> ', counter);
