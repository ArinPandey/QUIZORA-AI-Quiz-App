// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// // import QuizApp from './components/Quiz/QuizApp';
// import './index.css';

// function App() {
//   return (
//     <div className="App">
//       <QuizApp />
//     </div>
//   );
// }

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '/src/components/common/Navbar.jsx';
import LandingPage from '/src/pages/LandingPage.jsx';
import QuizPage from '/src/pages/QuizPage.jsx';
import Footer from "./components/common/Footer.jsx";
import SignupPage from './pages/SignupPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ProtectedRoute from './components/core/ProtectedRoute.jsx';


function App() {
  return ( 
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Route for Dashboard */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
