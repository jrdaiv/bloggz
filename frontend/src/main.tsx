import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";

import App from "./App.tsx";
import "../src/styles/globals.css";
import { AuthProvider } from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HeroUIProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      </HeroUIProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
