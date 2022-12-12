import { Monkey } from "./class/monkey";
import { inputs } from "./inputs";

export function generateMonkeys(isDividingBy3: boolean): Monkey[] {
  const monkeys: Monkey[] = [];
  for (let i = 0; i < inputs.length; i += 1) {
    const input = inputs[i];

    const name = input[0].split(" ")[1].replace(":", "");
    const startingItems = input[1].split(": ")[1].split(", ").map(Number);
    const operation = input[2].split(" = old")[1];
    const test = input[3].split(" by ")[1];
    const trueCondition = input[4].split(" ").pop()!;
    const falseCondition = input[5].split(" ").pop()!;

    const monkey = new Monkey(
      name,
      startingItems,
      operation,
      test,
      trueCondition,
      falseCondition,
      isDividingBy3,
    );
    monkeys.push(monkey);
  }

  return monkeys;
}

export function calculTotal(monkeys: Monkey[]): number {
  const [first, second] = monkeys
    .map((x) => {
      return x.inspected;
    })
    .sort((a, b) => {
      return b - a;
    })
    .slice(0, 2);
  const total = first * second;

  return total;
}

export function runTheOperations(
  nbrOfCycles: number,
  monkeys: Monkey[],
  totalOfDividers?: number,
): void {
  for (let k = 0; k < nbrOfCycles; k += 1) {
    for (let i = 0; i < monkeys.length; i += 1) {
      const monkey = monkeys[i];
      while (monkey.startingItems.length) {
        const { condition, item } = monkey.runOperation(totalOfDividers);
        const newMonkeyName = condition
          ? monkey.trueCondition
          : monkey.falseCondition;
        const newMonkey = monkeys.find((x) => {
          return x.name === newMonkeyName;
        })!;

        newMonkey.addtoStartingItems(item);
      }
    }
  }
}

function main(): void {
  const monkeys = generateMonkeys(true);

  runTheOperations(20, monkeys);

  const total = calculTotal(monkeys);
  console.log(`step 1: ${total}`);
}

main();
