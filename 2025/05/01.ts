import { readFile } from "fs/promises";

type Input = { ranges: { start: number; end: number }[]; ids: number[] };

async function parse(): Promise<Input> {
  const arg = process.argv[2];
  const rawInput = (await readFile(arg ? "sample.txt" : "input.txt"))
    .toString()
    .trim();

  const [r, i] = rawInput.split("\n\n");
  const ranges = r.split("\n").map((x) => {
    const [start, end] = x.split("-");
    return {
      start: +start,
      end: +end,
    };
  });

  const ids = i.split("\n").map((x) => {
    return +x;
  });

  return { ranges, ids };
}

(async () => {
  const { ranges, ids } = await parse();
  const total = ids.reduce<number>((accu, id) => {
    for (let i = 0; i < ranges.length; i += 1) {
      const { start, end } = ranges[i];
      if (id >= start && id <= end) {
        accu += 1;
        break;
      }
    }

    return accu;
  }, 0);

  console.log("total :>> ", total);
})();
