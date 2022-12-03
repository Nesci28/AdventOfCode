import { inputs } from "./inputs";

export function calculatePoint(ansciiCode: number): number {
  return ansciiCode < 97 ? ansciiCode - 64 + 26 : ansciiCode - 96;
}

function main(): void {
  let total = 0;

  for (let i = 0; i < inputs.length; i += 1) {
    const input = inputs[i];
    const charSet = new Set();
    const halfLength = input.length / 2;
    const firstHalfLetters = input.slice(0, halfLength);

    for (let j = 0; j < firstHalfLetters.length; j += 1) {
      const letter = firstHalfLetters[j];
      charSet.add(letter);
    }

    for (let j = halfLength; j < input.length; j += 1) {
      const letter = input[j];
      const hasLetter = charSet.has(letter);
      if (hasLetter) {
        const ansciiCode = letter.charCodeAt(0);
        const subTotal = calculatePoint(ansciiCode);
        total += subTotal;
        break;
      }
    }
  }
  console.log(`step 1: ${total}`);
}

main();
