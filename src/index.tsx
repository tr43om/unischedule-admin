import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./store/store";
import { Provider as StoreProvider } from "react-redux";
import { fetchGroups } from "./store/ducks/schedule/actions";
import { SnackbarProvider } from "notistack";

store.dispatch(fetchGroups());

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </StoreProvider>
  </React.StrictMode>
);
