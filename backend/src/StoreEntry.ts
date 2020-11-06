export default class StoreEntry {
  private history: number[];

  constructor() {
    this.history = [];
  }

  public addEntry (price: number) {
    this.history.push(price);
  }

  public getHistory () {
    return this.history;
  }
}