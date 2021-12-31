/* eslint-disable no-continue */
const fs = require("fs");
const G = require("generatorics");

const inputs = fs
  .readFileSync("./inputs.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .trim()
  .split("\n");

function addition(a, b) {
  const add = `[${a},${b}]`;
  return add;
}

function getLeftHandSide(leftSide) {
  let sawAComma = false;
  let num = "";
  let startIndex = 0;
  let endIndex = 0;
  for (let i = leftSide.length - 1; i >= 0; i -= 1) {
    const char = leftSide[i];
    if (char === "," && !sawAComma) {
      sawAComma = true;
      continue;
    }
    if ((char === "[" || char === "]" || char === ",") && num.length && sawAComma) {
      return {
        num: +(num.split("").reverse().join("")),
        startIndex,
        endIndex,
      };
    }
    if (char !== "[" && char !== "]" && char !== ",") {
      num += char;
      if (!startIndex) {
        startIndex = i;
      }
      if (!endIndex) {
        endIndex = i;
      }
    }
  }

  return undefined;
}

function getRightHandSide(rightSide) {
  let sawAComma = false;
  let num = "";
  let startIndex = 0;
  let endIndex = 0;
  for (let i = 0; i < rightSide.length; i += 1) {
    const char = rightSide[i];
    if (char === "," && !sawAComma) {
      sawAComma = true;
      continue;
    }
    if ((char === "[" || char === "]" || char === ",") && num && sawAComma) {
      return {
        num: +num,
        startIndex,
        endIndex,
      };
    }
    if (char !== "[" && char !== "]" && char !== ",") {
      num += char;
      if (!startIndex) {
        startIndex = i;
      }
      if (!endIndex) {
        endIndex = i;
      }
    }
  }

  return undefined;
}

function checkForExplosion(snailfish) {
  let level = 0;
  for (let i = 0; i < snailfish.length; i += 1) {
    const char = snailfish[i];
    if (char === "[") {
      level += 1;
    }
    if (char === "]") {
      level -= 1;
    }
    if (level === 5) {
      const fifthLevelSnailfish = snailfish.substring(i + 1).split("]")[0];
      const leftIndex = i + 1;
      const left = snailfish.substring(0, leftIndex);
      const rightIndex = snailfish.substring(i).indexOf("]") + 1;
      const right = snailfish.substring(i + rightIndex);
      const lhs = getLeftHandSide(left);
      const rhs = getRightHandSide(right);
      const [lsAdded, rsAdded] = fifthLevelSnailfish.split(",");
      if (lhs) {
        lhs.numToBeAdded = +lsAdded;
      }
      if (rhs) {
        rhs.numToBeAdded = +rsAdded;
        rhs.startIndex += rightIndex + i;
        rhs.endIndex += rightIndex + i;
      }

      return {
        index: i,
        pair: {
          nums: fifthLevelSnailfish,
          startIndex: i,
          endIndex: i + fifthLevelSnailfish.length + 1,
        },
        lhs,
        rhs,
      };
    }
  }

  return false;
}

function addToRight(rightSide, rhs) {
  const regex = new RegExp(rhs.num);
  const rs = rightSide.replace(regex, rhs.num + rhs.numToBeAdded);
  return rs;
}

function addToLeft(leftSide, lhs) {
  const regex = new RegExp(lhs.num.toString().split("").reverse().join(""));
  let ls = leftSide.split("").reverse().join("");
  const replacedNumReversed = (lhs.num + lhs.numToBeAdded).toString().split("").reverse().join("");
  ls = ls.replace(regex, replacedNumReversed);
  ls = ls.split("").reverse().join("");
  return ls;
}

function explode(snailfish, explosionInfo) {
  const { pair, lhs, rhs } = explosionInfo;
  const { startIndex: pSI, endIndex: pEI } = pair;

  let leftSide = snailfish.substring(0, pSI);
  let rightSide = snailfish.substring(pEI + 1);
  if (rhs) {
    rightSide = addToRight(rightSide, rhs);
  }
  if (lhs) {
    leftSide = addToLeft(leftSide, lhs);
  }
  const newSnailfish = `${leftSide}0${rightSide}`;
  return newSnailfish;
}

function checkForSplit(snailfish) {
  let newSnailfish = snailfish.replace(/\]/g, "").replace(/\[/g, "");
  newSnailfish = newSnailfish.split(",").map(Number);
  const nums = newSnailfish.filter((x) => x > 9);
  if (!nums.length) {
    return undefined;
  }

  const index = snailfish.indexOf(nums[0].toString());

  const left = Math.floor(nums[0] / 2);
  const right = Math.ceil(nums[0] / 2);

  const replacement = `[${left},${right}]`;
  return {
    index,
    toReplace: nums[0],
    replacement,
  };
}

function split(snailfish, splitInfo) {
  const regex = new RegExp(splitInfo.toReplace);
  const sf = snailfish.replace(regex, splitInfo.replacement);
  return sf;
}

function action(sf) {
  const explosionInfo = checkForExplosion(sf);
  if (explosionInfo) {
    const newSnailfish = explode(sf, explosionInfo);
    return action(newSnailfish);
  }

  const splitInfo = checkForSplit(sf);
  if (splitInfo) {
    const newSnailfish = split(sf, splitInfo);
    return action(newSnailfish);
  }

  return sf;
}

function calculate(snailfish) {
  const isNumber = /\d+/.test(+snailfish);
  if (isNumber) {
    return snailfish;
  }

  let newSnailfish = snailfish;
  const matches = snailfish.match(/\[\d+,\d+\]/g);
  // eslint-disable-next-line no-restricted-syntax
  for (const match of matches) {
    const replacedMatch = match.replace("[", "").replace("]", "");
    const [leftSide, rightSide] = replacedMatch.split(",");
    const totalLeft = +leftSide * 3;
    const totalRight = +rightSide * 2;
    const total = totalLeft + totalRight;
    newSnailfish = newSnailfish.replace(match, total);
  }
  return calculate(newSnailfish);
}

let total = -Infinity;
const permutations = G.permutation(inputs, 2);
// eslint-disable-next-line no-restricted-syntax
for (const permutation of permutations) {
  const firstSnailfish = permutation[0];
  const secondSnailfish = permutation[1];
  const snailfish = addition(firstSnailfish, secondSnailfish);
  const newSnailfish = action(snailfish);
  const magnitude = calculate(newSnailfish);
  if (+magnitude > +total) {
    total = magnitude;
  }
}

console.log("total :>> ", total);
