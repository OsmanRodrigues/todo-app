import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { setConfiguration } from 'react-grid-system';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@styles/global';
import theme from '@styles/theme';

setConfiguration({ maxScreenClass: 'xl', gridColumns: 12 });

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
