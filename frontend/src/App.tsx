import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import CryptoCurrency from './pages/CryptoCurrency';
import NotFound from './pages/NotFound';

export default function App () {
  return (
    <Router>
      <div className="app-header">
        <Link className="button" to="/BTC">BTC</Link>
        <Link className="button" to="/EHT">EHT</Link>
        <Link className="button" to="/TXL">TXL</Link>
      </div>
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/BTC">
            <CryptoCurrency currency="bitcoin" />
          </Route>
          <Route exact path="/EHT">
            <CryptoCurrency currency="ethereum" />
          </Route>
          <Route exact path="/TXL">
            <CryptoCurrency currency="tixl-new" />
          </Route>
          <Route path="/*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
