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
        <div className="min-h-screen bg-gradient-to-b from-orange-300 via-orange-100 to-orange-50 flex items-center justify-center p-4">
            <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
                <div className="mb-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                        <Lock className="w-6 h-6 text-orange-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Set New Password</h2>
                    <p className="text-gray-500 text-sm mt-2">Almost there! Choose a strong new password.</p>
                </div>

                <form onSubmit={handleReset} className="space-y-6">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">New Password</label>
                        <input
                            type="password"
                            placeholder="Min. 8 characters"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-all shadow-lg transform hover:scale-[1.01] active:scale-[0.98] cursor-pointer">
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;