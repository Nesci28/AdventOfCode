import { MathUtil } from "@yest/utils";
import { readFile } from "fs/promises";

type Input = ("+" | "*" | number)[][];

async function parse(): Promise<Input> {
  const arg = process.argv[2];
  const rawInput = (await readFile(arg ? "sample.txt" : "input.txt"))
    .toString()
    .trim();

  const inputs = rawInput.split("\n").map((x) => {
    const whitespacedX = x.trim().replace(/\s\s+/g, " ");
    return whitespacedX.split(" ").map((y) => {
      return /^\d+$/.test(y) ? +y : (y as "+" | "*");
    });
  });

  const rotatedInputs = rotateCCW(inputs);

  return rotatedInputs;
}

function rotateCCW(matrix: Input): Input {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const result = Array.from({ length: cols }, () => Array(rows).fill(null));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      result[cols - c - 1][r] = matrix[r][c];
    }
  }

  return result;
}

(async () => {
  const inputs = await parse();
  const total = inputs.reduce((accu, curr) => {
    const sign = curr.pop();
    const numbers = curr as number[];
    const t =
      sign === "+"
        ? MathUtil.add(...numbers)
        : MathUtil.multiply(1, ...numbers);
    accu += t;
    return accu;
  }, 0);

  console.log("total :>> ", total);
})();
