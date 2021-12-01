const inputs = require("./inputs");

const res = inputs.reduce((accu, curr, i) => {
  if (i === 0) {
    return accu;
  }

  const lastInput = inputs[i - 1];
  console.log('lastInput :>> ', lastInput, curr);
  if (lastInput >= curr) {
    return accu;
  }

  return accu += 1;
}, 0);

console.log('res :>> ', res);