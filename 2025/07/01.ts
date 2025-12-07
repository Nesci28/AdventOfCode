import { readFile } from "fs/promises";

type Input = ("S" | "." | "^")[][];

async function parse(): Promise<Input> {
  const arg = process.argv[2];
  const rawInput = (await readFile(arg ? "sample.txt" : "input.txt"))
    .toString()
    .trim();

  const inputs = rawInput.split("\n").map((x) => {
    return x.split("");
  }) as Input;

  return inputs;
}

function findAllIndices(arr: number[], condition: number) {
  const indices = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === condition) {
      indices.push(i);
    }
  }
  return indices;
}

(async () => {
  const inputs = await parse();

  let total = 0;
  const dp = Array.from({ length: inputs.length }, () => {
    return Array(inputs[0].length).fill(0);
  });

  const sIndex = inputs[0].findIndex((x) => {
    return x === "S";
  });
  dp[0][sIndex] = 1;

  for (let y = 0; y < inputs.length - 1; y += 1) {
    const beamIndexes = findAllIndices(dp[y], 1);
    // check next row
    for (let i = 0; i < beamIndexes.length; i += 1) {
      const char = inputs[y + 1][beamIndexes[i]];
      if (char === ".") {
        dp[y + 1][beamIndexes[i]] = 1;
      }
      if (char === "^") {
        total += 1;
        if (beamIndexes[i] - 1 >= 0) {
          dp[y + 1][beamIndexes[i] - 1] = 1;
        }
        if (beamIndexes[i] + 1 <= inputs[0].length - 1) {
          dp[y + 1][beamIndexes[i] + 1] = 1;
        }
      }
    }
  }

  console.log("total :>> ", total);
})();
