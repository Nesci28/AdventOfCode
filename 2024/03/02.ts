import { readFile } from "fs/promises";

async function parse(): Promise<string> {
  const rawInput = (await readFile("./input.txt")).toString();
  const inputs = rawInput.split("\n").join();
  return inputs;
}

function getAllNumbers(input: string): number[][] {
  const regex = new RegExp(/mul\((\d+,\d+)\)/, "g");
  const numbers: number[][] = [];
  while (true) {
    const t = regex.exec(input);
    if (!t) {
      break;
    }

    numbers.push(
      t[1].split(",").map((x) => {
        return +x;
      })
    );
  }

  return numbers;
}

(async () => {
  const input = await parse();

  const sections: string[] = [];

  const firstBoundary = input.search(/do\(\)|don't\(\)/);
  const subString =
    firstBoundary !== -1 ? input.slice(0, firstBoundary) : input;
  const matches = subString.match(/mul\(\d+,\d+\)/g) || [];
  sections.push(...matches);

  const regexAll = new RegExp(/do\(\)(.*?)don't\(\)/, "g");
  while (true) {
    const t = regexAll.exec(input);
    if (!t) {
      break;
    }

    sections.push(t[1]);
  }

  const numbers = sections.flatMap((x) => {
    return getAllNumbers(x);
  });

  const total = numbers.reduce<number>((accu, curr) => {
    const multiple = curr[0] * curr[1];
    accu += multiple;
    return accu;
  }, 0);
  console.log("total :>> ", total);
})();
