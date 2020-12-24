const rawInputs = require('./inputs');
const inputs = rawInputs.map(line => line.match(/(se|sw|nw|ne|e|w)/g));

const tiles = new Map();

for (const input of inputs) {
  const point = [0, 0];
  for (const dir of input) {
    switch (dir) {
      case 'se':
        point[1] += 1;
        break;
      case 'sw':
        point[0] -= 1;
        point[1] += 1;
        break;
      case 'nw':
        point[1] -= 1;
        break;
      case 'ne':
        point[0] += 1;
        point[1] -= 1;
        break;
      case 'e':
        point[0] += 1;
        break;
      case 'w':
        point[0] -= 1;
        break;
    }
  }
  const pointStr = point.join('-');
  if (tiles.get(pointStr)) {
    tiles.set(pointStr, !tiles.get(pointStr));
  } else {
    tiles.set(pointStr, true);
  }
}

const counter = Array.from(tiles.values()).reduce((accu, curr) => {
  if (curr) {
    accu += 1;
  }
  return accu;
}, 0)
console.log({ counter });