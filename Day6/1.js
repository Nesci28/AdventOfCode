const orbits = require('./asset.json');

//            G - H       J - K - L
//          /           /
//  COM - B - C - D - E - F
//                  \
//                   I

const orbitsList = {};

orbits.forEach(orbit => {
  const [orbitting, planet] = orbit.split(')');
  orbitsList[planet] = orbitting;
});

function calcOrbits(key, total = 0) {
  total += 1;
  return orbitsList[key] !== 'COM' ? calcOrbits(orbitsList[key], total) : total;
}

const total = Object.keys(orbitsList).reduce((accu, key) => {
  return (accu += calcOrbits(key));
}, 0);

console.log('total :', total);
