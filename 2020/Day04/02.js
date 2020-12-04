const rawInputs = require("./inputs");

// Clean inputs
const splittedInputs = rawInputs.split("\n\n");
const cleanedInputs = [];
splittedInputs.forEach((input) => cleanedInputs.push(input.split("\n")));
const firstJoinInputs = [];
cleanedInputs.forEach((input) => firstJoinInputs.push(input.join()));
const commasInputs = [];
firstJoinInputs.forEach((input) => commasInputs.push(input.split(",")));
const cleanedUpInputs = [];
commasInputs.forEach((input) => cleanedUpInputs.push(input.join(" ")));

// Convert to object
const dividedInputs = [];
cleanedUpInputs.forEach((input) => dividedInputs.push(input.split(" ")));
const inputs = [];
for (const dividedInput of dividedInputs) {
  const object = {};
  dividedInput.forEach((input) => {
    const [key, value] = input.split(":");
    object[key] = value;
  });
  inputs.push(object);
}

// Algo
let counter = 0;
for (const input of inputs) {
  const compare = {
    byr: 1,
    iyr: 1,
    eyr: 1,
    hgt: 1,
    hcl: 1,
    ecl: 1,
    pid: 1,
    // cid: 1,
  };
  for (const key of Object.keys(input)) {
    const value = input[key];
    switch (true) {
      // byr (Birth Year) - four digits; at least 1920 and at most 2002.
      case key === "byr":
        if (value.match(/^[0-9]{4}/) && compareNumbers(value, 1920, 2002)) {
          compare[key] = 0;
        }
        break;
      // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
      case key === "iyr":
        if (value.match(/^[0-9]{4}/) && compareNumbers(value, 2010, 2020)) {
          compare[key] = 0;
        }
        break;
      // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
      case key === "eyr":
        if (value.match(/^[0-9]{4}/) && compareNumbers(value, 2020, 2030)) {
          compare[key] = 0;
        }
        break;
      // hgt (Height) - a number followed by either cm or in:
      // If cm, the number must be at least 150 and at most 193.
      // If in, the number must be at least 59 and at most 76.
      case key === "hgt":
        if (value.match(/^\d+cm$/)) {
          const height = value.replace(/\D/g, "");
          if (compareNumbers(height, 150, 193)) {
            compare[key] = 0;
          }
        }
        if (value.match(/^\d+in$/)) {
          const height = value.replace(/\D/g, "");
          if (compareNumbers(height, 59, 76)) {
            compare[key] = 0;
          }
        }
        break;
      // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
      case key === "hcl":
        if (value.match(/^#[0-9a-f]{6}/)) {
          compare[key] = 0;
        }
        break;
      // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
      case key === "ecl":
        if (
          value === "amb" ||
          value === "blu" ||
          value === "brn" ||
          value === "gry" ||
          value === "grn" ||
          value === "hzl" ||
          value === "oth"
        ) {
          compare[key] = 0;
        }
        break;
      // pid (Passport ID) - a nine-digit number, including leading zeroes.
      case key === "pid":
        if (value.match(/^[0-9]{9}$/)) {
          compare[key] = 0;
        }
        break;
    }
  }
  if (Object.values(compare).filter((value) => value === 1).length === 0) {
    counter = counter + 1;
  }
}

console.log("counter :>> ", counter);

function compareNumbers(input, lowerNumber, higherNumber) {
  return Number(input) >= lowerNumber && Number(input) <= higherNumber;
}
