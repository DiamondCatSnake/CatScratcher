/**
 * ************************************
 *
 * @module  index.js
 * @author  Nathan Agbayani, Ken Iwane, Simon Lin, Gio Mogi
 * @date
 * @description entry point for application. Hangs React app off of #contents in index.html
 *
 * ************************************
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import App from './App';
import { store } from './store';
import './stylesheets/app.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store ={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>
);
