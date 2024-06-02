import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import productReducer from "../slices/productsSlice";
import profileSlice from "../slices/profileSlice";

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  profile: profileSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
