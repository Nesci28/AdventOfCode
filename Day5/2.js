const program = require('./asset.json');

const input = 5;

let opcode;
let increment;
let nextOpcode = 0;

let pm1;
let pm2;
let pm3;

let saved1;
let saved2;

const returnValues = {
  1: 4,
  2: 4,
  3: 2,
  4: 2,
  7: 4,
  8: 4,
};

function operations(opcode, index, pm1, pm2, pm3) {
  if (pm1 === 0) saved1 = program[program[index + 1]];
  if (pm1 === 1) saved1 = program[index + 1];
  if (pm2 === 0) saved2 = program[program[index + 2]];
  if (pm2 === 1) saved2 = program[index + 2];

  if (opcode === 1) {
    if (pm3 === 0) program[program[index + 3]] = saved1 + saved2;
    if (pm3 === 1) program[index + 3] = saved1 + saved2;
  }
  if (opcode === 2) {
    if (pm3 === 0) program[program[index + 3]] = saved1 * saved2;
    if (pm3 === 1) program[index + 3] = saved1 * saved2;
  }
  if (opcode === 3) {
    if (pm1 === 0) program[program[index + 1]] = input;
    if (pm1 === 1) program[index + 1] = input;
  }
  if (opcode === 4) {
    const logs = pm1 === 0 ? program[program[index + 1]] : program[index + 1];
    console.log('Output: ' + logs);
  }
  if (opcode === 5) {
    if (pm2 === 0)
      return saved1 === 0 ? index + 3 : program[program[index + 2]];
    if (pm2 === 1) return saved1 === 0 ? index + 3 : program[index + 2];
  }
  if (opcode === 6) {
    if (pm2 === 0)
      return saved1 === 0 ? program[program[index + 2]] : index + 3;
    if (pm2 === 1) return saved1 === 0 ? program[index + 2] : index + 3;
  }
  if (opcode === 7) {
    if (pm3 === 0) program[program[index + 3]] = saved1 < saved2 ? 1 : 0;
    if (pm2 === 1) program[index + 3] = saved1 < saved2 ? 1 : 0;
  }
  if (opcode === 8) {
    if (pm3 === 0) program[program[index + 3]] = saved1 === saved2 ? 1 : 0;
    if (pm3 === 1) program[index + 3] = saved1 === saved2 ? 1 : 0;
  }
  return returnValues[opcode];
}

for (let i = 0; i < program.length; i++) {
  if (i === nextOpcode) {
    opcode = program[i];
    index = i;
    if (opcode === 99) {
      console.log('program :', program[0]);
      break;
    }
    opcode = opcode.toString().padStart(5, 0);
    pm1 = +opcode[2];
    pm2 = +opcode[1];
    pm3 = +opcode[0];
    opcode = +opcode.substring(3);
    increment = operations(opcode, index, pm1, pm2, pm3);
    if (opcode === 5 || opcode === 6) {
      nextOpcode = increment;
    } else {
      nextOpcode += increment;
    }
  }
}
