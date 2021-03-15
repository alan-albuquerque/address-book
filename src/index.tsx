import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.scss';
import App from './App';
import { store, StoreProvider } from './store';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider value={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
