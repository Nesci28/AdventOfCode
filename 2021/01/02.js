const _ = require("lodash");

const inputs = require("./inputs");

const chunks = inputs.map((v, i) => [v, inputs[i + 1], inputs[i + 2]]);

const res = chunks.reduce((accu, curr, i) => {
  if (i === 0) {
    return accu;
  }

  const lastChunkSum = _.sum(chunks[i - 1]);
  const currentChunkSum = _.sum(curr);
  if (lastChunkSum >= currentChunkSum) {
    return accu;
  }

  return accu += 1;
}, 0);

console.log('res :>> ', res);