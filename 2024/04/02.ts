import { readFile } from "fs/promises";
import { isEqual } from "lodash";

const directions: [number, number][][] = [
  [
    [-1, -1],
    [1, 1],
  ],
  [
    [-1, 1],
    [1, -1],
  ],
];

const possibilites = [
  ["M", "S"],
  ["S", "M"],
];

async function parse(): Promise<string[][]> {
  const rawInput = (await readFile("./input.txt")).toString();
  const inputs = rawInput.split("\n").map((x) => {
    return x.split("");
  });
  return inputs;
}

function getLetters({
  x,
  y,
  input,
  direction,
}: {
  x: number;
  y: number;
  input: string[][];
  direction: [number, number][];
}): string[] | undefined {
  try {
    const [direction1, direction2] = direction;
    const [x1, y1] = direction1;
    const [x2, y2] = direction2;
    const letter1 = input[y + y1][x + x1];
    const letter2 = input[y + y2][x + x2];
    return [letter1, letter2];
  } catch (_) {
    return undefined;
  }
}

function isXMas(x: number, y: number, input: string[][]): number {
  let validCount = 0;
  let isDirectionValid = true;
  for (let j = 0; j < directions.length; j += 1) {
    const direction = directions[j];
    const directionLetters = getLetters({ x, y, input, direction });
    const isPossiblityEqual =
      isEqual(directionLetters, possibilites[0]) ||
      isEqual(directionLetters, possibilites[1]);
    if (!isPossiblityEqual) {
      isDirectionValid = false;
      break;
    }
  }
  if (isDirectionValid) {
    validCount += 1;
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
      if (letter !== "A") {
        continue;
      }

      total += isXMas(x, y, input);
    }
  }

  console.log("total :>> ", total);
})();
