let inputs = require("./inputs");

const originalInputs = JSON.parse(JSON.stringify(inputs));

for (let i = 0; i < inputs.length; i++) {
  const input = inputs[i];
  const [cmd, number] = input.split(" ");
  switch (true) {
    case cmd === "nop":
      inputs[i] = `jmp ${number}`;
      break;
    case cmd === "jmp":
      inputs[i] = `nop ${number}`;
      break;
  }
  const res = runCode(inputs);
  if (!res) {
    inputs = JSON.parse(JSON.stringify(originalInputs));
    continue;
  } else {
    console.log("res :>> ", res);
  }
}

function runCode(inputs) {
  let counter = 0;
  const executedSteps = new Set();

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const size = executedSteps.size;
    executedSteps.add(i);
    if (executedSteps.size === size) {
      return false;
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
  return counter;
}
