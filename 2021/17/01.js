/* eslint-disable no-constant-condition */
const fs = require("fs");
const { cloneDeep } = require("lodash");

const inputs = fs
  .readFileSync("./inputs.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .trim()
  .split(": ")[1]
  .split(", ")
  .reduce((accu, curr, i) => {
    const newAccu = accu;
    const x = curr.replace("x=", "").replace("y=", "");
    const axis = i === 0 ? "x" : "y";
    newAccu[axis] = { min: +x.split("..")[0], max: +x.split("..")[1] };
    return newAccu;
  }, {});

function checkIfInside(x = undefined, y = undefined) {
  const isXInside = x !== undefined ? x >= inputs.x.min && x <= inputs.x.max : false;
  const isYInside = y !== undefined ? y >= inputs.y.min && y <= inputs.y.max : false;

  if (x !== undefined && y !== undefined) {
    return isXInside && isYInside;
  }

  if (x !== undefined) {
    return isXInside;
  }

  if (y !== undefined) {
    return isYInside;
  }
}

function checkIfOver(x = undefined, y = undefined) {
  const isXOver = x !== undefined ? x > inputs.x.max : false;
  const isYOver = y !== undefined ? y < inputs.y.min : false;

  if (x !== undefined && y !== undefined) {
    return isXOver || isYOver;
  }

  if (x !== undefined) {
    return isXOver;
  }

  if (y !== undefined) {
    return isYOver;
  }
}

function calculateXVelocities() {
  const range = { min: 0, max: 0 };
  for (let xVelocity = 1; xVelocity <= inputs.x.max; xVelocity += 1) {
    let currentXPos = 0;
    let currentXVelocity = xVelocity;
    while (true) {
      currentXPos += currentXVelocity;
      const isXOver = checkIfOver(currentXPos);
      if (isXOver) {
        break;
      }
      const isXInside = checkIfInside(currentXPos);
      if (isXInside) {
        if (!range.min) {
          range.min = xVelocity;
        }
        range.max = xVelocity;
        break;
      }

      currentXVelocity -= 1;
      if (currentXVelocity === 0) {
        break;
      }
    }
  }

  return range;
}

function simulate(x, y) {
  const velocities = { x, y };
  const positions = { x: 0, y: 0 };
  const history = [{ x: 0, y: 0 }];

  while (true) {
    positions.x += velocities.x;
    positions.y += velocities.y;
    history.push(cloneDeep(positions));

    const isPosInside = checkIfInside(positions.x, positions.y);
    if (isPosInside) {
      return { answer: true, coords: { x, y }, history };
    }
    const isPosOver = checkIfOver(positions.x, positions.y);
    if (isPosOver) {
      return { answer: false, coords: { x, y }, history };
    }

    if (velocities.x > 0) {
      velocities.x += -1;
    }
    velocities.y += -1;
  }
}

function calculatePossibilities(xVelocities) {
  const { min: xMin, max: xMax } = xVelocities;

  const possibilities = new Set();

  for (let x = xMin; x <= xMax; x += 1) {
    for (let y = 0; y < 1000; y += 1) {
      const simulation = simulate(x, y);
      if (simulation.answer) {
        const highestY = simulation.history.map((c) => c.y);
        possibilities.add(Math.max(...highestY));
      }
    }
  }

  return possibilities;
}

const xRange = calculateXVelocities();
const possibilities = calculatePossibilities(xRange);

const total = Math.max(...[...possibilities]);
console.log("total :>> ", total);
