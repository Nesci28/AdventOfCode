const masses = require('./assets.json');

function getFuel(number, arr = []) {
  const res = Math.floor(number / 3) - 2;
  if (res > 0) {
    arr.push(res);
    return getFuel(res, arr);
  } else {
    return (total = arr.reduce((accu, curr) => {
      return accu + curr;
    }, 0));
  }
}

let total = 0;
masses.forEach(mass => {
  total += getFuel(mass);
});
console.log('total :', total);
