import { setQuizLoading, setQuizQuestions } from "../redux/slices/quizSlice";
import { apiConnector } from "../services/apiConnector";
import { endpoints } from "../services/apis";

// const { GENERATE_QUIZ_API } = endpoints; // We will add this to apis.js next

// export function generateQuiz(file, token, navigate) {
//     return async (dispatch) => {
//         dispatch(setQuizLoading(true));
//         try {
//             // We need to send form-data for file uploads
//             const formData = new FormData();
//             formData.append("pdfFile", file);

//             // Make the API call
//             const response = await apiConnector(
//                 "POST", 
//                 GENERATE_QUIZ_API, 
//                 formData, 
//                 {
//                     "Content-Type": "multipart/form-data",
//                     Authorization: `Bearer ${token}`, // Sending the auth token
//                 }
//             );

//             if (!response.data.success) {
//                 throw new Error(response.data.message);
//             }

//             // Save the AI-generated questions to the Redux store
//             dispatch(setQuizQuestions(response.data.quiz));
            
//             // Navigate to the quiz page
//             navigate("/quiz");

//         } catch (error) {
//             console.log("GENERATE QUIZ API ERROR............", error);
//             alert("Could not generate quiz. Please try again.");
//         }
//         dispatch(setQuizLoading(false));
//     };
// }



const { GENERATE_QUIZ_API } = endpoints;

// Notice: We have removed the 'token' parameter from this function.
// The smart apiConnector will handle it automatically.
export function generateQuiz(file, navigate) {
    return async (dispatch) => {
        dispatch(setQuizLoading(true));
        try {
            const formData = new FormData();
            formData.append("pdfFile", file);

            // The API call is now cleaner. We don't need to pass headers manually.
            const response = await apiConnector(
                "POST", 
                GENERATE_QUIZ_API, 
                formData
            );

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setQuizQuestions(response.data.quiz));
            navigate("/quiz");

        } catch (error) {
            console.log("GENERATE QUIZ API ERROR............", error);
            alert("Could not generate quiz. Please try again.");
        }
        dispatch(setQuizLoading(false));
    };
}

