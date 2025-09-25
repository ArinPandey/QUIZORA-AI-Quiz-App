// Ye component aapki app ka welcome page hai. Ismein ek cool typing effect bhi hai, jiske liye aapne ek custom hook (useTypingEffect) banaya hai. 
// Let's break it down!

// Custom hooks ek powerful feature hai. Ye aapko stateful logic ko components ke beech reuse karne dete hain. Aapka useTypingEffect iska ek perfect 
// example hai.

import React, { useState, useEffect } from 'react';
import { ChevronRight, BookOpen } from 'lucide-react';

// -- Custom Hook: useTypingEffect --
// Custom hooks aapko reusable logic banane dete hain jise aap alag-alag components mein use kar sakte hain.
// Iska naam hamesha 'use' se shuru hona chahiye.
const useTypingEffect = (textToType, interKeyStrokeDurationInMs) => {
  // `useState` hook text ki current typing position ko track karne ke liye.
  const [currentPosition, setCurrentPosition] = useState(0);
  
  // `useEffect` hook side effects (jaise timers, API calls) manage karne ke liye.
  useEffect(() => {
    // `setInterval` har thodi der mein `currentPosition` ko 1 se badhata hai, jisse typing effect banta hai.
    const intervalId = setInterval(() => {
      setCurrentPosition((value) => value + 1);
    }, interKeyStrokeDurationInMs);
    
    // -- Cleanup Function --
    // Ye function tab chalta hai jab component unmount hota hai (screen se hatt jaata hai).
    // Isse memory leaks nahi hote. Yahan hum interval ko clear kar rahe hain. Bahut important hai!
    return () => {
      clearInterval(intervalId);
    };
    // Dependency array `[]` mein `interKeyStrokeDurationInMs` hai, matlab ye effect sirf tab re-run hoga jab ye prop change hoga.
  }, [interKeyStrokeDurationInMs]);

  // Hook, type ho chuka text return karta hai.
  return textToType.substring(0, currentPosition);
};

// StartScreen component. Ye bhi ek presentational component hai.
const StartScreen = ({ onStart, totalQuestions }) => {
  // -- Using the Custom Hook --
  // Yahan hum apne banaye hue custom hook ko use kar rahe hain.
  // Isse `typedTitle` variable mein har thodi der mein naya, lamba text aayega.
  const typedTitle = useTypingEffect("Welcome to the Knowledge Quiz!", 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Main container with fade-in animation */}
      <div className="w-full max-w-4xl mx-auto animate-fade-in">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Animated Text */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight mb-4">
              {/* Custom hook se mila `typedTitle` yahan render ho raha hai. */}
              {typedTitle}
              {/* Blinking cursor effect ke liye span */}
              <span className="text-indigo-600 animate-pulse">|</span>
            </h1>
            <p className="text-lg text-gray-600">
              Challenge your mind with questions spanning technology, history, science, and more. Are you ready to prove your mastery?
            </p>
          </div>

          {/* Right Column: Quiz details and start button */}
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto animate-fade-in-up">
            <div className="mb-6 text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Quiz Details</h2>
            </div>

            {/* Quiz ki details props se display ho rahi hain. */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <span className="text-gray-600">Total Questions:</span>
                <span className="font-semibold text-gray-900">{totalQuestions}</span>
              </div>
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <span className="text-gray-600">Time per question:</span>
                <span className="font-semibold text-gray-900">60 seconds</span>
              </div>
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <span className="text-gray-600">Categories:</span>
                <span className="font-semibold text-gray-900">Mixed</span>
              </div>
            </div>

            <button
              // Button click par parent (QuizApp) se mila `onStart` function call hoga.
              onClick={onStart}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Start Quiz</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
