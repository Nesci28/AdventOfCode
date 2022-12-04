import { inputs } from "./inputs";

export function generateNumbers(start: number, end: number): number[] {
  const numbers: number[] = [];
  for (let i = start; i <= end; i += 1) {
    numbers.push(i);
  }

  return numbers;
}

export function intersect(numbers1: number[], numbers2: number[]): number[] {
  const intersects = [numbers1, numbers2].reduce((p, c) => {
    return p.filter((e) => {
      return c.includes(e);
    });
  });

  return intersects;
}

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
    const isFullyIntersecting =
      intersects.length === numbers1.length ||
      intersects.length === numbers2.length;
    if (isFullyIntersecting) {
      total += 1;
    }
  }
  console.log(`step 1: ${total}`);
}

main();
