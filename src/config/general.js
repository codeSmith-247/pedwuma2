import { createSlice } from "@reduxjs/toolkit";
import { getAuth, signOut } from "firebase/auth";

const initialValue = {
  name: "",
  loggedIn: false,
  role: "",
  plan: {},
};

const general = createSlice({
  name: "general",
  initialState: initialValue,
  reducers: {
    login: (state, action) => {
      // Update individual properties of the state
      state.name = action.payload.name;
      state.loggedIn = true; // You likely want to set loggedIn to true
      state.role = action.payload.role;
      state.plan = action.payload.plan;
    },

    logout: (state) => {
      // Update individual properties of the state to log out
      const auth = getAuth();
      signOut(auth);

      state.name = "";
      state.loggedIn = false; // Set loggedIn to false
      state.role = "";
      state.plan = {};
    },
  },
});

export const { login, logout } = general.actions;

export default general.reducer;
