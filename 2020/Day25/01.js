const inputs = require('./inputs');

const subjectNumber = 7;
const mod = 20201227;
const [cardPK, doorPK] = inputs;

let encryptionKey = 1;
let loopSize = 1;
while (loopSize !== doorPK) {
  loopSize = (loopSize * subjectNumber) % mod;
  encryptionKey = (encryptionKey * cardPK) % mod;
}

console.log({ counter: encryptionKey });
