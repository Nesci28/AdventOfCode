let image = require('./asset.js');
const setup = {
  x: 25,
  y: 6,
};
image = image.split('');

const size = setup.x * setup.y;
function creatingLayer(size, image, layers = []) {
  layers.push(image.splice(0, size));
  return image.length > 0 ? creatingLayer(size, image, layers) : layers;
}

const layers = creatingLayer(size, image);

let count = Infinity;
let finalLayer;
layers.forEach(layer => {
  layer = layer.join('');
  const total = (layer.match(/0/g) || []).length;
  if (total < count) {
    count = total;
    finalLayer = layer;
  }
});

const ones = finalLayer.match(/1/g).length;
const twos = finalLayer.match(/2/g).length;
console.log(ones * twos);
