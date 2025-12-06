import { readFile } from "fs/promises";
import { postMessageToThread } from "worker_threads";

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
  const sortedRanges = ranges.toSorted((a, b) => {
    return a.start - b.start;
  });

  let { start, end } = sortedRanges[0];
  const mergedSortedRanges: typeof ranges = [];
  for (let i = 1; i < sortedRanges.length; i += 1) {
    const { start: s, end: e } = sortedRanges[i];
    if (s <= end + 1) {
      end = Math.max(end, e);
      continue;
    }
    mergedSortedRanges.push({ start, end });
    start = s;
    end = e;
  }
  mergedSortedRanges.push({ start, end });

  const total = mergedSortedRanges.reduce<number>((accu, curr) => {
    const { start, end } = curr;
    accu += end - start + 1;
    return accu;
  }, 0);

  console.log("total :>> ", total);
})();
