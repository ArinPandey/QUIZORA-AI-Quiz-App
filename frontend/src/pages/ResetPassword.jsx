import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Lock as LockIcon, ShieldCheck, Eye, EyeOff, ArrowLeft } from "lucide-react"; 

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    
    // States for password visibility and data
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });

    const { password, confirmPassword } = formData;

    const handleOnChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleReset = async (e) => {
        e.preventDefault();

        // 1. Check if passwords match
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match!");
        }

        // 2. Enforce security constraints (6+ chars, 1 Upper, 1 Lower, 1 Special)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
        if (!passwordRegex.test(password)) {
            return toast.error("Password must be 6+ chars with uppercase, lowercase, & special char.");
        }

        try {
            const res = await axios.post("https://quizora-ai-quiz-app18.onrender.com/api/auth/reset-password", { 
                token, 
                password 
            });
            
            if (res.data.success) {
                toast.success("Password updated successfully!");
                navigate("/login");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Reset failed. Link may be expired.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-400 via-orange-300 to-amber-200 flex items-center justify-center p-4 mt-[-36px]">
            <div className="w-full max-w-md p-8 bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 relative overflow-hidden">
                
                {/* Back to Login Link */}
                <button 
                    onClick={() => navigate('/login')}
                    className="absolute top-6 left-6 text-gray-800 hover:text-gray-900 transition-colors cursor-pointer"
                >
                    <ArrowLeft size={20} />
                </button>

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/30 rounded-full mb-4 shadow-inner">
                        <ShieldCheck className="w-8 h-8 text-gray-800" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-800 tracking-tight">Secure Account</h2>
                    <p className="text-gray-700 text-sm mt-2 font-medium">Create a strong new password for your account.</p>
                </div>

                <form onSubmit={handleReset} className="space-y-5">
                    {/* New Password Input */}
                    <div className="relative">
                        <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={handleOnChange}
                            placeholder="New Password"
                            className="w-full pl-12 pr-12 py-4 bg-white/40 border border-white/40 rounded-2xl text-gray-900 placeholder-gray-600 outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {/* Confirm Password Input */}
                    <div className="relative">
                        <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                        <input
                            required
                            type="password" // Usually keep this hidden to prevent over-the-shoulder peeking
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleOnChange}
                            placeholder="Confirm Password"
                            className="w-full pl-12 pr-4 py-4 bg-white/40 border border-white/40 rounded-2xl text-gray-900 placeholder-gray-600 outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-lg transform hover:scale-[1.02] active:scale-95 cursor-pointer"
                    >
                        Update Password
                    </button>
                </form>

            </div>
        </div>
    );
};

export default ResetPassword;




// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { ShieldCheck } from "lucide-react"; 

// const ResetPassword = () => {
//     const { token } = useParams();
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const handleReset = async (e) => {
//         e.preventDefault();
        
//         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
//         if (!passwordRegex.test(password)) {
//             return toast.error("Password must be 6+ chars with uppercase, lowercase, & special char.");
//         }

//         try {
//             const res = await axios.post("https://quizora-ai-quiz-app18.onrender.com/api/auth/reset-password", { token, password });
//             if (res.data.success) {
//                 toast.success("Password updated! Log in now.");
//                 navigate("/login");
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Reset failed. Token may have expired.");
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-orange-300 via-orange-100 to-orange-50 flex items-center justify-center p-4 relative mt-[-32px]">
//             <div className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/40">
//                 <div className="mb-8 text-center">
//                     <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/10 rounded-full mb-4">
//                         <ShieldCheck className="w-8 h-8 text-orange-600" /> 
//                     </div>
//                     <h2 className="text-3xl font-bold text-gray-800">New Password</h2>
//                     <p className="text-gray-500 text-sm mt-2">Enter your secure new credentials below.</p>
//                 </div>

//                 <form onSubmit={handleReset} className="space-y-6">
//                     <div className="relative">
//                         <input
//                             type="password"
//                             placeholder="6+ chars (e.g., Quiz@123)"
//                             className="w-full bg-white/50 border border-gray-200 rounded-2xl py-4 px-5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all shadow-sm"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
                    
//                     <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg transform hover:scale-[1.02] active:scale-95 cursor-pointer">
//                         Secure My Account
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ResetPassword;