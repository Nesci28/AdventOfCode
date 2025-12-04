import { readFile } from "fs/promises";

type Input = ("." | "@");

const directions = [
  [-1, -1], [-1, 0], [-1, 1],
  [ 0, -1],          [ 0, 1],
  [ 1, -1], [ 1, 0], [ 1, 1],
];

async function parse(): Promise<Input[][]> {
  const arg = process.argv[2];
  const rawInput = (await readFile(arg ? "sample.txt" : "input.txt"))
    .toString()
    .trim();
  const inputs = rawInput.split("\n").map((x) => {
    return x.split("") as ("." | "@")[];
  })

  return inputs;
}

function calculateNeighbor(x: number, y: number, inputs: Input[][]): Input[] {
  const neighbors: ("." | "@")[] = [];
  for (const [dr, dc] of directions) {
    const r = y + dr;
    const c = x + dc;

    if (r >= 0 && r < inputs.length && c >= 0 && c < inputs[0].length) {
      neighbors.push(inputs[r][c]);
    }
  }

  return neighbors;
}

(async () => {
  const inputs = await parse();
  let total = 0;
  for (let i = 0; i < inputs.length; i += 1) {
    const row = inputs[i];
    for (let j = 0; j < row.length; j += 1) {
      const cell = row[j];
      if (cell === ".") {
        continue;
      }

      const neighbors = calculateNeighbor(j, i, inputs);
      const paperNeightbors = neighbors.filter((x) => {
        return x === "@";
      })
      if (paperNeightbors.length < 4) {
        total += 1;
      }
    }  
  }

  console.log("total :>> ", total);
})();
