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

function generatePoints(p1, p2, coord) {
  const points = [];
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  let coord1;
  let coord2;
  if (coord === "x") {
    coord1 = x1;
    coord2 = x2;
  }
  if (coord === "y") {
    coord1 = y1;
    coord2 = y2;
  }
  const diff = coord2 - coord1;
  const sign = Math.sign(diff);
  if (sign === 0) {
    return [];
  }
  for (let i = 0; i <= Math.abs(diff); i += 1) {
    const x = coord === "x" ? coord1 + (i * sign) : x1;
    const y = coord === "y" ? coord1 + (i * sign) : y1;
    points.push({ x, y });
  }

  return points;
}

const { maxX, maxY } = getBoundaries();
const board = generateBoard(maxX, maxY);

for (const input of inputs) {
  const [p1, p2] = input;

  const pointsX = generatePoints(p1, p2, "x");
  const pointsY = generatePoints(p1, p2, "y");

  let points = [];
  const xLength = pointsX.length;
  const yLength = pointsY.length;
  if (xLength && !yLength) {
    points = pointsX;
  }
  if (yLength && !xLength) {
    points = pointsY;
  }
  if (xLength && yLength) {
    points = pointsX.map((p, i) => ({ x: p.x, y: pointsY[i].y }));
  }
  points.forEach((p) => {
    board[p.y][p.x] += 1;
  });
}

const flattenBoard = board.flat();

const total = flattenBoard.filter((x) => x > 1).length;
console.log("total :>> ", total);
