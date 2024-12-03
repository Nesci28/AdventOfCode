import { readFile } from "fs/promises";

async function parse(): Promise<string> {
  const rawInput = (await readFile("./input.txt")).toString();
  const inputs = rawInput.split("\n").join();
  return inputs;
}

(async () => {
  const input = await parse();

  const regex = new RegExp(/mul\((\d+,\d+)\)/, "g");
  const numbers: number[][] = [];
  while (true) {
    const t = regex.exec(input);
    if (!t) {
      break;
    }

    numbers.push(
      t[1].split(",").map((x) => {
        return +x;
      })
    );
  }

  const total = numbers.reduce<number>((accu, curr) => {
    const multiple = curr[0] * curr[1];
    accu += multiple;
    return accu;
  }, 0);
  console.log("total :>> ", total);
})();
