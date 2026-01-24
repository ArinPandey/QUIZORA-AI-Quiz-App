import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; // Added Link
import { login } from '../operations/authAPI';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password, navigate));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-200 to-blue-100 flex items-center justify-center p-4 relative mt-[-34px]">
            {/* Decorative Orbs */}
            {/*<div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>*/}
            
            <div className="relative w-full max-w-md p-8 space-y-6 bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
                    <p className="text-gray-600">Sign in to continue to Quizora.</p>
                </div>

                <form onSubmit={handleOnSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            required
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleOnChange}
                            placeholder="Email Address"
                            className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                        />
                    </div>

                    <div className="relative">
                        <input
                            required
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleOnChange}
                            placeholder="Password"
                            className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                        />
                        {/* --- ADDED FORGOT PASSWORD LINK --- */}
                        <div className="flex justify-end mt-2 px-1">
                            <Link 
                                to="/forgot-password" 
                                className="text-xs font-medium text-indigo-700 hover:text-purple-700 transition-colors duration-200"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-3 font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                    >
                        Sign In
                    </button>
                </form>

                <div className="text-center pt-2">
                    <p className="text-gray-600 text-sm">
                        Don't have an account?{' '}
                        <button
                            onClick={() => navigate('/signup')}
                            className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-300 cursor-pointer"
                        >
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;



// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { login } from '../operations/authAPI';

// const LoginPage = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//     });

//     const { email, password } = formData;

//     const handleOnChange = (e) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             [e.target.name]: e.target.value,
//         }));
//     };

//     const handleOnSubmit = (e) => {
//         e.preventDefault();
//         dispatch(login(email, password, navigate));
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-rose-300 via-pink-400 to-purple-400 flex items-center justify-center p-4 relative mt-[-28px]">
//             <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
//             <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
            
//             <div className="relative w-full max-w-md p-8 space-y-6 bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
//                 <div className="text-center">
//                     <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
//                     <p className="text-gray-600">Sign in to continue to Quizora.</p>
//                 </div>

//                 <form onSubmit={handleOnSubmit} className="space-y-6">
//                     <div className="relative">
//                         <input
//                             required
//                             type="email"
//                             name="email"
//                             value={email}
//                             onChange={handleOnChange}
//                             placeholder="Email Address"
//                             className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
//                         />
//                     </div>

//                     <div className="relative">
//                         <input
//                             required
//                             type="password"
//                             name="password"
//                             value={password}
//                             onChange={handleOnChange}
//                             placeholder="Password"
//                             className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         className="w-full px-4 py-3 font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
//                     >
//                         Sign In
//                     </button>
//                 </form>

//                 <div className="text-center pt-4">
//                     <p className="text-gray-600">
//                         Don't have an account?{' '}
//                         <button
//                             onClick={() => navigate('/signup')}
//                             className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-300"
//                         >
//                             Sign Up
//                         </button>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;

