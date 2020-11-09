import * as dotenv from 'dotenv';
import express from 'express';
import { CryptocurrencyIds } from './CryptocurrencyIds';
import CoinGeckoTracker from './CoinGeckoTracker';
import convertHistory from './ConvertHistory';
import ConvertedHistory from './ConvertedHistory';
import StoreEntry from './StoreEntry';

dotenv.config();

const app = express();
const port = process.env.PORT;

const coinGeckoTracker: CoinGeckoTracker = new CoinGeckoTracker();
coinGeckoTracker.run();

app.get("/price/:currency", (req, res) => {
  console.log(req.params.currency);
  // if the resource does not exist a 404 response would be the right call to make,
  // not returning the history for tixl as a default
  const currency: CryptocurrencyIds = getCrytocurrencyIdFromString(req.params.currency);
  const minutes: number = !!req.query.minutes ? Number(req.query.minutes) : 60;
  const originalHistory: StoreEntry = coinGeckoTracker.getHistory(currency);
  const history: ConvertedHistory = convertHistory(originalHistory, minutes);
  res.send(history);
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

function getCrytocurrencyIdFromString (currency: string) {
  let result: CryptocurrencyIds;
  switch (currency) {
    case CryptocurrencyIds.BTC:
      result = CryptocurrencyIds.BTC;
      break;
    case CryptocurrencyIds.ETH:
      result = CryptocurrencyIds.ETH;
      break;
    default:
      result = CryptocurrencyIds.TXL;
  }
  return result;
}
