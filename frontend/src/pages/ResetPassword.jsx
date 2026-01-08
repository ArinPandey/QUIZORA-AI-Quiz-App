import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://quizora-ai-quiz-app18.onrender.com/api/auth/reset-password", { token, password });
            if (res.data.success) {
                toast.success("Password reset successfully!");
                navigate("/login");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-slate-900 text-white">
            <form onSubmit={handleReset} className="bg-slate-800 p-8 rounded-lg shadow-xl w-96">
                <h2 className="text-2xl font-bold mb-4">Set New Password</h2>
                <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full p-2 mb-4 bg-slate-700 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700">
                    Update Password
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;