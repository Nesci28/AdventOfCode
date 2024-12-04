import { readFile } from "fs/promises";

const directions: [number, number][] = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const letters = ["M", "A", "S"];

async function parse(): Promise<string[][]> {
  const rawInput = (await readFile("./input.txt")).toString();
  const inputs = rawInput.split("\n").map((x) => {
    return x.split("");
  });
  return inputs;
}

function getLetter({
  x,
  y,
  input,
  direction,
  index,
}: {
  x: number;
  y: number;
  input: string[][];
  direction: [number, number];
  index: number;
}): string | undefined {
  try {
    const [xDirection, yDirection] = direction;
    const letter =
      input[y + yDirection * (index + 1)][x + xDirection * (index + 1)];
    return letter;
  } catch (_) {
    return undefined;
  }
}

function isXMas(x: number, y: number, input: string[][]): number {
  let validCount = 0;
  for (let j = 0; j < directions.length; j += 1) {
    let isDirectionValid = true;
    const direction = directions[j];
    for (let i = 0; i < letters.length; i += 1) {
      const letter = letters[i];
      const nextLetter = getLetter({ x, y, input, direction, index: i });
      if (nextLetter !== letter) {
        isDirectionValid = false;
        break;
      }
    }
    if (isDirectionValid) {
      validCount += 1;
    }
  }

  return validCount;
}

(async () => {
  const input = await parse();

  let total = 0;
  for (let y = 0; y < input.length; y += 1) {
    const line = input[y];
    for (let x = 0; x < line.length; x += 1) {
      const letter = line[x];
      if (letter !== "X") {
        continue;
      }

      total += isXMas(x, y, input);
    }
  }

  console.log("total :>> ", total);
})();
