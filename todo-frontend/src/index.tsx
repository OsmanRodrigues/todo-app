import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { setConfiguration } from 'react-grid-system';

setConfiguration({ maxScreenClass: 'xl', gridColumns: 12 });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
