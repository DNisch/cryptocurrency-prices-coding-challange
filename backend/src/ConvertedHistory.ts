export default class ConvertedHistory {
  private latest: number;
  private average: number;
  private count: number;
  private history: number[];

  constructor(latest: number, average: number, count: number, history: number[]) {
    this.latest = latest;
    this.average = average;
    this.count = count;
    this.history = history;
  }
}