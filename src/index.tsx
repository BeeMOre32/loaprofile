import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import { LoaProvider } from './components/contexts';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoaProvider>
        <App />
      </LoaProvider>
    </BrowserRouter>
  </React.StrictMode>
);
