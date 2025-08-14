import { encodeToken } from "@/utils/tokenEncoderDecoder";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = encodeToken(action.payload.token);
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
