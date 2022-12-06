import { inputs } from "./inputs";

function main(): void {
  const inputsSplitted = inputs.split("");
  for (let i = 13; i < inputsSplitted.length; i += 1) {
    const arr: string[] = [];
    for (let j = 0; j < 14; j += 1) {
      arr.unshift(inputs[i - j]);
    }
    const arrToSet = new Set(arr);
    if (arrToSet.size === 14) {
      console.log(`step 2: ${i + 1}`);
      break;
    }
  }
}

main();
