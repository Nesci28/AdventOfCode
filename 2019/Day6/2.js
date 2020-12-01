const orbits = require('./asset.json');

//                             YOU
//                             /
//           G - H       J - K - L
//         /           /
// COM - B - C - D - E - F
//                 \
//                   I - SAN

const orbitsList = {};

orbits.forEach(orbit => {
  const [orbitting, planet] = orbit.split(')');
  orbitsList[planet] = orbitting;
});

function calcOrbits(key, destination, total = []) {
  total.push({ x: key, y: orbitsList[key] });
  return orbitsList[key] !== destination
    ? calcOrbits(orbitsList[key], destination, total)
    : total;
}

const youTraverse = calcOrbits('YOU', 'COM');
const sanTraverse = calcOrbits('SAN', 'COM');

let intersection;
let breakLoop = false;

for (const you of youTraverse) {
  if (breakLoop) break;
  for (const san of sanTraverse) {
    if (you.x === san.x && you.y == san.y) {
      intersection = you;
      breakLoop = true;
      break;
    }
  }
}

const youTotal = calcOrbits('YOU', intersection.x).length - 1;
const sanTotal = calcOrbits('SAN', intersection.x).length - 1;
console.log(youTotal + sanTotal);
