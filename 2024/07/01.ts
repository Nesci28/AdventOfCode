import { readFile } from "fs/promises";
import { sum } from "lodash";

type Input = { result: number; numbers: number[] };

const mappedPossibilities = new Map<number, string[]>();

async function parse(): Promise<Input[]> {
  const rawInput = (await readFile("./input.txt"))
    .toString()
    .split("\n")
    .map((x) => {
      return x.split(": ");
    })
    .map(([r, n]) => {
      return {
        result: +r,
        numbers: n.split(" ").map(Number),
      };
    });

  return rawInput;
}

function evaluateWithoutPrecedence(expression: string) {
  const tokens = expression.match(/(\d+|\+|\*)/g)!;
  let result = parseInt(tokens[0]);

  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const nextNumber = parseInt(tokens[i + 1]);

    if (operator === "+") {
      result += nextNumber;
    } else if (operator === "*") {
      result *= nextNumber;
    }
  }

  return result;
}

function generatePossibilities(length: number): string[] {
  const possibilities = mappedPossibilities.get(length);
  if (possibilities) {
    return possibilities;
  }

  const results: string[] = [];
  const backtrack = (current: string[]) => {
    if (current.length === length) {
      results.push(current.join(""));
      return;
    }

    current.push("+");
    backtrack(current);
    current.pop();

    current.push("*");
    backtrack(current);
    current.pop();
  };

  backtrack([]);
  mappedPossibilities.set(length, results);
  return results;
}

function makeFormula(numbers: number[], possibility: string): string {
  const formula = numbers.reduce<string>((accu, curr, i) => {
    accu += curr;
    try {
      const p = possibility[i] ?? "";
      accu += p;
    } catch {}
    return accu;
  }, "");
  return formula;
}

function checkPossibilites(input: Input): boolean {
  const { result, numbers } = input;
  const length = numbers.length;
  const possibilities = generatePossibilities(length - 1);
  for (let i = 0; i < possibilities.length; i += 1) {
    const possibility = possibilities[i];
    const formula = makeFormula(numbers, possibility);
    const res = evaluateWithoutPrecedence(formula);
    if (res === result) {
      return true;
    }
  }

  return false;
}

(async () => {
  const inputs = await parse();

  const res: number[] = [];
  for (let i = 0; i < inputs.length; i += 1) {
    const input = inputs[i];
    const isPossible = checkPossibilites(input);
    if (isPossible) {
      res.push(input.result);
    }
  }

  const total = sum(res);
  console.log("total :>> ", total);
})();
