import { readFile } from "fs/promises";

type Input = number[][];

async function parse(): Promise<Input> {
  const arg = process.argv[2];
  const rawInput = (await readFile(arg ? "sample.txt" : "input.txt"))
    .toString()
    .trim();
  const inputs = rawInput.split("\n").map((x) => {
    return x.split("").map(Number);
  });

  return inputs;
}

function getMaxFromStart(numbers: number[]): { start: number; index: number } {
  let highestNumber = 0;
  let index = 0;
  for (let i = 0; i < numbers.length - 1; i += 1) {
    const num = numbers[i];
    if (num === 9) {
      return { start: 9, index: i };
    }
    if (num > highestNumber) {
      highestNumber = num;
      index = i;
    }
  }

  return { start: highestNumber, index };
}

function getMaxFromEnd(numbers: number[], index: number): number {
  let highestNumber = 0;
  for (let i = numbers.length - 1; i > index; i -= 1) {
    const num = numbers[i];
    if (num === 9) {
      return 9;
    }
    if (num > highestNumber) {
      highestNumber = num;
    }
  }

  return highestNumber;
}

(async () => {
  const inputs = await parse();
  let total = 0;
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const { start, index } = getMaxFromStart(input);
    const end = getMaxFromEnd(input, index);
    const value = +`${start}${end}`;
    total += value;
  }

  console.log("total :>> ", total);
})();
