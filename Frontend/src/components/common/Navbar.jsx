// import React from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import { BrainCircuit } from 'lucide-react';

// const Navbar = () => {
//   return (
//     <header className="bg-white shadow-sm sticky top-0 z-50">
//       <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        
//         {/* App Logo and Title, links to homepage */}
//         <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-800">
//           <BrainCircuit className="text-indigo-600 h-7 w-7" />
//           <span>Quizora</span>
//         </Link>

//         {/* Main Navigation Links */}
//         <div className="flex items-center space-x-4 md:space-x-6">
//           <NavLink 
//             to="/quiz" 
//             className={({ isActive }) => 
//               `text-gray-600 hover:text-indigo-600 transition-colors duration-200 ${isActive ? 'text-indigo-600 font-semibold' : ''}`
//             }
//           >
//             Quiz
//           </NavLink>
//           <NavLink 
//             to="/login" 
//             className={({ isActive }) => 
//               `text-gray-600 hover:text-indigo-600 transition-colors duration-200 ${isActive ? 'text-indigo-600 font-semibold' : ''}`
//             }
//           >
//             Login
//           </NavLink>
//           <NavLink 
//             to="/signup" 
//             className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 font-semibold"
//           >
//             Sign Up
//           </NavLink>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Change navbar style when scrolled past the first screen (viewport height)
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
        
        {/* App Logo and Title, links to homepage */}
        <Link to="/" className={`flex items-center space-x-2 text-xl font-bold transition-colors duration-300 ${
          isScrolled ? 'text-gray-800' : 'text-white'
        }`}>
          <BrainCircuit className={`h-7 w-7 transition-colors duration-300 ${
            isScrolled ? 'text-indigo-600' : 'text-white'
          }`} />
          <span>Quizora</span>
        </Link>
        
        {/* Main Navigation Links */}
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
        </div>
      </nav>
    </header>
  );
};

export default Navbar;