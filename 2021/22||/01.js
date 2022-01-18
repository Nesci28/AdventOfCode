/* eslint-disable no-restricted-syntax */
const fs = require("fs");

const inputs = fs
  .readFileSync("./inputs.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .trim()
  .split("\n")
  .map((el) => {
    const [action, ranges] = el.split(" ");
    const [xRange, yRange, zRange] = ranges.split(",");
    const [xFrom, xTo] = xRange.replace("x=", "").split("..").map(Number);
    const [yFrom, yTo] = yRange.replace("y=", "").split("..").map(Number);
    const [zFrom, zTo] = zRange.replace("z=", "").split("..").map(Number);
    return {
      action,
      x: { from: xFrom, to: xTo },
      y: { from: yFrom, to: yTo },
      z: { from: zFrom, to: zTo },
    };
  });

function generateMap(input, map) {
  for (let z = input.z.from; z <= input.z.to; z += 1) {
    for (let y = input.y.from; y <= input.z.to; y += 1) {
      for (let x = input.x.from; x <= input.x.to; x += 1) {
        map.set(`${x},${y},${z}`, input.action);
      }
    }
  }

  return map;
}

const filteredInputs = inputs.filter((el) => (el.x.from >= -50 && el.x.from <= 50)
  && (el.y.from >= -50 && el.y.from <= 50)
  && (el.z.from >= -50 && el.z.from <= 50));

let map = new Map();
for (const input of filteredInputs) {
  map = generateMap(input, map);
}

const total = [...map].filter(([, v]) => v === "on").length;
console.log("total :>> ", total);
