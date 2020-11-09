import { CryptocurrencyIds } from './CryptocurrencyIds';
import axios from 'axios';
import StoreEntry from './StoreEntry';

const MINUTE = 60000;

const coingecko = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/',
});

export default class CoinGeckoTracker {
  private store = new Map<CryptocurrencyIds, StoreEntry>();

  constructor() {
    this.store = new Map([
      [CryptocurrencyIds.BTC, new StoreEntry()],
      [CryptocurrencyIds.ETH, new StoreEntry()],
      [CryptocurrencyIds.TXL, new StoreEntry()]
    ]);
  }

  public run () {
    this.fetchAll();
    setInterval(() => {
      this.fetchAll();
    }, MINUTE)
  }

  public getHistory (currency: CryptocurrencyIds): StoreEntry {
    return this.store.get(currency);
  }

  private fetchAll () {
    // the API would allow fetching multiple coins at once
    this.fetchCoinGecko(CryptocurrencyIds.BTC);
    this.fetchCoinGecko(CryptocurrencyIds.ETH);
    this.fetchCoinGecko(CryptocurrencyIds.TXL);
  }

  private async fetchCoinGecko (cryptocurrency: CryptocurrencyIds) {
    try {
      const response = await coingecko.get('simple/price', {
        params: {
          ids: cryptocurrency,
          vs_currencies: 'EUR',
        }
      });
      this.store.get(cryptocurrency).addEntry(response.data[cryptocurrency].eur);
    } catch (error) {
      console.log(error);
    }
  }
}
