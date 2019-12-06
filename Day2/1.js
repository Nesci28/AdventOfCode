const program = require('./asset.json');

let opcode;
let index;

program[1] = 12;
program[2] = 2;

for (let i = 0; i < program.length; i++) {
  if ((i === 0) | (i % 4 === 0)) {
    opcode = program[i];
    index = i;
    if (opcode === 1)
      program[program[index + 3]] =
        program[program[index + 1]] + program[program[index + 2]];
    if (opcode === 2)
      program[program[index + 3]] =
        program[program[index + 1]] * program[program[index + 2]];
    if (opcode === 99) console.log('program :', program[0]);
  }
}
