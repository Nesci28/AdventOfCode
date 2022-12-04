import { generateNumbers, intersect } from "./01";
import { inputs } from "./inputs";

function main(): void {
  let total = 0;
  for (let i = 0; i < inputs.length; i += 1) {
    const input = inputs[i];
    const [first, second] = input;
    const [firstRange1, firstRange2] = first.split("-");
    const [secondRange1, secondRange2] = second.split("-");

    const numbers1 = generateNumbers(+firstRange1, +firstRange2);
    const numbers2 = generateNumbers(+secondRange1, +secondRange2);

    const intersects = intersect(numbers1, numbers2);
    const isIntersecting = intersects.length;
    if (isIntersecting) {
      total += 1;
    }
  }
  console.log(`step 2: ${total}`);
}

main();
