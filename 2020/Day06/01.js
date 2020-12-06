const rawInputs = require('./inputs');

// Clean inputs
const splittedInputs = rawInputs.split('\n\n');
const cleanedInputs = [];
splittedInputs.forEach(input => cleanedInputs.push(input.split('\n')));
const firstJoinInputs = [];
cleanedInputs.forEach(input => firstJoinInputs.push(input.join()));
const commasInputs = [];
firstJoinInputs.forEach(input => commasInputs.push(input.split(',')));
const cleanedUpInputs = [];
commasInputs.forEach(input => cleanedUpInputs.push(input.join(' ')));
const inputs = []
cleanedUpInputs.forEach(input => inputs.push(input.replace(/[^a-z]+/g, '')));

let counter = 0;

inputs.forEach(input => {
  const inputSet = [...new Set(input.split(''))]
  counter = counter + inputSet.length;
});

console.log('counter :>> ', counter);