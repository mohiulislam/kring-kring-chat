import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const storedUser = sessionStorage.getItem("user");
const initialState = {
  userCredential: storedUser ? JSON.parse(storedUser) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state, { payload }: PayloadAction<void>) => {
      state.userCredential = null;
      sessionStorage.removeItem("user");
    },
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
