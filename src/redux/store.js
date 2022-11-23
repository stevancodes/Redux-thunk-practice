import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import postReducer from "./reducer";
import logger from "redux-logger";

const store = configureStore({
  reducer: postReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk).concat(logger),
});

export default store;
