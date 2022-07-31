import './index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { MessengerContextProvider } from './MessengerContextProvider';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <MessengerContextProvider>
      <App />
    </MessengerContextProvider>
  </BrowserRouter>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
