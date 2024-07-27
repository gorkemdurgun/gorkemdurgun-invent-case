import { combineReducers } from "@reduxjs/toolkit";
import moviesReducer from "./slice";

const rootReducer = combineReducers({
  movies: moviesReducer,
});

export default rootReducer;
