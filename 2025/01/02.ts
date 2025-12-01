import { readFile } from "fs/promises";

type Input = { direction: "L" | "R"; step: number };

async function parse(): Promise<Input[]> {
  const arg = process.argv[2];
  const rawInput = (await readFile(arg ? "test.txt" : "./input.txt"))
    .toString()
    .trim();
  const inputs: Input[] = rawInput.split("\n").map((x) => {
    const matches = x.match(/^(\w)(\d+)/);
    if (matches?.length !== 3) {
      throw new Error("not found");
    }

    return {
      direction: matches[1] === "L" ? "L" : "R",
      step: +matches[2],
    };
  });

  return inputs;
}

function mod(a: number, n: number): number {
  return ((a % n) + n) % n;
}

function zeroCrossings(start: number, delta: number): number {
  if (delta === 0) return 0;

  const step = Math.abs(delta);

  if (delta > 0) {
    // moving right
    let first = (100 - start) % 100;
    if (first === 0) first = 100; // if already at 0, next hit is after 100 steps
    if (first > step) return 0;
    return 1 + Math.floor((step - first) / 100);
  } else {
    // moving left
    let first = start % 100;
    if (first === 0) first = 100; // if already at 0, need 100 steps to hit 0 going left
    if (first > step) return 0;
    return 1 + Math.floor((step - first) / 100);
  }
}

(async () => {
  const inputs = await parse();
  const total = inputs.reduce<{ dial: number; total: number }>(
    (accu, curr) => {
      const { direction, step } = curr;
      const delta = direction === "L" ? -step : step;

      const crossings = zeroCrossings(accu.dial, delta);
      const newDial = mod(accu.dial + delta, 100);

      return {
        dial: newDial,
        total: accu.total + crossings,
      };
    },
    { dial: 50, total: 0 }
  );

  console.log("total :>> ", total);
})();
