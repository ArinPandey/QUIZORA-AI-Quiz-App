import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BrainCircuit, LogOut, ChevronDown, FileText, Zap } from 'lucide-react'; 
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../operations/authAPI';
import { setNavbarMenuOpen } from '../../redux/slices/uiSlice';

const Navbar = () => {
  // 1. Manages header transparency based on how far the user has scrolled.
  const [isScrolled, setIsScrolled] = useState(false); 
  
  // 2. Controls whether the central "Hi, Name" dropdown menu is open or closed.
  const isMenuOpen = useSelector((state) => state.ui.isNavbarMenuOpen);
  
  // 3. Accesses authentication token and user profile data from the Redux store.
  const { token, user } = useSelector((state) => state.auth); 
  
  // 4. Sets up tools for triggering Redux actions and handling page navigation.
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 5. Creates a reference to the dropdown container to detect clicks outside of it.
  const menuRef = useRef(null); 

  const toggleMenu = () => dispatch(setNavbarMenuOpen(!isMenuOpen));

  // 6. Automatically closes the dropdown menu if a user clicks anywhere else on the page.
  useEffect(() => {
    // const handleClickOutside = (event) => {
    //   if (menuRef.current && !menuRef.current.contains(event.target)) setIsMenuOpen(false);
    // };
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        dispatch(setNavbarMenuOpen(false));
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dispatch]);

  // 7. Listens for window scrolling to update the Navbar background styling dynamically.
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // 8. The main header wrapper that changes color and border when the user scrolls.
    <header className={`backdrop-blur-md sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 border-b border-gray-200 shadow-sm' : 'bg-white/10 border-b border-white/20'
    }`}>
      {/* 9. The navigation container that aligns the logo, center menu, and right-side links. */}
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* 10. Left Section: Interactive Brand logo that links back to the landing page. */}
        <Link to="/" className={`flex items-center space-x-2 text-xl font-bold transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
          <BrainCircuit className="h-7 w-7 text-indigo-400" />
          <span>Quizora</span>
        </Link>

        {/* 11. Center Section: The personalized "Hi" pill that opens the quiz selection menu. */}
        <div className="hidden md:flex flex-grow justify-center relative" ref={menuRef}>
          {token && user && (
            <>
              {/* 12. The button trigger for the dropdown, displaying the logged-in user's first name. */}
              <button 
                onClick={toggleMenu}
                className={`flex items-center space-x-2 text-base font-medium px-5 py-2 rounded-full border shadow-sm transition-all ${
                  isScrolled ? 'text-gray-700 bg-orange-300 border-orange-100' : 'text-black bg-white/10 border-white/20'
                }`}
              >
                <span>Hi, <span className="text-black font-bold">{user.firstName}</span>!</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* 13. The actual dropdown list containing links to PDF Quiz and the new Instant Quiz features. */}
              {isMenuOpen && (
                <div className="absolute top-full mt-3 w-60 h-28 bg-white/80 rounded-xl shadow-xl border border-gray-100 py-2">
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center mt-1/3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">
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
        
        {/* 14. Right Section: Context-aware links for logging in, signing up, or logging out. */}
        <div className="flex items-center space-x-6">
          {token === null ? (
            // 15. Links shown to guests, including a highlighted "Sign Up" button.
            <>
              <NavLink to="/quiz" className={({ isActive }) => `text-sm transition-colors ${isScrolled ? 'text-gray-600' : 'text-gray-300'} ${isActive ? 'text-indigo-400 font-semibold' : ''}`}>Try Me</NavLink>
              <NavLink to="/login" className={({ isActive }) => `text-sm transition-colors ${isScrolled ? 'text-gray-600' : 'text-gray-300'} ${isActive ? 'text-indigo-400 font-semibold' : ''}`}>Login</NavLink>
              <NavLink to="/signup" className={`px-5 py-2 rounded-md text-sm font-semibold ${isScrolled ? 'bg-indigo-600 text-white' : 'bg-white/20 text-white'}`}>Sign Up</NavLink>
            </>
          ) : (
            // 16. The logout button that clears the user session and redirects to the home page.
            <button onClick={() => dispatch(logout(navigate))} className="flex items-center space-x-2 px-5 py-2 rounded-md text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-all">
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



// import React, { useState, useEffect } from 'react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { BrainCircuit, LogOut } from 'lucide-react';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../../operations/authAPI';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false); 
//   const { token, user } = useSelector((state) => state.auth);

//   // Get user data from profile slice to access firstName
//   // const { user } = useSelector((state) => state.profile || {});
//   // const { user: profileUser } = useSelector((state) => state.profile || {});
//   // Use whichever one contains the data
//   // const user = profileUser || authUser;

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout(navigate));
//   };
  
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       setIsScrolled(scrollPosition > 50);
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
  
//   return (
//     <header className={`backdrop-blur-md sticky top-0 z-50 transition-all duration-300 ${
//       isScrolled 
//         ? 'bg-white/95 border-b border-gray-200 shadow-sm' 
//         : 'bg-white/10 border-b border-white/20'
//     }`}>
//       <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        
//         {/* Brand/Logo */}
//         <Link 
//           to="/" 
//           className={`flex items-center space-x-2 text-xl font-bold transition-colors duration-300 ${
//             isScrolled ? 'text-gray-900' : 'text-white'
//           }`}
//         >
//           <BrainCircuit className="h-7 w-7 text-indigo-400" />
//           <span>Quizora</span>
//         </Link>

//         {/* --- NEW: Centered Greeting --- */}
//         <div className="hidden md:flex flex-grow justify-center">
//           {token && user?.firstName ? (
//             <div className={`text-sm font-medium px-4 py-1.5 rounded-full border shadow-sm transition-all duration-300 ${
//               isScrolled 
//                 ? 'text-gray-900 bg-orange-100 border-orange-300' 
//                 : 'text-gray-900 bg-white border-gray-300'
//             }`}>
//               Hi, <span className="text-orange-600 font-extrabold">{user.firstName}</span>! 👋
//             </div>
//           ) : token ? (
//             /* This will show if you are logged in but the name data is missing from Redux */
//             <div className="text-xs text-red-500 bg-white/50 px-2 rounded">
//               Token found, but User data missing in Redux
//             </div>
//           ) : null}
//         </div>
        
//         {/* Navigation Links */}
//         <div className="flex items-center space-x-6">
//           {token === null ? (
//             // User is Logged Out
//             <>
//               <NavLink 
//                 to="/quiz"
//                 className={({ isActive }) => `transition-colors duration-300 ${
//                   isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white'
//                 } ${isActive ? 'text-indigo-400 font-semibold' : ''}`}
//               >
//                 Try Me
//               </NavLink>
//               <NavLink 
//                 to="/login" 
//                 className={({ isActive }) => `px-5 py-2 rounded-md transition-colors duration-300 ${
//                   isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white'
//                 } ${isActive ? 'text-indigo-400 font-semibold' : ''}`}
//               >
//                 Login
//               </NavLink>
//               <NavLink 
//                 to="/signup" 
//                 className={`px-5 py-2 rounded-md font-semibold transition-all duration-300 ${
//                   isScrolled ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white/20 text-white hover:bg-white/30'
//                 }`}
//               >
//                 Sign Up
//               </NavLink>
//             </>
//           ) : (
//             // User is Logged In
//             <>
//               <NavLink 
//                 to="/dashboard"
//                 className={({ isActive }) => `transition-colors duration-300 ${
//                   isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white'
//                 } ${isActive ? 'text-indigo-400 font-semibold' : ''}`}
//               >
//                 Quiz
//               </NavLink>
//               <button
//                 onClick={handleLogout}
//                 className={`flex items-center space-x-2 px-5 py-2 rounded-md font-semibold transition-all duration-300 ${
//                   isScrolled ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-red-500/80 text-white hover:bg-red-500'
//                 }`}
//               >
//                 <LogOut size={18} />
//                 <span>Logout</span>
//               </button>
//             </>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;


