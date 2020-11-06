import StoreEntry from './StoreEntry';
import ConvertedHistory from './ConvertedHistory';

export default function convertHistory (storeEntry: StoreEntry, minutes: number): ConvertedHistory {
  const originalHistory = storeEntry.getHistory();
  const count: number = originalHistory.length >= minutes ? minutes : originalHistory.length;
  const history: number[] = originalHistory.slice(originalHistory.length - count);
  const latest: number = history[history.length - 1];
  let sum: number = 0;
  for (const entry of history) {
    sum += entry;
  }
  const average: number = sum / count;
  return new ConvertedHistory(latest, average, count, history);
}