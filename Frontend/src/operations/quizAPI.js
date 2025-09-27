import { setQuizLoading, setQuizQuestions, setQuizError } from '../../redux/slices/quizSlice'; // Import setQuizError
import { apiConnector } from '../apiConnector';
import { endpoints } from '../apis';

const { GENERATE_QUIZ_API } = endpoints;

export function generateQuiz(file, navigate) {
    return async (dispatch) => {
        dispatch(setQuizLoading(true));
        dispatch(setQuizError(null)); // Clear previous errors
        try {
            const formData = new FormData();
            formData.append("pdfFile", file);

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
            const errorMessage = error.response?.data?.message || "Could not generate quiz. Please try again later.";
            console.log("GENERATE QUIZ API ERROR............", error);
            // Instead of an alert, we now set the error in our Redux store
            dispatch(setQuizError(errorMessage));
        }
        dispatch(setQuizLoading(false));
    };
}