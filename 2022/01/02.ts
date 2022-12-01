import { parseInputs } from "./01";

function main(): number {
  const totals = parseInputs();
  const totalsSorted = totals.sort((a, b) => {
    return b - a;
  });

  const top3 = totalsSorted.slice(0, 3);
  const sum = top3.reduce((accu, curr) => {
    return accu + curr;
  }, 0);
  return sum;
}

console.log(`step 2: ${main()}`);
