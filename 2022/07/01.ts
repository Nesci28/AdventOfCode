import { flatten } from "flat";
import { get, set } from "lodash";

import { inputs } from "./inputs";

export interface Tree {
  totalSize: number;
  listOfFiles: File[];
}

export interface File {
  size: number;
  name: string;
}

export function buildTree(): Record<string, Tree> {
  const tree: Record<string, Tree> = {};
  const currentPaths: string[] = [];
  for (let i = 0; i < inputs.length; i += 1) {
    const input = inputs[i];

    const isCommand = input.startsWith("$ cd ");
    if (isCommand) {
      const toPath = input.split(" ").pop()!;
      toPath === ".." ? currentPaths.pop() : currentPaths.push(toPath);
      for (let j = 0; j < currentPaths.length; j += 1) {
        const paths = currentPaths.slice(0, j + 1);
        const dir = get(tree, paths.join("."));
        if (!dir) {
          set(tree, paths.join("."), { totalSize: 0, listOfFiles: [] });
        }
      }
    }

    const isFile = input.match(/^(\d+) (.*)$/);
    if (isFile) {
      const [, size, name] = isFile;
      for (let j = currentPaths.length; j > 0; j -= 1) {
        const paths = currentPaths.slice(0, j);
        get(tree, paths.join(".")).totalSize += +size;
        get(tree, paths.join(".")).listOfFiles.push({
          size: +size,
          name,
        });
      }
    }
  }

  return tree;
}

function main(): void {
  const tree = buildTree();
  const flatTree = flatten<Record<string, Tree>, Record<string, unknown>>(tree);
  const keys = Object.keys(flatTree).filter((x) => {
    return x.includes("totalSize");
  });

  let total = 0;
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const totalSize = flatTree[key] as number;
    if (totalSize <= 100000) {
      total += totalSize;
    }
  }

  console.log(`step 1: ${total}`);
}

main();
