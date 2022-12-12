export class Monkey {
  public name: string;

  public startingItems: number[] = [];

  public trueCondition: string;

  public falseCondition: string;

  public inspected = 0;

  public test: string;

  private operation: string;

  private isDividingBy3: boolean;

  constructor(
    name: string,
    startingItems: number[],
    operation: string,
    test: string,
    trueCondition: string,
    falseCondition: string,
    isDividingBy3: boolean,
  ) {
    this.name = name;
    this.startingItems = startingItems;
    this.operation = operation;
    this.test = test;
    this.trueCondition = trueCondition;
    this.falseCondition = falseCondition;
    this.isDividingBy3 = isDividingBy3;
  }

  public runOperation(totalOfDividers?: number): {
    condition: boolean;
    item: number;
  } {
    this.inspected += 1;
    const startingItem = this.startingItems.shift();
    if (startingItem === undefined) {
      throw new Error("Impossible");
    }
    let newStartingItem = this.calculaNewStartingItem(startingItem);
    const condition = this.testNewStartingItem(newStartingItem);
    if (!this.isDividingBy3 && totalOfDividers) {
      newStartingItem %= totalOfDividers;
    }
    return { condition, item: newStartingItem };
  }

  public addtoStartingItems(items: number): void {
    this.startingItems.push(items);
  }

  private testNewStartingItem(item: number): boolean {
    // eslint-disable-next-line no-eval
    const res = eval(`${item} / ${this.test}`);
    const isInt = res % 1 === 0;
    return isInt;
  }

  private calculaNewStartingItem(item: number): number {
    let newStartingItem =
      // eslint-disable-next-line no-eval
      eval(`${item}${this.operation.replace(/old/g, item.toString())}`);
    if (this.isDividingBy3) {
      newStartingItem = Math.floor(newStartingItem / 3);
    }

    return newStartingItem;
  }
}
