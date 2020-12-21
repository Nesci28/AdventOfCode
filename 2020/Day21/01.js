const rawInputs = require("./inputs");

const regExp = /\(([^)]+)\)/;

const inputs = rawInputs.split("\n").map((line) => {
  return {
    ingredients: line.includes("(")
      ? line.split("(")[0].trim().split(" ")
      : line.trim().split(" "),
    ingredientsSet: line.includes("(")
      ? new Set(line.split("(")[0].trim().split(" "))
      : new Set(line.trim().split(" ")),
    allergens: regExp.exec(line)
      ? regExp.exec(line)[1].replace("contains ", "").split(", ")
      : null,
  };
});

let knownAllergens = [];

for (const input of inputs) {
  for (const allergen of input.allergens) {
    const ingredient = findAllergenIngredient(allergen);
    knownAllergens.push({ allergen, ingredient });
  }
}

knownAllergens = mergeAllergens(knownAllergens);

const allergens = [...new Set(knownAllergens.map(k => k.ingredient).flat())];
const allIngredients = [...inputs.map((i) => i.ingredients)].flat();

const counter = allIngredients.reduce((accu, curr) => {
  if (!allergens.includes(curr)) {
    return (accu += 1);
  }
  return accu;
}, 0);

console.log("counter :>> ", counter);

function mergeAllergens(knownAllergens) {
  return knownAllergens.filter((v) => {
    return this[v.allergen]
      ? !Object.assign(this[v.allergen], v)
      : (this[v.allergen] = v);
  }, {});
}

function findAllergenIngredient(allergen) {
  const ingredients = [];
  const foodWithAllergen = inputs.filter((i) => i.allergens.includes(allergen));
  for (let i = 0; i < foodWithAllergen[0].ingredients.length; i++) {
    const ingredient = foodWithAllergen[0].ingredients[i];
    const times = foodWithAllergen.filter((f) =>
      f.ingredients.includes(ingredient)
    ).length;
    if (times === foodWithAllergen.length) {
      ingredients.push(ingredient);
    }
  }

  return ingredients;
}
