// createSlice is used when the application runs
import { createSlice } from '@reduxjs/toolkit';

// PayloadAction is only a TypeScript type
import type { PayloadAction } from '@reduxjs/toolkit';

// RootState represents the complete Redux store
import type { RootState } from '../store';

// ================= USER TYPE =================

// Describes the user information stored after login
export type TUser = {
  // User's ID from the database
  _id: string;

  // User's email address
  email: string;

  // Expiration time of the JWT token
  exp: number;

  // Time when the JWT token was issued
  iat: number;
};


// ================= AUTH STATE TYPE =================

// Describes what is stored inside the authentication state
interface InitialState {
  // Contains the logged-in user
  // null means nobody is currently logged in
  user: null | TUser;

  // Stores the JWT authentication token
  // null means there is currently no token
  token: null | string;
}


// ================= INITIAL STATE =================

// When the application first starts,
// there is no logged-in user or token
const initialState: InitialState = {
  user: null,
  token: null,
};


// ================= AUTH SLICE =================

// Create the Redux slice responsible for authentication
const authSlice = createSlice({
  // Name of this section of Redux state
  name: 'auth',

  // Starting values
  initialState,

  // Functions that are allowed to change the auth state
  reducers: {

    // ================= LOGIN =================

    // Runs when a user successfully logs in
    loginUser: (
      state,

      // The action must contain:
      // - token: JWT received from backend
      // - user: decoded/logged-in user information
      action: PayloadAction<{ token: string; user: TUser }>
    ) => {
      // Save the user in Redux
      state.user = action.payload.user;

      // Save their authentication token
      state.token = action.payload.token;
    },


    // ================= LOGOUT =================

    // Runs when the user logs out
    logoutUser: (state) => {
      // Remove the logged-in user
      state.user = null;

      // Remove the authentication token
      state.token = null;
    },
  },
});


// Export the actions created automatically by createSlice
// These can be used with dispatch()
export const {
  loginUser,
  logoutUser,
} = authSlice.actions;


// Export the reducer so it can be added to the Redux store
export default authSlice.reducer;


// ================= SELECTORS =================

// Get the currently logged-in user from Redux
export const getCurrentUser = (state: RootState) =>
  state.auth.user;


// Get the current authentication token from Redux
export const getCurrentToken = (state: RootState) =>
  state.auth.token;