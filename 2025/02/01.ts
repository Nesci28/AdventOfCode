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
  const len = num.toString().length;
  const halfNum = numStr.slice(0, len / 2);
  const isEqual = `${halfNum}${halfNum}` === numStr;
  return isEqual;
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
