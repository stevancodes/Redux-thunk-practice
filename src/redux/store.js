import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import postReducer from "./reducer";

const store = configureStore({
  reducer: postReducer,
});

export default store;
