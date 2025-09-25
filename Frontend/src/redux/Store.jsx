import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import quizReducer from "./slices/quizSlice"; 

const store = configureStore({
    reducer: {
        auth: authReducer,
        quiz: quizReducer, 
    }
});

export default store;


// Redux Ki Zaroorat Kyun Hai?
// Sochiye, jab user login kar leta hai, toh uski information (user object) aur uska access card (token) humein poori 
// application mein har jagah chahiye ho sakti hai:

// Navbar mein: "Welcome, Arin!" dikhane ke liye.

// Profile Page par: User ki details dikhane ke liye.

// Quiz Page par: Quiz result save karte waqt token bhejne ke liye.

// Is "global" data ko har component tak manually props ke through bhejna (prop drilling) bahut mushkil hai. 
// Redux ek central "locker" ya "godown" ki tarah kaam karta hai, jahan hum user ka data aur token save kar dete hain. 
// Phir, app ka koi bhi component seedha is locker se data nikaal sakta hai.