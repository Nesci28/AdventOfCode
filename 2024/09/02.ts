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
  let lastElementIndexStart = Infinity;
  let lastElementIndexEnd = Infinity;
  let firstDotIndexStart = -Infinity;
  let firstDotIndexEnd = -Infinity;
  const ignoredSet = new Set<string>();

  while (firstDotIndexEnd < lastElementIndexEnd) {
    for (let i = input.length - 1; i >= 0; i -= 1) {
      const elementStart = input[i];
      if (ignoredSet.has(elementStart)) {
        continue;
      }
      if (elementStart !== ".") {
        lastElementIndexStart = i;
        for (let j = i - 1; j >= 0; j -= 1) {
          const elementEnd = input[j];
          if (elementEnd !== elementStart) {
            lastElementIndexEnd = j + 1;
            break;
          }
        }
        break;
      }
    }

    for (let i = 0; i < lastElementIndexEnd; i += 1) {
      const elementStart = input[i];
      if (elementStart === ".") {
        firstDotIndexStart = i;
        for (let j = firstDotIndexStart + 1; j < lastElementIndexEnd; j += 1) {
          const elementEnd = input[j];
          if (elementEnd !== elementStart) {
            firstDotIndexEnd = j - 1;
            break;
          }
        }
        break;
      }
    }

    const diffData = lastElementIndexStart - lastElementIndexEnd;
    const diffDots = firstDotIndexEnd - firstDotIndexStart;
    if (diffDots >= diffData) {
      for (let i = 0; i <= diffData; i += 1) {
        swapElements(input, lastElementIndexStart - i, firstDotIndexStart + i);
      }
    } else {
      ignoredSet.add(input[lastElementIndexStart]);
    }
  }

  return input;
}

(async () => {
  const input = await parse();
  const defraggedInput = defrag(input);
  console.log("defraggedInput :>> ", defraggedInput);

  const numbers = defraggedInput.filter((x) => {
    return x !== ".";
  });
  const total = numbers.reduce<number>((accu, curr, i) => {
    accu += +curr * i;
    return accu;
  }, 0);

  console.log("total :>> ", total);
})();
