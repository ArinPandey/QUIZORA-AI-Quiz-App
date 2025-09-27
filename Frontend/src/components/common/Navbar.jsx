import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BrainCircuit, LogOut } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../operations/authAPI';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > window.innerHeight);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`backdrop-blur-md sticky top-0 z-50 transition-all duration-300 ${
            isScrolled 
                ? 'bg-white/95 border-b border-gray-200 shadow-sm' 
                : 'bg-white/10 border-b border-white/20'
        }`}>
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                
                <Link to="/" className={`flex items-center space-x-2 text-xl font-bold transition-colors duration-300 ${
                    isScrolled ? 'text-gray-800' : 'text-white'
                }`}>
                    <BrainCircuit className={`h-7 w-7 transition-colors duration-300 ${
                        isScrolled ? 'text-indigo-600' : 'text-white'
                    }`} />
                    <span>Quizora</span>
                </Link>
                
                <div className="flex items-center space-x-4 md:space-x-6">
                    <NavLink 
                        to="/quiz" 
                        className={({ isActive }) => 
                            `transition-colors duration-300 ${
                                isScrolled 
                                    ? `text-gray-600 hover:text-indigo-600 ${isActive ? 'text-indigo-600 font-semibold' : ''}` 
                                    : `text-white/80 hover:text-white ${isActive ? 'text-white font-semibold' : ''}`
                            }`
                        }
                    >
                        Quiz
                    </NavLink>
                    
                    {token === null ? (
                        <>
                            <NavLink 
                                to="/login" 
                                className={({ isActive }) => 
                                    `transition-colors duration-300 ${
                                        isScrolled 
                                            ? `text-gray-600 hover:text-indigo-600 ${isActive ? 'text-indigo-600 font-semibold' : ''}` 
                                            : `text-white/80 hover:text-white ${isActive ? 'text-white font-semibold' : ''}`
                                    }`
                                }
                            >
                                Login
                            </NavLink>
                            <NavLink 
                                to="/signup" 
                                className={`px-5 py-2 rounded-md font-semibold transition-all duration-300 ${
                                    isScrolled 
                                        ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                                        : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30'
                                }`}
                            >
                                Sign Up
                            </NavLink>
                        </>
                    ) : (
                        <button
                            onClick={() => dispatch(logout(navigate))}
                            className={`flex items-center space-x-2 px-5 py-2 rounded-md font-semibold transition-all duration-300 ${
                                isScrolled 
                                    ? 'bg-red-500 text-white hover:bg-red-600' 
                                    : 'bg-red-500/80 text-white hover:bg-red-500 backdrop-blur-sm border border-red-400/30'
                            }`}
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;

