import StoreEntry from './StoreEntry';
import ConvertedHistory from './ConvertedHistory';

export default function convertHistory (storeEntry: StoreEntry, minutes: number): ConvertedHistory {
  const originalHistory = storeEntry.getHistory();
  // most of the typings here are not required, usually types should only be given when they can not be inferred
  const count: number = originalHistory.length >= minutes ? minutes : originalHistory.length;
  // hard coupling of index to minutes, what if the update interval changes?
  // storing a timestamp for every value would have been a good idea
  const history: number[] = originalHistory.slice(originalHistory.length - count);
  const latest: number = history[history.length - 1];
  // array.reduce would have been a nice fit here: history.reduce((sum, current) => sum + current, 0) / count
  let sum: number = 0;
  for (const entry of history) {
    sum += entry;
  }
  const average: number = sum / count;
  return new ConvertedHistory(latest, average, count, history);
}
