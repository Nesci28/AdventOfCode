import { readFile } from "fs/promises";
import { flatten } from "lodash";

type Input = { point: { x: number; y: number }; frequency: string };
type Antinode = string;

let limitX = 0;
let limitY = 0;

async function parse(): Promise<Input[]> {
  const rawInput = (await readFile("./input.txt")).toString();
  const input = flatten(
    rawInput.split("\n").map((x, y) => {
      return x.split("").map((k, x) => {
        return {
          point: { x, y },
          frequency: k,
        };
      });
    })
  );

  limitX = Math.max(
    ...input.map((x) => {
      return x.point.x;
    })
  );
  limitY = Math.max(
    ...input.map((x) => {
      return x.point.y;
    })
  );

  return input;
}

function getAntinodes(input: Input, inputs: Input[]): Antinode[] {
  const { point, frequency } = input;
  const antinodes = new Set<Antinode>();
  const otherSameFrequenciesInputs = inputs.filter((x) => {
    return (
      x.frequency === frequency &&
      x.point.x !== point.x &&
      x.point.y !== point.y
    );
  });
  for (let i = 0; i < otherSameFrequenciesInputs.length; i += 1) {
    const otherSameFrequenciesInput = otherSameFrequenciesInputs[i];
    antinodes.add(`${point.x},${point.y}`);
    antinodes.add(
      `${otherSameFrequenciesInput.point.x},${otherSameFrequenciesInput.point.y}`
    );

    const xDiff = point.x - otherSameFrequenciesInput.point.x;
    const yDiff = point.y - otherSameFrequenciesInput.point.y;

    let inputAntinodeX = point.x + xDiff;
    let inputAntinodeY = point.y + yDiff;
    while (
      inputAntinodeX >= 0 &&
      inputAntinodeX < limitX &&
      inputAntinodeY >= 0 &&
      inputAntinodeY < limitY
    ) {
      antinodes.add(`${inputAntinodeX},${inputAntinodeY}`);
      inputAntinodeX = inputAntinodeX + xDiff;
      inputAntinodeY = inputAntinodeY + yDiff;
    }

    let otherInputAntinodeX = otherSameFrequenciesInput.point.x + xDiff * -1;
    let otherInputAntinodeY = otherSameFrequenciesInput.point.y + yDiff * -1;
    while (
      otherInputAntinodeX >= 0 &&
      otherInputAntinodeX <= limitX &&
      otherInputAntinodeY >= 0 &&
      otherInputAntinodeY <= limitY
    ) {
      antinodes.add(`${otherInputAntinodeX},${otherInputAntinodeY}`);
      otherInputAntinodeX = otherInputAntinodeX + xDiff * -1;
      otherInputAntinodeY = otherInputAntinodeY + yDiff * -1;
    }
  }

  return Array.from(antinodes);
}

(async () => {
  const inputs = await parse();
  const sets = new Set<Antinode>();

  for (let i = 0; i < inputs.length; i += 1) {
    const input = inputs[i];
    if (input.frequency === ".") {
      continue;
    }
    const antinodes = getAntinodes(input, inputs);
    antinodes.forEach((x) => {
      sets.add(x);
    });
  }
  console.log("sets :>> ", sets);
  console.log("total :>> ", sets.size);
})();
