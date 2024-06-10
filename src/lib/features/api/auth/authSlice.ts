import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");
const initialState = {
  loading: false,
  user: storedUser ? JSON.parse(storedUser) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state, { payload }: PayloadAction<void>) => {
      state.user = null; 
      localStorage.removeItem("user"); 
    },
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer; 
