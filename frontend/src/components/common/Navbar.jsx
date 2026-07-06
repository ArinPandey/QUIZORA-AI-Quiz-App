import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BrainCircuit, LogOut, ChevronDown, FileText, Zap, Menu, X} from 'lucide-react'; 
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../operations/authAPI';
import { setNavbarMenuOpen } from '../../redux/slices/uiSlice';

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.auth);
    const isNavbarMenuOpen = useSelector((state) => state.ui?.isNavbarMenuOpen); // Read from state
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef();

    // Scroll effect (Kept identical)
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Click outside handler (Kept identical)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleMobileMenu = () => dispatch(setNavbarMenuOpen(!isNavbarMenuOpen)); // Dispatch to state

    return (
        <header className={`backdrop-blur-md sticky top-1 rounded-3xl z-50 transition-all duration-300 ${
            isScrolled ? 'bg-teal-50 border-b border-gray-200 shadow-sm' : 'bg-white/10 border-b border-white/20'
        }`}>
            <nav className="w-full px-3 sm:px-6 py-3 flex justify-between items-center">
                
                {/* Left Section: Logo */}
                <Link to="/" className={`flex items-center space-x-2 text-xl font-bold transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                    <BrainCircuit className="h-7 w-7 text-indigo-400" />
                    <span>Quizora</span>
                </Link>

                {/* --- MOBILE HAMBURGER BUTTON --- */}
                <button 
                    className="md:hidden p-2 text-gray-800"
                    onClick={toggleMobileMenu}
                >
                    {isNavbarMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Center Section: Desktop Greeting Pill (Hidden on Mobile) */}
                <div className="hidden md:flex flex-grow justify-center relative" ref={menuRef}>
                    {token && user && (
                        <>
                            <button 
                                onClick={toggleMenu}
                                className={`flex items-center space-x-2 text-base font-medium px-5 py-2 rounded-full cursor-pointer border shadow-sm transition-all ${
                                    isScrolled ? 'text-gray-700 bg-orange-300 border-orange-100' : 'text-black bg-white/10 border-white/20'
                                }`}
                            >
                                <span>Hi, <span className="text-black font-bold">{user.firstName}</span>!</span>
                                <ChevronDown size={14} className={`transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isMenuOpen && (
                                <div className="absolute top-full mt-3 w-60 h-28 bg-white/80 rounded-xl shadow-xl border border-gray-100 py-2 cursor-pointer">
                                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">
                                        <FileText size={16} className="mr-3" /> PDF Quiz
                                    </Link>
                                    <Link to="/instant-quiz" onClick={() => setIsMenuOpen(false)} className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 border-t border-gray-50">
                                        <Zap size={16} className="mr-3 " /> Instant Quiz
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
                
                {/* Right Section: Desktop Links (Hidden on Mobile) */}
                <div className="hidden md:flex items-center space-x-6">
                    {token === null ? (
                        <>
                            <NavLink to="/quiz" className={({ isActive }) => `text-lg transition-colors ${isScrolled ? 'text-rose-900 bg-clip-text' : 'text-rose-600 bg-clip-text'} ${isActive ? 'bg-gradient-to-r from-teal-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text font-semibold' : ''}`}>Try Me</NavLink>
                            <NavLink to="/login" className={({ isActive }) => `text-lg transition-colors ${isScrolled ? 'text-rose-900' : 'text-rose-600'} ${isActive ? 'text-rose-600 font-semibold' : ''}`}>Login</NavLink>
                            <NavLink to="/signup" className={`px-5 py-2 rounded-md text-sm font-semibold ${isScrolled ? 'bg-indigo-600 text-white' : 'bg-white/20 text-white'}`}>Sign Up</NavLink>
                        </>
                    ) : (
                        <button onClick={() => dispatch(logout(navigate))} className="flex items-center space-x-2 px-5 py-2 rounded-md text-sm font-semibold bg-gradient-to-tr from-[#22c55e] via-[#0e7490] to-[#3b82f6] text-white hover:bg-gradient-to-bl from-[#84cc16] via-[#16a34a] to-[#0f766e] transition-all cursor-pointer">
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    )}
                </div>
            </nav>

            {/* --- MOBILE DROPDOWN MENU --- */}
            {/* This only renders if the hamburger menu is clicked */}
            <div className={`md:hidden absolute top-full left-0 w-full bg-white/80 shadow-xl rounded-b-3xl transition-all duration-300 overflow-hidden ${isNavbarMenuOpen ? 'max-h-96 py-4' : 'max-h-0 py-0'}`}>
                {token && user ? (
                    <div className="flex flex-col space-y-4 px-6">
                        <span className="text-gray-500 text-sm font-semibold uppercase tracking-widest border-b pb-2">Hi, {user.firstName}</span>
                        <Link to="/dashboard" onClick={toggleMobileMenu} className="flex items-center text-gray-800 font-bold hover:text-orange-500 py-2"><FileText size={18} className="mr-3"/> PDF Quiz</Link>
                        <Link to="/instant-quiz" onClick={toggleMobileMenu} className="flex items-center text-gray-800 font-bold hover:text-orange-500 py-2"><Zap size={18} className="mr-3"/> Instant Quiz</Link>
                        <button onClick={() => { toggleMobileMenu(); dispatch(logout(navigate)); }} className="flex items-center text-red-500 font-bold cursor-pointer py-2 mt-4"><LogOut size={18} className="mr-3"/> Logout</button>
                    </div>
                ) : (
                    <div className="flex flex-col space-y-4 px-6">
                        <Link to="/quiz" onClick={toggleMobileMenu} className="text-gray-800 font-bold hover:text-rose-500 py-2">Try Me</Link>
                        <Link to="/login" onClick={toggleMobileMenu} className="text-gray-800 font-bold hover:text-rose-500 py-2">Login</Link>
                        <Link to="/signup" onClick={toggleMobileMenu} className="bg-indigo-600 text-white text-center rounded-lg font-bold py-3 mt-2">Sign Up</Link>
                    </div>
                )}
            </div>

        </header>
    );
};

export default Navbar;

// const Navbar = () => {
//   // Manages header transparency based on how far the user has scrolled.
//   const [isScrolled, setIsScrolled] = useState(false); 
  
//   // Controls whether the central "Hi, Name" dropdown menu is open or closed.
//   const isMenuOpen = useSelector((state) => state.ui.isNavbarMenuOpen);
  
//   // Accesses authentication token and user profile data from the Redux store.
//   const { token, user } = useSelector((state) => state.auth); 
  
//   // Sets up tools for triggering Redux actions and handling page navigation.
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Creates a reference to the dropdown container to detect clicks outside of it.
//   const menuRef = useRef(null); 

//   const toggleMenu = () => dispatch(setNavbarMenuOpen(!isMenuOpen));

//   // Automatically closes the dropdown menu if a user clicks anywhere else on the page.
//   useEffect(() => {
//     // const handleClickOutside = (event) => {
//     //   if (menuRef.current && !menuRef.current.contains(event.target)) setIsMenuOpen(false);
//     // };
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         dispatch(setNavbarMenuOpen(false));
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [dispatch]);

