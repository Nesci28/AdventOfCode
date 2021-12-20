/* eslint-disable no-unreachable-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-constant-condition */
const fs = require("fs");

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

function simulate(xVelocity, yVelocity) {
  // Simulating
  let counter = 1;
  let y = yVelocity;
  let x = xVelocity;
  while (true) {
    if (x > inputs.x.max || y < inputs.y.min) {
      return { worked: false, xVelocity, yVelocity };
    }
    if (x >= inputs.x.min && x <= inputs.x.max && y >= inputs.y.min && y <= inputs.y.max) {
      return { worked: true, xVelocity, yVelocity };
    }

    y += yVelocity - counter;
    x += xVelocity - counter > 0 ? xVelocity - counter : 0;
    counter += 1;
  }
}

const setX = new Set();
for (let vX = 1; vX <= inputs.x.max; vX += 1) {
  let simulateVX = vX;
  let xPos = vX;
  while (simulateVX > 0) {
    simulateVX -= 1;
    xPos += simulateVX;
    if (xPos >= inputs.x.min && xPos <= inputs.x.max) {
      setX.add(vX);
    }
  }
}
const xVelocities = [...setX];

let maxY = -Infinity;
for (const xVelocity of xVelocities) {
  console.log("xVelocity :>> ", xVelocity);
  // Testing all Y Velocity until fail
  let yVelocity = -1;
  let lastMaxXPos;
  while (true) {
    yVelocity += 1;
    const simResult = simulate(xVelocity, yVelocity);
    if (!simResult.worked && lastMaxXPos === simResult.xVelocity) {
      break;
    }
    if (!simResult.worked && !lastMaxXPos) {
      lastMaxXPos = simResult.xVelocity;
    }
    if (simResult.worked && yVelocity > maxY) {
      console.log("yVelocity :>> ", yVelocity);
      maxY = yVelocity;
    }
  }
}
console.log("maxY :>> ", maxY);
