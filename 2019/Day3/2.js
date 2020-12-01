const paths = require('./asset.json');

const first = paths.first;
const second = paths.second;

let firstVector = [{ x: 0, y: 0, path: 0 }];
let secondVector = [{ x: 0, y: 0, path: 0 }];

function main() {
  first.forEach(path => {
    generatingPaths(firstVector, path[0], path.slice(1));
  });
  let firstSetWithPath = generatingSet(firstVector, 'with');
  firstSetWithPath = [...firstSetWithPath];
  const firstSetWithoutPath = generatingSet(firstVector, 'without');

  second.forEach(path => {
    generatingPaths(secondVector, path[0], path.slice(1));
  });
  let secondSetWithPath = generatingSet(secondVector, 'with');
  secondSetWithPath = [...secondSetWithPath];
  const secondSetWithoutPath = generatingSet(secondVector, 'without');

  let distance = Infinity;
  let initialLength = firstSetWithoutPath.size;
  [...secondSetWithoutPath].splice(1).forEach((vec, i) => {
    firstSetWithoutPath.add(vec);
    if (firstSetWithoutPath.size === initialLength) {
      vec = vec.split(':');
      const x = vec[0];
      const y = vec[1];
      const secondPath = getPath(secondSetWithPath, x, y);
      const firstPath = getPath(firstSetWithPath, x, y);
      const total = +firstPath + +secondPath;
      if (total < distance) distance = total;
    } else {
      initialLength += 1;
    }
  });
  console.log('distance :', distance);
}

main();

function getPath(arr, x, y) {
  const res = arr.filter(vector => vector.includes(`${x}:${y}`))[0];
  return res.split(':')[2];
}

function generatingSet(vector, type) {
  if (type === 'with') {
    return vector.reduce((accu, vec) => {
      return accu.add(`${vec.x}:${vec.y}:${vec.path}`);
    }, new Set());
  } else {
    return vector.reduce((accu, vec) => {
      return accu.add(`${vec.x}:${vec.y}`);
    }, new Set());
  }
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
    vector.push({ x: start.x + x, y: start.y + y, path: start.path + i });
  }
}
