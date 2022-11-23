import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./store/store";
import { Provider as StoreProvider } from "react-redux";
import { fetchGroups } from "./store/ducks/schedule/actions";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";

store.dispatch(fetchGroups());

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <BrowserRouter>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
);
