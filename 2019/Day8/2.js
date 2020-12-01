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

let finalImage = [];
layers[0].forEach((pixel, index) => {
  if (+pixel !== 2) {
    finalImage.push(+pixel === 1 ? 'X' : ' ');
  } else {
    for (let i = 1; i < layers.length; i++) {
      const nextLayer = layers[i];
      if (+nextLayer[index] !== 2) {
        finalImage.push(+nextLayer[index] === 1 ? 'X' : ' ');
        break;
      }
    }
  }
  if ((index + 1) % 25 === 0) finalImage.push('\n');
});

console.log(finalImage.join(''));
