import { readFile } from "fs/promises";
import { sum } from "mathjs";

async function parse(): Promise<number[][]> {
  const rawInput = (await readFile("./input.txt")).toString();
  const inputs = rawInput.split("\n").map((x) => {
    return x.split(/ +/).map((y) => {
      return +y;
    });
  });
  return inputs;
}

(async () => {
  const res = await parse();
  const total = res.reduce((accu, curr, i) => {
    let increasing = { all: true, differ: true };
    let decreasing = { all: true, differ: true };

    let isIncreasing = true;
    let isDecreasing = true;

    for (let i = 1; i < curr.length; i += 1) {
      const currentNumber = curr[i];
      const previousNumber = curr[i - 1];

      increasing.all = currentNumber > previousNumber;
      increasing.differ =
        currentNumber - previousNumber <= 3 &&
        currentNumber - previousNumber >= 1;
      if (!increasing.all || !increasing.differ) {
        isIncreasing = false;
        break;
      }
    }

    for (let i = 1; i < curr.length; i += 1) {
      const currentNumber = curr[i];
      const previousNumber = curr[i - 1];

      decreasing.all = currentNumber < previousNumber;
      decreasing.differ =
        previousNumber - currentNumber <= 3 &&
        previousNumber - currentNumber >= 1;
      if (!decreasing.all || !decreasing.differ) {
        isDecreasing = false;
        break;
      }
    }

    if (!isIncreasing && !isDecreasing) {
      return accu;
    }

    accu += 1;

    return accu;
  }, 0);

  console.log("total :>> ", total);
})();
