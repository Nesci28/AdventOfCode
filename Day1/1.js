const masses = require('./assets.json');

const total = masses.reduce((accu, curr) => {
  return accu + (Math.floor(curr / 3) - 2);
}, 0);

console.log('total :', total);
