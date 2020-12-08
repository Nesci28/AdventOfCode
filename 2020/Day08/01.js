const inputs = require("./inputs");

const executedSteps = new Set();
let counter = 0;

for (let i = 0; i < inputs.length; i++) {
  const input = inputs[i];
  const size = executedSteps.size;
  executedSteps.add(i);
  if (executedSteps.size === size) {
    console.log("counter :>> ", counter);
    process.exit();
  }
  const [cmd, number] = input.split(" ");
  switch (true) {
    case cmd === "nop":
      continue;
    case cmd === "acc":
      counter += +number;
      break;
    case cmd === "jmp":
      i = i + +number - 1;
      break;
  }
}
