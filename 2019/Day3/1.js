const paths = require('./asset.json');

const first = paths.first;
const second = paths.second;

let firstVector = [{ x: 0, y: 0 }];
let secondVector = [{ x: 0, y: 0 }];

function main() {
  first.forEach(path => {
    generatingPaths(firstVector, path[0], path.slice(1));
  });
  const firstSet = generatingSet(firstVector);

  second.forEach(path => {
    generatingPaths(secondVector, path[0], path.slice(1));
  });
  const secondSet = generatingSet(secondVector);

  let distance = Infinity;
  let initialLength = firstSet.size;
  [...secondSet].splice(1).forEach(vec => {
    firstSet.add(vec);
    if (firstSet.size === initialLength) {
      vec = vec.split(':');
      const total = Math.abs(+vec[0]) + Math.abs(+vec[1]);
      if (total < distance) distance = total;
    } else {
      initialLength += 1;
    }
  });
  console.log('distance :', distance);
}

main();

function generatingSet(vector) {
  return vector.reduce((accu, vec) => {
    return accu.add(`${vec.x}:${vec.y}`);
  }, new Set());
}

function generatingPaths(vector, direction, steps) {
  if (direction === 'R') path(vector, steps, 'right', '');
  if (direction === 'L') path(vector, steps, 'left', '');
  if (direction === 'U') path(vector, steps, '', 'up');
  if (direction === 'D') path(vector, steps, '', 'down');
}

function path(vector, steps, hor, ver) {
  const start = [...vector][vector.length - 1];
  for (let i = 1; i <= steps; i++) {
    x = hor === 'left' ? i * -1 : hor === 'right' ? i * 1 : i * 0;
    y = ver === 'down' ? i * -1 : ver === 'up' ? i * 1 : i * 0;
    vector.push({ x: start.x + x, y: start.y + y });
  }
}
