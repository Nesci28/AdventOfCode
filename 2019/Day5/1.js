const program = require('./asset.json');

let opcode;
let increment;
let nextOpcode = 0;

let parameterMode1;
let parameterMode2;
let parameterMode3;

let saved1;
let saved2;
let inMemory = 1;

function operations(
  opcode,
  index,
  parameterMode1,
  parameterMode2,
  parameterMode3,
) {
  if (parameterMode1 === undefined || opcode === 4 || opcode === 3) {
    if (opcode === 1) {
      program[program[index + 3]] =
        program[program[index + 1]] + program[program[index + 2]];
      return 4;
    }
    if (opcode === 2) {
      program[program[index + 3]] =
        program[program[index + 1]] * program[program[index + 2]];
      return 4;
    }
    if (opcode === 3) {
      program[program[index + 1]] = inMemory;
      return 2;
    }
    if (opcode === 4) {
      console.log('outputs: ' + program[program[index + 1]]);
      return 2;
    }
  } else {
    if (parameterMode1 === 0) saved1 = program[program[index + 1]];
    if (parameterMode1 === 1) saved1 = program[index + 1];
    if (parameterMode2 === 0) saved2 = program[program[index + 2]];
    if (parameterMode2 === 1) saved2 = program[index + 2];
    if (opcode === 1) inMemory = saved1 + saved2;
    if (opcode === 2) inMemory = saved1 * saved2;
    if (parameterMode3 === 0) program[program[index + 3]] = inMemory;
    if (parameterMode3 === 1) program[index + 3] = inMemory;
    return 4;
  }
}

for (let i = 0; i < program.length; i++) {
  if (i === nextOpcode) {
    opcode = program[i];
    index = i;
    if (opcode < 99) increment = operations(opcode, index);
    if (opcode > 99) {
      opcode = opcode.toString().padStart(5, 0);
      parameterMode1 = +opcode[2];
      parameterMode2 = +opcode[1];
      parameterMode3 = +opcode[0];
      opcode = +opcode.substring(3);
      increment = operations(
        opcode,
        index,
        parameterMode1,
        parameterMode2,
        parameterMode3,
      );
    }
    if (opcode === 99) console.log('program :', program[0]);
    nextOpcode += increment;
  }
}
