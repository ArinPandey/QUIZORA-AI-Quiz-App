import { setQuizLoading, setQuizQuestions } from "../redux/slices/quizSlice";
import { apiConnector } from "../services/apiConnector";
import { endpoints } from "../services/apis";

const { GENERATE_QUIZ_API } = endpoints;

export function generateQuiz(file, token) {
  return async (dispatch) => {
    dispatch(setQuizLoading(true));
    try {
      const formData = new FormData();
      formData.append("pdfFile", file);

      const response = await apiConnector(
        "POST",
        GENERATE_QUIZ_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setQuizQuestions(response.data.quiz));
    } catch (error) {
      console.log("GENERATE QUIZ API ERROR............", error);
      alert("Could not generate quiz. Please try again.");
    }
    dispatch(setQuizLoading(false));
  };
}

