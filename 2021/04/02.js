/* eslint-disable no-restricted-syntax */
const _ = require("lodash");
const inputs = require("./inputs.js");

const [numbers, ...boards] = inputs;

function checkIfBoardHasNumber(board, number) {
  for (const line of board) {
    for (let i = 0; i < line.length; i += 1) {
      const boardNumber = line[i];
      if (number === boardNumber) {
        line[i] = `${line[i]}x`;
        return true;
      }
    }
  }

  return false;
}

function checkColumns(board) {
  const { length } = board[0];
  for (let i = 0; i < length; i += 1) {
    const column = board.map((line) => line[i]);
    const isColumnAllChecked = column.every((n) => n.toString().endsWith("x"));
    if (isColumnAllChecked) {
      return true;
    }
  }

  return false;
}

function checkRows(board) {
  for (const line of board) {
    const isRowAllChecked = line.every((n) => n.toString().endsWith("x"));
    if (isRowAllChecked) {
      return true;
    }
  }

  return false;
}

function checkBoardState(board) {
  const isColumnChecked = checkColumns(board);
  if (isColumnChecked) {
    return true;
  }

  const isRowChecked = checkRows(board);
  if (isRowChecked) {
    return true;
  }

  return false;
}

function calculateUnmarkedNumbers(board) {
  const concatBoard = [].concat(...board);
  const filteredNumbers = concatBoard.filter((n) => !n.toString().endsWith("x"));
  const sumOfUnmarkedNumbers = _.sum(filteredNumbers);
  return sumOfUnmarkedNumbers;
}

for (const number of numbers) {
  const boardsToDelete = [];
  for (let i = 0; i < boards.length; i += 1) {
    const board = boards[i];
    const isNumberInBoard = checkIfBoardHasNumber(board, number);
    if (isNumberInBoard) {
      const isBoardCompleted = checkBoardState(board);
      if (isBoardCompleted) {
        if (boards.length === 1) {
          const sumOfUnmarkedNumbers = calculateUnmarkedNumbers(board);
          const total = sumOfUnmarkedNumbers * number;
          console.log("total :>> ", total);
          process.exit();
        }
        boardsToDelete.push(i);
      }
    }
  }

  boardsToDelete.reverse().forEach((i) => boards.splice(i, 1));
}
