import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { isNavbarMenuOpen: false }, // 1. Tracks the dropdown state globally
  reducers: {
    setNavbarMenuOpen: (state, action) => {
      state.isNavbarMenuOpen = action.payload; // 2. Updates the state based on user interaction
    },
  },
});

export const { setNavbarMenuOpen } = uiSlice.actions;
export default uiSlice.reducer;