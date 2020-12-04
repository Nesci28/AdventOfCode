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

// Convert to object
const dividedInputs = [];
cleanedUpInputs.forEach(input => dividedInputs.push(input.split(' ')));
const inputs = [];
for (const dividedInput of dividedInputs) {
  const object = {};
  dividedInput.forEach(input => {
    const [key, value] = input.split(':');
    object[key] = value;
  });
  inputs.push(object);
}

// Algo
let counter = 0;
for (const input of inputs) {
  const compare = {
    byr: 1,
    iyr: 1,
    eyr: 1,
    hgt: 1,
    hcl: 1,
    ecl: 1,
    pid: 1,
    // cid: 1,
  }

  Object.keys(input).forEach(key => {
    if (key !== 'cid') {
      compare[key] = 0
    }
  });
  if (Object.values(compare).filter(value => value === 1).length === 0) {
    counter = counter + 1;
  }
}

console.log('counter :>> ', counter);