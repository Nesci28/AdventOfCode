const rawInputs = require("./inputs");

const NUMBER_OF_CYCLES = 6;

const inputs = rawInputs.reduce((accu, curr) => {
  accu.push(curr.split(""));
  return accu;
}, []);

let mapInputs = new Map();

inputs.forEach((line, y) => {
  line.forEach((point, x) => {
    const active = point === "#";
    const id = `${y},${x},0`;
    mapInputs.set(id, active);
  });
});

for (let cycle = 0; cycle < NUMBER_OF_CYCLES; cycle++) {
  const keys = mapInputs.keys();
  const types = {
    0: "x",
    1: "y",
    2: "z",
  };
  const limits = {
    min: {
      x: Infinity,
      y: Infinity,
      z: Infinity,
    },
    max: {
      x: -Infinity,
      y: -Infinity,
      z: -Infinity,
    },
  };
  for (const key of keys) {
    const coords = key.split(",").map((x) => +x);
    coords.forEach((c, i) => {
      const type = types[i.toString()];
      if (c < limits.min[type]) {
        limits.min[type] = c;
      }
      if (c > limits.max[type]) {
        limits.max[type] = c;
      }
    });
  }

  const newState = new Map();

  for (let x = limits.min.x - 1; x <= limits.max.x + 1; x++) {
    for (let y = limits.min.y - 1; y <= limits.max.y + 1; y++) {
      for (let z = limits.min.z - 1; z <= limits.max.z + 1; z++) {
        const neighbours = getNeighbors(x, y, z, mapInputs);
        const id = `${x},${y},${z}`;
        const isActive = mapInputs.has(id) ? mapInputs.get(id) : false;
        const newActiveState =
          isActive && neighbours !== 2 && neighbours !== 3
            ? false
            : !isActive && neighbours === 3
            ? true
            : isActive;
        newState.set(id, newActiveState);
      }
    }
  }

  mapInputs = newState;
}

function getNeighbors(x, y, z, map) {
  let neighbors = 0;
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      for (let k = z - 1; k <= z + 1; k++) {
        if (i !== x || j !== y || k !== z) {
          const id = `${i},${j},${k}`;
          if (map.has(id) && map.get(id)) {
            neighbors += 1;
          }
        }
      }
    }
  }

  return neighbors;
}

const counter = [...mapInputs.values()].reduce(
  (accu, curr) => (curr ? accu + 1 : accu),
  0
);
console.log("counter :>> ", counter);
