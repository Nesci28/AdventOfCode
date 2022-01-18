/* eslint-disable no-continue */
const steps = [1, 7, 13, null, 0, null, 11, 6, 1, null, null, null, null, null];
const required = [null, null, null, 6, null, 4, null, null, null, 0, 0, 3, 9, 9];

function solve(digits) {
  let z = 0;
  const res = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  let digitsIndex = 0;

  for (let i = 0; i < 14; i += 1) {
    const increment = steps[i];
    const modReq = required[i];

    if (increment === null) {
      if (modReq === null) {
        throw new Error("this should not be happening");
      }

      const value = ((z % 26) - modReq);
      z = Math.trunc(z / 26);
      const isValid = value >= 1 && value <= 9;
      if (!isValid) {
        return false;
      }
      res[i] = value;
      continue;
    }

    z = z * 26 + +digits.toString()[digitsIndex] + increment;
    const valueToSet = +digits.toString()[digitsIndex];
    res[i] = valueToSet;
    digitsIndex += 1;
  }

  return res;
}

const startIndex = 9999999;
for (let i = startIndex; i >= 1111111; i -= 1) {
  const includes0 = i.toString().includes("0");
  if (includes0) {
    continue;
  }

  const res = solve(i);
  if (res) {
    const total = res.join("");
    console.log("total :>> ", total);
    break;
  }
}
