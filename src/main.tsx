import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

// Create the Redux store
const store = configureStore({
  reducer: rootReducer,
});

// Define the root element
const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

// Render the React application
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
