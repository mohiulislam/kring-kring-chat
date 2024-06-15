import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");
const initialState = {
  userCredential: storedUser ? JSON.parse(storedUser) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state, { payload }: PayloadAction<void>) => {
      state.userCredential = null; 
      localStorage.removeItem("user"); 
    },
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer; 
