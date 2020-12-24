const rawInputs = require('./inputs_sample');
const inputs = rawInputs.map(line => line.match(/(se|sw|nw|ne|e|w)/g));

const NUMBER_OF_DAYS = 100;

let tiles = new Map();

const directions = {
  se: {
    x: 0,
    y: 1,
  },
  sw: {
    x: -1,
    y: 1,
  },
  nw: {
    x: 0,
    y: -1,
  },
  ne: {
    x: 1,
    y: -1,
  },
  e: {
    x: 1,
    y: 0,
  },
  w: {
    x: -1,
    y: 0,
  }
}

for (const input of inputs) {
  const point = [0, 0];
  for (const dir of input) {
    point[0] += directions[dir].x;
    point[1] += directions[dir].y;
  }
  const pointStr = point.join('#');
  if (tiles.get(pointStr)) {
    tiles.set(pointStr, !tiles.get(pointStr));
  } else {
    tiles.set(pointStr, true);
  }
}

for (let i = 0; i < NUMBER_OF_DAYS; i++) {
  console.log({ i });
  const newTiles = new Map(tiles);

  const tileKeys = [...tiles.keys()];
  for (const tileKey of tileKeys) {
    const adjacentTiles = getAdjacents(tileKey);
    adjacentTiles.push(tileKey);

    for (const adjacentTile of adjacentTiles) {
      const coloredAdjacent = getAdjacentsBlack(adjacentTile)
      if (!tiles.get(adjacentTile) && coloredAdjacent === 2) {
        newTiles.set(adjacentTile, true);
      } else if (tiles.get(adjacentTile) === true && (coloredAdjacent === 0 || coloredAdjacent > 2)) {
        newTiles.set(adjacentTile, false);
      } else {
        newTiles.set(adjacentTile, false);
      }
    }
  }

  console.log({ newTiles });
  tiles = newTiles;
}

function getAdjacents(pointStr) {
  const adjacents = [];
  let [x, y] = pointStr.split('#').map(x => +x);
  ['se', 'sw', 'nw', 'ne', 'e', 'w'].forEach(d => {
    x += directions[d].x;
    y += directions[d].y;
    adjacents.push([x, y].join('#'));
  });

  return adjacents;
}

function getAdjacentsBlack(pointStr) {
  let [x, y] = pointStr.split('#').map(x => +x);
  let counter = 0;
  ['se', 'sw', 'nw', 'ne', 'e', 'w'].forEach(d => {
    x += directions[d].x;
    y += directions[d].y;
    if (tiles.get([x, y].join('#'))) {
      counter += 1;
    }
  });

  return counter;
}

const counter = Array.from(tiles.values()).reduce((accu, curr) => {
  if (curr) {
    accu += 1;
  }
  return accu;
}, 0)
console.log({ counter });