import { inputs } from "./inputs";

export const cmdMap: Record<string, number> = {
  noop: 1,
  addx: 2,
};

function main(): void {
  const cycles = [20, 60, 100, 140, 180, 220];
  let registerX = 1;
  let cycle = 0;
  let total = 0;

  for (let i = 0; i < inputs.length; i += 1) {
    const input = inputs[i];
    const [cmd, nbr] = input.split(" ");

    for (let j = 1; j <= cmdMap[cmd]; j += 1) {
      cycle += 1;
      if (cycles.includes(cycle)) {
        total += cycle * registerX;
      }
    }
    if (nbr) {
      registerX += +nbr;
    }
  }

  console.log(`step 1: ${total}`);
}

main();
