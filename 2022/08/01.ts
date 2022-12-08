import { inputs } from "./inputs";

function checkIfVisible(row: number, col: number): boolean {
  const tree = inputs[row][col];

  const states = {
    left: true,
    right: true,
    top: true,
    bottom: true,
  };

  // On the edge
  if (
    row === 0 ||
    col === 0 ||
    row === inputs.length - 1 ||
    col === inputs[0].length - 1
  ) {
    return true;
  }

  // Check Left
  for (let i = col - 1; i >= 0; i -= 1) {
    const neighbor = inputs[row][i];
    if (neighbor >= tree) {
      states.left = false;
    }
  }

  // Check Right
  for (let i = col + 1; i < inputs[row].length; i += 1) {
    const neighbor = inputs[row][i];
    if (neighbor >= tree) {
      states.right = false;
    }
  }

  // Check Top
  for (let i = row - 1; i >= 0; i -= 1) {
    const neighbor = inputs[i][col];
    if (neighbor >= tree) {
      states.top = false;
    }
  }

  // Check Bottom
  for (let i = row + 1; i < inputs.length; i += 1) {
    const neighbor = inputs[i][col];
    if (neighbor >= tree) {
      states.bottom = false;
    }
  }

  const hasATrue = Object.entries(states).some((x) => {
    return x[1];
  });
  return hasATrue;
}

function main(): void {
  let total = 0;
  for (let i = 0; i < inputs.length; i += 1) {
    const row = inputs[i];
    for (let j = 0; j < row.length; j += 1) {
      const isVisible = checkIfVisible(i, j);
      if (isVisible) {
        total += 1;
      }
    }
  }

  console.log(`step 1: ${total}`);
}

main();
