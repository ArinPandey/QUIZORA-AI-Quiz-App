import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizQuestions: [],
    loading: false,
    error: null, // Add the error state
};

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        setQuizQuestions(state, action) {
            state.quizQuestions = action.payload;
            state.error = null; // Clear error on success
        },
        setQuizLoading(state, action) {
            state.loading = action.payload;
        },
        setQuizError(state, action) { // Add a new reducer for errors
            state.error = action.payload;
        },
    },
});

export const { setQuizQuestions, setQuizLoading, setQuizError } = quizSlice.actions;
export default quizSlice.reducer;