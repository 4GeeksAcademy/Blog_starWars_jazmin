import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes.jsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // necesario para dropdowns
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
