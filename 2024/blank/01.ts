import { readFile } from "fs/promises";

type Input = string;

async function parse(): Promise<Input> {
  const rawInput = (await readFile("./input.txt")).toString();

  return rawInput;
}

(async () => {
  const input = await parse();
  const total = 0;

  console.log("total :>> ", total);
})();
