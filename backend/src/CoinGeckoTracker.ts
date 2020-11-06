import { CryptocurrencyIds } from './CryptocurrencyIds';
import axios from 'axios';
import StoreEntry from './StoreEntry';

const MINUTE = 60000;

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
  }

  public getHistory (currency: CryptocurrencyIds): StoreEntry {
    return this.store.get(currency);
  }

  private fetchAll () {
    this.fetchCoinGecko(CryptocurrencyIds.BTC);
    this.fetchCoinGecko(CryptocurrencyIds.ETH);
    this.fetchCoinGecko(CryptocurrencyIds.TXL);
    setTimeout(() => {
      this.fetchAll();
    }, MINUTE)
  }

  private async fetchCoinGecko (cryptocurrency: CryptocurrencyIds) {
    axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptocurrency}&vs_currencies=EUR`)
      .then(response => {
        this.store.get(cryptocurrency).addEntry(response.data[cryptocurrency].eur)
      })
      .catch(error => {
        console.log(error);
      });
  }
}