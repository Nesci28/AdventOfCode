import { crates } from "./crates";
import { inputs } from "./inputs";

export function createCrates(): string[][] {
  const cratesLines = crates.split("\n");
  const lastLine = cratesLines.pop();
  const nbrOfGroups = Math.max(
    ...lastLine!
      .split("")
      .filter(Boolean)
      .map((x) => {
        return +x;
      }),
  );
  const reg = new RegExp(
    `^${"(.{3})".repeat(nbrOfGroups).replace(/\)\(/g, ") (")}$`,
  );
  const res: string[][] = [];
  for (let i = 0; i < cratesLines.length; i += 1) {
    const line = cratesLines[i];
    const matches = line.match(reg);
    for (let j = 1; j <= nbrOfGroups; j += 1) {
      const crate = matches![j];
      if (!res[j - 1]) {
        res[j - 1] = [];
      }
      const value = crate.replace(/\[|\]/g, "");
      if (value !== "   ") {
        res[j - 1].push(crate.replace(/\[|\]/g, ""));
      }
    }
  }

  return res;
}

export function getTotal(crateList: string[][]): string {
  let total = "";
  for (let i = 0; i < crateList.length; i += 1) {
    const cratesColumn = crateList[i];
    total += cratesColumn.shift();
  }

  return total;
}

function main(crateList: string[][]): any {
  const inputsSplitted = inputs.split("\n");
  const reg = /move (\d+) from (\d+) to (\d+)$/;

  for (let i = 0; i < inputsSplitted.length; i += 1) {
    const input = inputsSplitted[i];
    const matches = input.match(reg);
    const [, move, from, to] = matches!;

    for (let j = 1; j <= +move; j += 1) {
      const topItem = crateList[+from - 1].shift();
      crateList[+to - 1].unshift(topItem!);
    }
  }

  const total = getTotal(crateList);
  console.log(`step 1: ${total}`);
}

const crateList = createCrates();
main(crateList);
