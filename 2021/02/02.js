const inputs = require("./inputs");

const obj = {
  depth: 0,
  horizontal: 0,
  aim: 0,
}

for (const input of inputs) {
  const [direction, steps] = input.split(" ");
  if (direction === "forward") {
    obj.horizontal += +steps;
    obj.depth += obj.aim * steps;
  }
  if (direction === "up") {
    obj.aim -= +steps;
  }
  if (direction === "down") {
    obj.aim += +steps;
  }
}

const res = obj.horizontal * obj.depth;
console.log('res :>> ', res);