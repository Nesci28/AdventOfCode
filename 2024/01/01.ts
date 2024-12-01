import { readFile } from "fs/promises";
import { sum } from "mathjs";

async function parse(): Promise<[number[], number[]]> {
  const rawInput = (await readFile("./input.txt")).toString();
  const inputs = rawInput.split("\n").map((x) => {
    return x.split(/ +/);
  });
  const parsedInput = inputs.reduce<[number[], number[]]>(
    (accu, curr) => {
      const [left, right] = curr;
      accu[0].push(+left);
      accu[1].push(+right);

      return accu;
    },
    [[], []]
  );
  return parsedInput;
}

(async () => {
  const res = await parse();

  const [left, right] = res;
  left.sort();
  right.sort();

  const diffs = left.map((x, i) => {
    const r = Math.abs(x - right[i]);
    return r;
  });
  const total = sum(diffs);
  console.log("total :>> ", total);
})();
