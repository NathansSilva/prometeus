import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import { createRoot } from 'react-dom/client';
import reducers from './reducers';

const container = document.getElementById('root');
const root = createRoot(container);

const store = configureStore({ reducer: reducers });
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
