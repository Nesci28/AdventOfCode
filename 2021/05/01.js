/* eslint-disable no-restricted-syntax */
const inputs = require("./inputs.js");

function getBoundaries() {
  const max = inputs.reduce((accu, curr) => {
    const newAccu = accu;
    const [p1, p2] = curr;
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    if (x1 > newAccu.maxX) {
      newAccu.maxX = x1;
    }
    if (x2 > newAccu.maxX) {
      newAccu.maxX = x2;
    }
    if (y1 > newAccu.maxY) {
      newAccu.maxY = y1;
    }
    if (y2 > newAccu.maxY) {
      newAccu.maxY = y2;
    }
    return newAccu;
  }, { maxX: 0, maxY: 0 });

  return max;
}

function generateBoard(x, y) {
  const board = [];
  for (let i = 0; i < y + 1; i += 1) {
    board.push(new Array(x + 1).fill(0));
  }

  return board;
}

function reorderPoints(p1, p2) {
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  let reorderedP1;
  let reorderedP2;
  if (x1 > x2 || y1 > y2) {
    reorderedP1 = p2;
    reorderedP2 = p1;
  }
  if (x2 > x1 || y2 > y1) {
    reorderedP1 = p1;
    reorderedP2 = p2;
  }

  return [reorderedP1, reorderedP2];
}

function generatePoints(p1, p2) {
  const points = [];
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  const isX = x1 !== x2;
  const diff = isX ? x2 - x1 : y2 - y1;
  for (let i = 0; i <= diff; i += 1) {
    const x = isX ? x1 + i : x1;
    const y = !isX ? y1 + i : y1;
    points.push({ x, y });
  }

  return points;
}

const { maxX, maxY } = getBoundaries();
const board = generateBoard(maxX, maxY);

for (const input of inputs) {
  const [p1, p2] = input;
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  if (x1 !== x2 && y1 !== y2) {
    // eslint-disable-next-line no-continue
    continue;
  }

  const [reorderP1, reorderP2] = reorderPoints(p1, p2);
  const points = generatePoints(reorderP1, reorderP2);
  points.forEach((p) => {
    board[p.y][p.x] += 1;
  });
}

const flattenBoard = board.flat();

const total = flattenBoard.filter((x) => x > 1).length;
console.log("total :>> ", total);
