const original = require('./asset.json');

let noun = 20;
let verb = 20;

getOutput(noun, verb);

function getOutput(noun, verb) {
  const program = Array.from(original);
  program[1] = noun;
  program[2] = verb;
  for (let i = 0; i < program.length; i++) {
    if ((i === 0) | (i % 4 === 0)) {
      const opcode = program[i];
      const index = i;
      if (opcode === 1)
        program[program[index + 3]] =
          program[program[index + 1]] + program[program[index + 2]];
      if (opcode === 2)
        program[program[index + 3]] =
          program[program[index + 1]] * program[program[index + 2]];
      if (opcode === 99) {
        if (program[0] === 19690720) {
          console.log(100 * noun + verb);
          return;
        } else {
          verb += 1;
          if (verb > 99) {
            verb = 1;
            noun += 1;
          }
          return getOutput(noun, verb);
        }
      }
    }
  }
}
