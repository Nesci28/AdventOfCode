import { calculatePoint } from "./01";
import { inputs } from "./inputs";

function createSet(str: string): Set<string> {
  const newSet = new Set<string>();
  for (let j = 0; j < str.length; j += 1) {
    const letter = str[j];
    newSet.add(letter);
  }

  return newSet;
}

function main(): void {
  let total = 0;
  for (let i = 0; i < inputs.length; i += 3) {
    const first = inputs[i];
    const second = inputs[i + 1];
    const third = inputs[i + 2];

    const firstSet = Array.from(createSet(first));
    const secondSet = Array.from(createSet(second));
    const thirdSet = Array.from(createSet(third));

    const [badge] = [firstSet, secondSet, thirdSet].reduce((p, c) => {
      return p.filter((e) => {
        return c.includes(e);
      });
    });
    const subTotal = calculatePoint(badge.charCodeAt(0));
    total += subTotal;
  }

  console.log(`step 2: ${total}`);
}

main();
