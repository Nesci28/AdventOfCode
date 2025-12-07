import { MathUtil } from "@yest/utils";
import { readFile } from "fs/promises";

type Input = string[];

async function parse(): Promise<Input> {
  const arg = process.argv[2];
  const rawInput = (
    await readFile(arg ? "sample.txt" : "input.txt")
  ).toString();

  const inputs = rawInput.split("\n");

  return inputs;
}

(async () => {
  const inputs = await parse();
  let total = 0;
  const length = inputs[0].length;
  let numbers: number[] = [];
  for (let x = length - 1; x >= 0; x -= 1) {
    let nums: number[] = [];
    for (let y = 0; y < inputs.length; y += 1) {
      const cell = inputs[y][x];
      if (/^\d$/.test(cell)) {
        nums.push(+cell);
      }

      // This is the end
      if (cell === "+" || cell === "*") {
        if (nums.length > 0) {
          const num = +nums
            .map((x) => {
              return x.toString();
            })
            .join("");
          numbers.push(num);
        }
        const t =
          cell === "+"
            ? MathUtil.add(...numbers)
            : MathUtil.multiply(1, ...numbers);
        console.log("numbers :>> ", numbers);
        total += t;

        numbers = [];
        nums = [];
        continue;
      }
      if (
        cell !== "+" &&
        cell !== "*" &&
        y === inputs.length - 1 &&
        nums.length > 0
      ) {
        // Column is done here
        const num = +nums
          .map((x) => {
            return x.toString();
          })
          .join("");
        numbers.push(num);
      }
    }
  }

  console.log("total :>> ", total);
})();
