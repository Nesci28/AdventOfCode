import { createCrates, getTotal } from "./01";
import { inputs } from "./inputs";

function main(crateList: string[][]): void {
  const inputsSplitted = inputs.split("\n");
  const reg = /move (\d+) from (\d+) to (\d+)$/;

  for (let i = 0; i < inputsSplitted.length; i += 1) {
    const input = inputsSplitted[i];
    const matches = input.match(reg);
    const [, move, from, to] = matches!;
    const crateSection = crateList[+from - 1].splice(0, +move);
    crateList[+to - 1].unshift(...crateSection);
  }

  const total = getTotal(crateList);
  console.log(`step 2: ${total}`);
}

const crateList = createCrates();
main(crateList);
