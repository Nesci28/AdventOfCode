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

const allergens = {};
while (true) {
  if (knownAllergens.map(k => k.ingredient).flat().length === 0) {
    break;
  }
  for (const allergen of knownAllergens) {
    if (allergen.ingredient.length === 1) {
      allergens[allergen.allergen] = allergen.ingredient[0];
      knownAllergens = deleteAllIngredient(knownAllergens, allergen.ingredient[0]);
    }
  }
}

const list = [];
Object.keys(allergens).sort().forEach((a) => {
  list.push(allergens[a])
});
console.log('list :>> ', list.join(','));

function deleteAllIngredient(allergens, ingredient) {
  const result = [];
  for (const allergen of allergens) {
    const ing = allergen.ingredient.filter(i => i !== ingredient);
    result.push({allergen: allergen.allergen, ingredient: ing});
  }

  return result;
}

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
