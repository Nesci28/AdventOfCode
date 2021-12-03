const inputs = require("./inputs.js");

const res = inputs.reduce((accu, curr) => {
  const accuRes = accu;
  curr.split("").forEach((s, i) => {
    Math.sign(+s)
      ? accuRes[i] = accuRes[i] + 1 || 1
      : accuRes[i] = accuRes[i] - 1 || -1;
  });
  return accuRes;
}, []);

const gammaRate = parseInt(res.map((x) => (x > 0 ? 1 : 0)).join(""), 2);
const epsilonRate = parseInt(res.map((x) => (x > 0 ? 0 : 1)).join(""), 2);

const total = gammaRate * epsilonRate;
console.log("total :>> ", total);
