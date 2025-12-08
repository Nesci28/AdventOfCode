import { readFile } from "fs/promises";

type Input = string;

async function parse(): Promise<Input> {
  const arg = process.argv[2];
  const rawInput = (await readFile(arg ? "sample.txt" : "input.txt"))
    .toString()
    .trim();

  return rawInput;
}

(async () => {
  const input = await parse();
  const total = 0;

  console.log("total :>> ", total);
  process.exit(0);
})();
