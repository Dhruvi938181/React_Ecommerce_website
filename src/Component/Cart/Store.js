import { legacy_createStore as createStore } from "redux";
import { myReducer } from "./CartReducer";
export const myStore = createStore(myReducer);
