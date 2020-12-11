const rawInputs = require("./inputs");

let modifiedInputs = [];
const inputs = [];
for (const rawInput of rawInputs) {
  inputs.push(rawInput.split(""));
  modifiedInputs.push(Array(rawInput.length));
}

let lastInputs = JSON.parse(JSON.stringify(inputs));
const resetModifiedInputs = JSON.parse(JSON.stringify(modifiedInputs));
let occupied;

while (true) {
  modifiedInputs = JSON.parse(JSON.stringify(resetModifiedInputs));
  for (let i = 0; i < lastInputs.length; i++) {
    const row = lastInputs[i];
    for (let j = 0; j < row.length; j++) {
      const chair = row[j];
      switch (true) {
        case chair === ".":
          modifiedInputs[i][j] = ".";
          break;
        case chair === "#":
          occupied = getOccupiedAdjacentChairs(i, j);
          if (occupied >= 4) {
            modifiedInputs[i][j] = "L";
          } else {
            modifiedInputs[i][j] = "#";
          }
          break;
        case chair === "L":
          occupied = getOccupiedAdjacentChairs(i, j);
          if (occupied === 0) {
            modifiedInputs[i][j] = "#";
          } else {
            modifiedInputs[i][j] = "L";
          }
          break;
      }
    }
  }
  if (JSON.stringify(modifiedInputs) === JSON.stringify(lastInputs)) {
    console.log("counter :>> ", getOccupiedChairs(modifiedInputs));
    break;
  } else {
    lastInputs = JSON.parse(JSON.stringify(modifiedInputs));
  }
}

function getOccupiedChairs() {
  let counter = 0;
  for (let i = 0; i < lastInputs.length; i++) {
    const row = lastInputs[i];
    for (let j = 0; j < row.length; j++) {
      const chair = row[j];
      if (chair === "#") {
        counter += 1;
      }
    }
  }
  return counter;
}

function getOccupiedAdjacentChairs(rowIndex, columnIndex) {
  let counter = 0;
  for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
    const row = lastInputs[i];
    if (!row) {
      continue;
    }
    for (let j = columnIndex - 1; j <= columnIndex + 1; j++) {
      if (i === rowIndex && j === columnIndex) {
        continue;
      }
      const chair = row[j];
      if (!chair) {
        continue;
      }
      if (chair === "#") {
        counter += 1;
      }
    }
  }
  return counter;
}
