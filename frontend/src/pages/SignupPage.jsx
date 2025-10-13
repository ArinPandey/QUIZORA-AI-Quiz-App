import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../operations/authAPI';

const SignupPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Form data ke liye state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const { firstName, lastName, email, password } = formData;

    // Form input change ko handle karne ke liye function
    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    // Form submit ko handle karne ke liye function
    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(signup(firstName, lastName, email, password, navigate));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-300 via-pink-400 to-purple-400 flex items-center justify-center p-4 relative mt-[-28px]">
            {/* Background overlay for better contrast */}
            <div className="absolute inset-0 bg-opacity-20"></div>
            
            {/* Animated background elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
            <div className="absolute -bottom-10 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
            
            {/* Main form container */}
            <div className="relative w-full max-w-md p-8 space-y-6 bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Your Account</h1>
                    <p className="text-gray-600">Join Quizora and start your learning journey!</p>
                </div>

                <form onSubmit={handleOnSubmit} className="space-y-6">
                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                        <div className="relative">
                            <input
                                required
                                type="text"
                                name="firstName"
                                value={firstName}
                                onChange={handleOnChange}
                                placeholder="First Name"
                                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                            />
                        </div>
                        <div className="relative">
                            <input
                                required
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={handleOnChange}
                                placeholder="Last Name"
                                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                            />
                        </div>
                    </div>

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
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-3 font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Optional: Add login link */}
                <div className="text-center pt-4">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <button
                            onClick={() => navigate('/login')}
                            className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-300"
                        >
                            Sign In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;