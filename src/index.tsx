import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { VersionProvider } from "./components/context/VersionProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <VersionProvider>
    <App />
  </VersionProvider>
);
