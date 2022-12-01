import { inputs } from "./inputs";

export function parseInputs(): number[] {
  let subTotal = 0;
  const totals = inputs.reduce<number[]>((accu, curr) => {
    if (curr === "") {
      accu.push(subTotal);
      subTotal = 0;
      return accu;
    }

    subTotal += +curr;
    return accu;
  }, []);

  return totals;
}

function main(): number {
  const totals = parseInputs();
  const maxCalories = Math.max(...totals);
  return maxCalories;
}

console.log(`step 1: ${main()}`);
