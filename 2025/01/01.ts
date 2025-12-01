import { readFile } from "fs/promises";

type Input = { direction: "L" | "R"; step: number };

async function parse(): Promise<Input[]> {
  const rawInput = (await readFile("./input.txt")).toString();
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

(async () => {
  const inputs = await parse();
  const total = inputs.reduce<{ dial: number; total: number }>(
    (accu, curr) => {
      const { direction, step } = curr;
      const d = direction === "L" ? -1 : 1;
      const newDial = mod(accu.dial + step * d, 100);
      if (newDial === 0) {
        accu.total += 1;
      }
      const obj = { dial: newDial, total: accu.total };
      return obj;
    },
    { dial: 50, total: 0 }
  );

  console.log("total :>> ", total);
})();
