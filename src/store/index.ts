import { store } from "./store";
import { useDispatch } from "react-redux";
import rootReducer from "./rootReducer";

export * from "./ducks";

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
