import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizQuestions: [],
    loading: false,
};

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        setQuizQuestions(state, action) {
            state.quizQuestions = action.payload;
        },
        setQuizLoading(state, action) {
            state.loading = action.payload;
        },
    },
});

export const { setQuizQuestions, setQuizLoading } = quizSlice.actions;
export default quizSlice.reducer;
