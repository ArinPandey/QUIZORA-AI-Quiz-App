import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Check localStorage to see if a token already exists to keep the user logged in
  token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
  // ADD THIS: Check localStorage for user data on initialization
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    // This action will be called when a user logs in successfully
    setToken(state, action) {
      state.token = action.payload;
      // Save the token to localStorage
      localStorage.setItem('token', JSON.stringify(action.payload));
    },
    // ADD THIS: Action to set user data
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    // This action will be called when a user logs out
    clearToken(state) {
      state.token = null;
      state.user = null; // Clear user data on logout
      // Remove the token from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user'); // Remove user from storage
    },
  },
});

export const { setToken,setUser, clearToken } = authSlice.actions;
export default authSlice.reducer;