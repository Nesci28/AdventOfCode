const inputs = require('./inputs');

const seats = [];

for (const input of inputs) {
  const rowInputs = input.substring(0, 7);
  const columnInputs = input.substring(7);

  let low = 0;
  let high = 127;
  let row = 0;
  for (let i = 0; i < rowInputs.length; i++) {
    const rowInput = rowInputs[i];
    if (rowInput === 'F') {
      high = (high + low + 1) / 2 - 1;
    }
    if (rowInput === 'B') {
      low = (high + low + 1) / 2;
    }
  }
  row = low;

  low = 0;
  high = 7;
  let column = 0;
  for (let i = 0; i < columnInputs.length; i++) {
    const columnInput = columnInputs[i];
    if (columnInput === 'L') {
      high = (high + low + 1) / 2 - 1;
    }
    if (columnInput === 'R') {
      low = (high + low + 1) / 2;
    }
  }
  column = low;

  seats.push(row * 8 + column);
}

seats.sort((a, b) => a - b);
const lowLimit = seats[0];
const cleanedSeats = seats.map(s => s - lowLimit);
for (let i = 0; i < cleanedSeats.length; i++) {
  const seat = cleanedSeats[i];
  if (i !== 0 && i !== seats.length) {
    if (seat !== i) {
      console.log('seat :>> ', seat - 1 + lowLimit);
      break;
    }
  }
}