//   // Listens for window scrolling to update the Navbar background styling dynamically.
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 50);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     // The main header wrapper that changes color and border when the user scrolls.
//     <header className={`backdrop-blur-md sticky top-1 rounded-3xl z-50 transition-all duration-300 ${
//       isScrolled ? 'bg-teal-50 border-b border-gray-200 shadow-sm' : 'bg-white/10 border-b border-white/20'
//     }`}>
//       {/*The navigation container that aligns the logo, center menu, and right-side links. */}
//       <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        
//         {/* Left Section: Interactive Brand logo that links back to the landing page. */}
//         <Link to="/" className={`flex items-center space-x-2 text-xl font-bold transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
//           <BrainCircuit className="h-7 w-7 text-indigo-400" />
//           <span>Quizora</span>
//         </Link>

//         {/* Center Section: The personalized "Hi" pill that opens the quiz selection menu. */}
//         <div className="hidden md:flex flex-grow justify-center relative" ref={menuRef}>
//           {token && user && (
//             <>
//               {/* The button trigger for the dropdown, displaying the logged-in user's first name. */}
//               <button 
//                 onClick={toggleMenu}
//                 className={`flex items-center space-x-2 text-base font-medium px-5 py-2 rounded-full cursor-pointer border shadow-sm transition-all ${
//                   isScrolled ? 'text-gray-700 bg-orange-300 border-orange-100' : 'text-black bg-white/10 border-white/20'
//                 }`}
//               >
//                 <span>Hi, <span className="text-black font-bold">{user.firstName}</span>!</span>
//                 <ChevronDown size={14} className={`transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
//               </button>

//               {/* The actual dropdown list containing links to PDF Quiz and the new Instant Quiz features. */}
//               {isMenuOpen && (
//                 <div className="absolute top-full mt-3 w-60 h-28 bg-white/80 rounded-xl shadow-xl border border-gray-100 py-2 cursor-pointer">
//                   <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center mt-1/3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">
//                     <FileText size={16} className="mr-3" /> PDF Quiz
//                   </Link>
//                   <Link to="/instant-quiz" onClick={() => setIsMenuOpen(false)} className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 border-t border-gray-50">
//                     <Zap size={16} className="mr-3 " /> Instant Quiz
//                   </Link>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
        
//         {/*Right Section: Context-aware links for logging in, signing up, or logging out. */}
//         <div className="flex items-center space-x-6">
//           {token === null ? (
//             // Links shown to guests, including a highlighted "Sign Up" button.
//             <>
//               <NavLink to="/quiz" className={({ isActive }) => `text-lg transition-colors ${isScrolled ? 'text-rose-900 bg-clip-text' : 'text-rose-600 bg-clip-text'} ${isActive ? 'bg-gradient-to-r from-teal-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text font-semibold' : ''}`}>Try Me</NavLink>
//               <NavLink to="/login" className={({ isActive }) => `text-lg transition-colors ${isScrolled ? 'text-rose-900' : 'text-rose-600'} ${isActive ? 'text-rose-600 font-semibold' : ''}`}>Login</NavLink>
//               <NavLink to="/signup" className={`px-5 py-2 rounded-md text-sm font-semibold ${isScrolled ? 'bg-indigo-600 text-white' : 'bg-white/20 text-white'}`}>Sign Up</NavLink>
//             </>
//           ) : (
//             // The logout button that clears the user session and redirects to the home page.
//             <button onClick={() => dispatch(logout(navigate))} className="flex items-center space-x-2 px-5 py-2 rounded-md text-sm font-semibold bg-gradient-to-tr from-[#22c55e] via-[#0e7490] to-[#3b82f6] text-white hover:bg-gradient-to-bl from-[#84cc16] via-[#16a34a] to-[#0f766e] transition-all cursor-pointer">
//               <LogOut size={18} />
//               <span>Logout</span>
//             </button>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

