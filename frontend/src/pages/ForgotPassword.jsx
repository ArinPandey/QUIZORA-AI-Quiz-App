import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("https://quizora-ai-quiz-app18.onrender.com/api/auth/forgot-password", { email });
            if (res.data.success) {
                toast.success("Check your email for the reset link!");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send reset link");
        } finally {
            setLoading(false);
        }
    };

    return (
       <div className="min-h-screen bg-gradient-to-b from-orange-300 via-orange-100 to-orange-50 flex items-center justify-center p-4 mt-[-28px]">
            {/* Minimal Card Design */}
            <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/20">
                <Link to="/login" className="flex items-center text-gray-500 hover:text-orange-600 mb-6 transition-colors text-sm font-medium">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Login
                </Link>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
                <p className="text-gray-600 mb-8 text-sm">No worries! Enter your email and we'll send you a recovery link.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                                placeholder="example@domain.com"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-all shadow-lg disabled:opacity-50 transform hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                    >
                        {loading ? "Sending link..." : "Send Reset Link"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;