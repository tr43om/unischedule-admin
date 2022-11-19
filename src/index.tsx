import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./store/store";
import { Provider as StoreProvider } from "react-redux";
import { fetchGroups } from "./store/ducks/schedule/actions";
const firebaseConfig = {
  apiKey: "AIzaSyDFOsorayeHfPuCX0yNkE9BMesOtsZaj4I",
  authDomain: "omsu-schedule.firebaseapp.com",
  projectId: "omsu-schedule",
  storageBucket: "omsu-schedule.appspot.com",
  messagingSenderId: "905148206944",
  appId: "1:905148206944:web:611ef01dbc0a0694ad1805",
};

store.dispatch(fetchGroups());

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
