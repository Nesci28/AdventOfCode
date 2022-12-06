import { inputs } from "./inputs";

function main(): void {
  const inputsSplitted = inputs.split("");
  for (let i = 3; i < inputsSplitted.length; i += 1) {
    const arr = [inputs[i - 3], inputs[i - 2], inputs[i - 1], inputs[i]];
    const arrToSet = new Set(arr);
    if (arrToSet.size === 4) {
      console.log(`step 1: ${i + 1}`);
      break;
    }
  }
}

main();
