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

function swapElements(arr: number[], pos1: number, pos2: number): number[] {
  const temp = arr[pos1];
  arr[pos1] = arr[pos2];
  arr[pos2] = temp;
  return arr;
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

  swapElements(update, isBeforeIndex, isAfterIndex);

  return false;
}

function fixUpdate(update: number[], rules: Rule[]): number[] {
  for (let i = 0; i < rules.length; i += 1) {
    const rule = rules[i];
    const isValid = isRuleValid(update, rule);
    if (!isValid) {
      fixUpdate(update, rules);
    }
  }
  return update;
}

(async () => {
  const { rules, updates } = await parse();

  const incorrectUpdates: number[][] = [];
  for (let i = 0; i < updates.length; i += 1) {
    let isValid = true;
    const update = updates[i];
    for (let j = 0; j < rules.length; j += 1) {
      const rule = rules[j];
      isValid = isRuleValid(update, rule);
      if (!isValid) {
        incorrectUpdates.push(update);
        break;
      }
    }
  }

  let total = 0;
  for (let i = 0; i < incorrectUpdates.length; i += 1) {
    const incorrectUpdate = incorrectUpdates[i];
    fixUpdate(incorrectUpdate, rules);
    total += getMiddleNumber(incorrectUpdate);
  }
  console.log("total :>> ", total);
})();
