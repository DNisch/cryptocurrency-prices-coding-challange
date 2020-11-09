import React from 'react';
import axios from 'axios';

const MINUTE = 60000;

const loadData = (currency: string, setData: React.Dispatch<React.SetStateAction<any>>) => {
  axios.get(`/price/${currency}`)
    .then(response => {
      setData(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
};

// more typescript idiomatic alternative
interface CryptoCurrencyProps {
  currency: string;
}

export default function CryptoCurrency ({ currency }: CryptoCurrencyProps) {
  // extracting a custom hook like "useCurrency" would have been more reusable
  const [data, setData] = React.useState({
    latest: 0,
    average: 0,
    count: 0,
    history: []
  });

  React.useEffect(() => {
    loadData(currency, setData);
    const interval = setInterval(() => {
      loadData(currency, setData);
    }, MINUTE);

    return () => clearInterval(interval);
  }, [currency]);

  return (
    <div>
      <h2>latest: {data.latest}</h2>
      <h2>average: {data.average}</h2>
    </div>
  )
}
