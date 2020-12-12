const inputs = require("./inputs");

const degrees = {
  0: "N",
  90: "E",
  180: "S",
  270: "W",
};
const positions = {
  horizontal: 0,
  vertical: 0,
};

let currentDegree = 90;

for (const input of inputs) {
  let cmd = input.replace(/[^a-z]/gi, "");
  const units = +input.replace(/\D/g, "");

  if (cmd === "F") {
    cmd = degrees[currentDegree];
  }
  switch (true) {
    case cmd === "N":
      positions.vertical += units;
      break;
    case cmd === "E":
      positions.horizontal += units;
      break;
    case cmd === "S":
      positions.vertical -= units;
      break;
    case cmd === "W":
      positions.horizontal -= units;
      break;
    case cmd === "R":
      currentDegree += units;
      currentDegree = convertToDegrees(currentDegree);
      break;
    case cmd === "L":
      currentDegree -= units;
      currentDegree = convertToDegrees(currentDegree);
      break;
  }
}

function convertToDegrees(degree) {
  let d = degree;
  if (degree >= 360 || degree <= -360) {
    const factor = Math.trunc(degree / 360);
    d = degree - 360 * factor;
  }
  if (d < 0) {
    d += 360;
  }
  return d;
}

console.log(
  "counter :>> ",
  Math.abs(positions.vertical) + Math.abs(positions.horizontal)
);
