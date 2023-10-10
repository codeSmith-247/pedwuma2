import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import Aos from 'aos';

import { BrowserRouter } from 'react-router-dom';

import './styles/index.css';
import 'aos/dist/aos.css';

Aos.init();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
