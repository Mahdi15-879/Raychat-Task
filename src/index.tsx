import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ThemeProvider from "./contexts/ThemeContext";
import LanguageProvider from "./contexts/LanguageContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
