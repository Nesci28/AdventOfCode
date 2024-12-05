import { readFile } from "fs/promises";

type Rule = [number, number];

async function parse(): Promise<{ rules: Rule[]; updates: number[][] }> {
  const rawInput = (await readFile("./input.txt")).toString();
  const [rawRules, rawUpdates] = rawInput.split("\n\n");
  const rules = rawRules.split("\n").map((x) => {
    return x.split("|").map((y) => {
      return +y;
    });
  }) as Rule[];
  const updates = rawUpdates.split("\n").map((x) => {
    return x.split(",").map((y) => {
      return +y;
    });
  });

  return { rules, updates };
}

function getMiddleNumber(arr: number[]): number {
  const middleIndex = Math.floor((0 + arr.length - 1) / 2);
  const middle = arr[middleIndex];
  return middle;
}

function isRuleValid(update: number[], rule: Rule): boolean {
  const [isBefore, isAfter] = rule;
  const isBeforeIndex = update.findIndex((x) => {
    return x === isBefore;
  });
  const isAfterIndex = update.findIndex((x) => {
    return x === isAfter;
  });

  if (isBeforeIndex === -1 || isAfterIndex === -1) {
    return true;
  }

  if (isBeforeIndex < isAfterIndex) {
    return true;
  }

  return false;
}

(async () => {
  const { rules, updates } = await parse();

  let total = 0;
  for (let i = 0; i < updates.length; i += 1) {
    let isValid = true;
    const update = updates[i];
    for (let j = 0; j < rules.length; j += 1) {
      const rule = rules[j];
      isValid = isRuleValid(update, rule);
      if (!isValid) {
        break;
      }
    }

    if (isValid) {
      total += getMiddleNumber(update);
    }
  }

  console.log("total :>> ", total);
})();
