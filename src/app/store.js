import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import allUsersReducer from "../features/allUsers/allUsersSlice";
import adminReducer from "../features/admins/adminSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    allUsers: allUsersReducer,
    admins: adminReducer,
  },
});
