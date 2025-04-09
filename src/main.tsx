import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./i18n/config";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  throw new Error("Root element with ID 'root' was not found in the document.");
}
