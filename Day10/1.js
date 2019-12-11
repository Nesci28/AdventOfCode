const asteroids = require('./test1.json');

const filledOut = fillAll();

function fillAll() {
  const res = [];
  for (let y = 0; y < asteroids.length; y++) {
    const line = asteroids[y];
    for (let x = 0; x < line.length; x++) {
      res.push([x, y]);
    }
  }
  return res;
}

console.log('filledOut :', filledOut);

for (let y = 0; y < asteroids.length; y++) {
  const line = asteroids[y];
  for (let x = 0; x < line.length; x++) {
    const pos = line[x];
    if (pos === '#') {
      const number = getNumber(x, y);
    }
  }
}

function checkForAsteroids(xOriginal, yOriginal) {
  const arr = filledOut;
  // check on top
  for (let y = yOriginal - 1; y >= 0; y--) {
    const line = asteroids[y];
    for (let x = 0; x < line.length; x++) {
      const pos = line[x];
      if (pos === '#') {
      }
    }
  }

  // check on the same line

  // check on bottom

  return arr.length;
}
