import { createSlice } from "@reduxjs/toolkit";

// Initial state define kar rahe hain.
// Hum localStorage se check kar rahe hain taaki page refresh par login state na jaaye.
const initialState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    
    // Reducers woh functions hain jo state ko update karte hain
    reducers: {
        setToken(state, value) {
            state.token = value.payload;
        },
        setUser(state, value) {
            state.user = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        }
    }
});

// Actions ko export kar rahe hain taaki hum inhe components mein use kar sakein
export const { setToken, setUser, setLoading } = authSlice.actions;

// Reducer ko export kar rahe hain taaki store mein add kar sakein
export default authSlice.reducer;
