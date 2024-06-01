import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import productReducer from "../slices/productsSlice";

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  profile: productReducer,
});

export default rootReducer;
