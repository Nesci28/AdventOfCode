import { readFile, writeFile } from "fs/promises";

type Input = string[];

async function parse(): Promise<Input> {
  const rawInput = (await readFile("./input.txt")).toString();
  let id = 0;
  const input = rawInput.split("").flatMap((x, i) => {
    const isEven = i % 2 === 0;
    // Data
    if (isEven) {
      const data = `${id}|`.repeat(+x);
      id += 1;
      return data;
    }

    // Free space
    const data = ".|".repeat(+x);
    return data;
  });

  const res = input.join("").replace(/\|$/, "").split("|");
  return res;
}

function swapElements<T>(arr: T[], pos1: number, pos2: number): T[] {
  const temp = arr[pos1];
  arr[pos1] = arr[pos2];
  arr[pos2] = temp;
  return arr;
}

function defrag(input: Input): Input {
  let lastElementIndex = Infinity;
  let firstDotIndex = -Infinity;

  while (firstDotIndex < lastElementIndex) {
    for (let i = input.length - 1; i >= 0; i -= 1) {
      const element = input[i];
      if (element !== ".") {
        lastElementIndex = i;
        break;
      }
    }

    for (let i = 0; i < input.length; i += 1) {
      const element = input[i];
      if (element === ".") {
        firstDotIndex = i;
        break;
      }
    }

    swapElements(input, firstDotIndex, lastElementIndex);
  }

  return input;
}

(async () => {
  const input = await parse();

  const defraggedInput = defrag(input);

  const numbers = defraggedInput.filter((x) => {
    return x !== ".";
  });
  const total = numbers.reduce<number>((accu, curr, i) => {
    accu += +curr * i;
    return accu;
  }, 0);

  console.log("total :>> ", total);
})();
