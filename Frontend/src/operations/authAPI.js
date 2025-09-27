import { setLoading, setToken, setUser } from '../redux/slices/AuthSlice';
import { apiConnector } from "../services/apiConnector";
import { endpoints } from "../services/apis";

const { SIGNUP_API, LOGIN_API } = endpoints;

// Signup function
export function signup(firstName, lastName, email, password, navigate) {
    return async (dispatch) => {
        console.log("Signup action triggered"); // Debug log 1
        dispatch(setLoading(true));
        
        try {
            console.log("Making API request..."); // Debug log 2
            const response = await apiConnector("POST", SIGNUP_API, {
                firstName,
                lastName,
                email,
                password,
            });

            console.log("SIGNUP API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            alert("Signup Successful!");
            navigate("/login");

        } catch (error) {
            console.log("SIGNUP API ERROR............", error);
            alert("Signup Failed: " + (error.response?.data?.message || error.message));
        }
        dispatch(setLoading(false));
    };
}

// Login function
export function login(email, password, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            });

            console.log("LOGIN API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            alert("Login Successful!");

            // Token ko Redux store aur localStorage mein save karein
            dispatch(setToken(response.data.token));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            
            // <<< 2. Naye user data ko bhi Redux store aur localStorage mein save karein >>>
            // Ye line Redux store (the "computer screen") ko update karegi
            dispatch(setUser(response.data.user)); 
            // Ye line localStorage (the "notebook") ko update karegi
            localStorage.setItem("user", JSON.stringify(response.data.user));
            
            navigate("/dashboard");

        } catch (error) {
            console.log("LOGIN API ERROR............", error);
            alert("Login Failed: " + (error.response?.data?.message || error.message));
        }
        dispatch(setLoading(false));
    };
}


export function logout(navigate) {
    return (dispatch) => {
        // Step 1: Clear the Redux store
        // We set token and user to 'null'
        dispatch(setToken(null));
        dispatch(setUser(null));
        
        // Step 2: Clear localStorage
        // We remove the user's "Access Card" and data from their browser's memory
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        alert("Logged Out Successfully");
        
        // Step 3: Redirect to the homepage
        navigate("/");
    }
}
