import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import App from './App';
import './assets/main.scss';
import { store, StoreProvider } from './store';

ReactModal.setAppElement('#root');

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider value={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
