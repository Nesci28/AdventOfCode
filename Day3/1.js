const paths = require('./asset.json');
const _ = require('lodash');

const first = paths.first;
const second = paths.second;

let firstVector = [{ x: 0, y: 0 }];
let secondVector = [{ x: 0, y: 0 }];

first.forEach(path => {
  const direction = path[0];
  const steps = path.slice(1);
  generatingPaths(firstVector, direction, steps);
});

second.forEach(path => {
  const direction = path[0];
  const steps = path.slice(1);
  generatingPaths(secondVector, direction, steps);
});

let distance = Infinity;
firstVector = firstVector.slice(1);
secondVector = secondVector.slice(1);

const arr = _.intersectionWith(firstVector, secondVector, _.isEqual);
arr.forEach(vector => {
  const total = Math.abs(vector.x) + Math.abs(vector.y);
  if (total < distance) distance = total;
});

console.log('distance :', distance);

function generatingPaths(vector, direction, steps) {
  if (direction === 'R') goingHorizontal(vector, steps, 'right');
  if (direction === 'L') goingHorizontal(vector, steps, 'left');
  if (direction === 'U') goingVertical(vector, steps, 'up');
  if (direction === 'D') goingVertical(vector, steps, 'down');
}

function goingHorizontal(vector, steps, dir) {
  dir = dir === 'right' ? 1 : -1;
  const start = vector[vector.length - 1];
  for (let i = 1; i <= steps; i++) {
    vector.push({ x: start['x'] + i * dir, y: start['y'] });
  }
}

function goingVertical(vector, steps, dir) {
  dir = dir === 'up' ? 1 : -1;
  const start = vector[vector.length - 1];
  for (let i = 1; i <= steps; i++) {
    vector.push({ x: start['x'], y: start['y'] + i * dir });
  }
}
