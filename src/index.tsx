import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import { LoaProvider } from './components/contexts';
import { BrowserRouter } from 'react-router-dom';
import { ThemeSwitcherProvider } from "react-css-theme-switcher";

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark_theme.css`,
  light: `${process.env.PUBLIC_URL}/light_theme.css`,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeSwitcherProvider themeMap={themes} defaultTheme={
      window.localStorage.getItem("dark_mode") === "true" ? "dark" : "light"
    }>
      <BrowserRouter>
        <LoaProvider>
          <App />
        </LoaProvider>
      </BrowserRouter>
    </ThemeSwitcherProvider>
  </React.StrictMode>
);
