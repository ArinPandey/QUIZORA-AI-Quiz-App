import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlices.js';
import quizReducer from './slices/quizSlice';
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    quiz: quizReducer,
  },
});