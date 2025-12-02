import { readFile } from "fs/promises";

type Input = { start: number; end: number }[];

async function parse(): Promise<Input> {
  const arg = process.argv[2];
  const rawInput = (await readFile(arg ? "test.txt" : "./input.txt"))
    .toString()
    .trim();
  const inputs = rawInput.split(",").map((x) => {
    const [start, end] = x.split("-");
    return {
      start: +start,
      end: +end,
    };
  });

  return inputs;
}

function checkIfInvalid(num: number): boolean {
  const numStr = num.toString();
  for (let i = 0; i < Math.floor(numStr.length / 2); i += 1) {
    const part = numStr.slice(0, i + 1);
    const repeatCount = numStr.length / part.length;
    if (!Number.isInteger(repeatCount)) {
      continue;
    }
    const isEqual = part.repeat(repeatCount) === numStr;
    if (isEqual) {
      return true;
    }
  }

  return false;
}

(async () => {
  const inputs = await parse();
  const total = inputs.reduce<number>((accu, curr) => {
    const { start, end } = curr;
    for (let i = start; i <= end; i++) {
      const isInvalid = checkIfInvalid(i);
      if (isInvalid) {
        accu += i;
      }
    }
    return accu;
  }, 0);

  console.log("total :>> ", total);
})();
