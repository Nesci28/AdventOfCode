import { calculTotal, generateMonkeys, runTheOperations } from "./01";

function main(): void {
  const monkeys = generateMonkeys(false);
  const totalOfDividers = monkeys.reduce<number>((accu, curr) => {
    const newAccu = accu * +curr.test;
    return newAccu;
  }, 1);

  runTheOperations(10000, monkeys, totalOfDividers);

  const total = calculTotal(monkeys);
  console.log(`step 2: ${total}`);
}

main();
