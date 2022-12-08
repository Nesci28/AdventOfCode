import { inputs } from "./inputs";

function calculateScenicScore(row: number, col: number): number {
  const tree = inputs[row][col];

  let left = 0;
  let right = 0;
  let top = 0;
  let bottom = 0;

  // Check Left
  for (let i = col - 1; i >= 0; i -= 1) {
    const neighbor = inputs[row][i];
    left += 1;
    if (neighbor >= tree) {
      break;
    }
  }

  // Check Right
  for (let i = col + 1; i < inputs[row].length; i += 1) {
    const neighbor = inputs[row][i];
    right += 1;
    if (neighbor >= tree) {
      break;
    }
  }

  // Check Top
  for (let i = row - 1; i >= 0; i -= 1) {
    const neighbor = inputs[i][col];
    top += 1;
    if (neighbor >= tree) {
      break;
    }
  }

  // Check Bottom
  for (let i = row + 1; i < inputs.length; i += 1) {
    const neighbor = inputs[i][col];
    bottom += 1;
    if (neighbor >= tree) {
      break;
    }
  }

  const scenicScore = left * right * top * bottom;
  return scenicScore;
}

function main(): void {
  let total = 0;
  for (let i = 0; i < inputs.length; i += 1) {
    const row = inputs[i];
    for (let j = 0; j < row.length; j += 1) {
      const scenicScore = calculateScenicScore(i, j);
      if (scenicScore > total) {
        total = scenicScore;
      }
    }
  }

  console.log(`step 2: ${total}`);
}

main();
