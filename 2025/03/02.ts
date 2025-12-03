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

function getNext(
  numbers: number[],
  index: number,
  length: number
): { start: number; index: number } {
  let highestNumber = 0;
  let currentIndex = 0;
  for (let i = index; i <= numbers.length - (12 - length); i += 1) {
    const num = numbers[i];
    if (num === 9) {
      return { start: 9, index: i };
    }
    if (num > highestNumber) {
      highestNumber = num;
      currentIndex = i;
    }
  }

  return { start: highestNumber, index: currentIndex };
}

(async () => {
  const inputs = await parse();
  let total = 0;
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    let value = "";
    let index = 0;
    for (let j = 0; j < 12; j += 1) {
      const { start, index: nextIndex } = getNext(input, index, value.length);
      value += start;
      index = nextIndex + 1;
    }
    total += +value;
  }

  console.log("total :>> ", total);
})();
