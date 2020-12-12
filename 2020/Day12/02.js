const inputs = require("./inputs");

const boatPos = [0, 0];
const waypointPos = [10, 1];
let newPoint;

for (const input of inputs) {
  let cmd = input.replace(/[^a-z]/gi, "");
  const units = +input.replace(/\D/g, "");

  if (cmd === "F") {
    const xDiff = waypointPos[0] - boatPos[0];
    const yDiff = waypointPos[1] - boatPos[1];

    boatPos[0] += xDiff * units;
    waypointPos[0] += xDiff * units;
    boatPos[1] += yDiff * units;
    waypointPos[1] += yDiff * units;
  }
  switch (true) {
    case cmd === "N":
      waypointPos[1] += units;
      break;
    case cmd === "E":
      waypointPos[0] += units;
      break;
    case cmd === "S":
      waypointPos[1] -= units;
      break;
    case cmd === "W":
      waypointPos[0] -= units;
      break;
    case cmd === "R":
      newPoint = rotate(
        boatPos[0],
        boatPos[1],
        waypointPos[0],
        waypointPos[1],
        units
      );
      waypointPos[0] = newPoint[0];
      waypointPos[1] = newPoint[1];
      break;
    case cmd === "L":
      newPoint = rotate(
        boatPos[0],
        boatPos[1],
        waypointPos[0],
        waypointPos[1],
        -units
      );
      waypointPos[0] = newPoint[0];
      waypointPos[1] = newPoint[1];
      break;
  }
}

function rotate(cx, cy, x, y, angle) {
  const radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = cos * (x - cx) + sin * (y - cy) + cx,
    ny = cos * (y - cy) - sin * (x - cx) + cy;
  return [Math.round(nx), Math.round(ny)];
}

console.log("counter :>> ", Math.abs(boatPos[0]) + Math.abs(boatPos[1]));
