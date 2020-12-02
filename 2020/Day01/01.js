const inputs = require("./inputs");

for (let i = 0; i < inputs.length; i++) {
  const firstEl = inputs[i];
  for (let j = i + 1; j < inputs.length; j++) {
    const secondEl = inputs[j];

    if (firstEl + secondEl === 2020) {
      console.log(firstEl * secondEl);
    }
  }
}
