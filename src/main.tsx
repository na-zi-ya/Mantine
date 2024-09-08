import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { CompanyProvider } from "./context";
import "@mantine/notifications/styles.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider>
      <CompanyProvider>
        <App />
      </CompanyProvider>
    </MantineProvider>
  </React.StrictMode>
);
