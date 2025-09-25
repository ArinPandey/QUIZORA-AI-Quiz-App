import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, UserCheck, Trophy } from 'lucide-react';
import axios from 'axios';
// 1. Video file ka path
import heroVideo from '../assets/a_bit_longer_the_video_is_ama.mp4'; 

const LandingPage = () => {

  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);

useEffect(() => {
    // GSAP Animation Setup
    const setupScrollAnimation = () => {
      // Check if GSAP is loaded
      if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
        gsap.registerPlugin(ScrollTrigger);
        
        // Create the timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".video-section",
            start: "top top",
            end: "bottom top", 
            scrub: 2,
            pin: true,
          }
        });

        tl.to(".scroll-video", {
          scale: 1.8,
          ease: "power1.inOut"
        });
      }
    };

    // Load GSAP if not already loaded
    if (typeof gsap === 'undefined') {
      const gsapScript = document.createElement('script');
      gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js';
      gsapScript.onload = () => {
        const scrollTriggerScript = document.createElement('script');
        scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js';
        scrollTriggerScript.onload = setupScrollAnimation;
        document.head.appendChild(scrollTriggerScript);
      };
      document.head.appendChild(gsapScript);
    } else {
      setupScrollAnimation();
    }

    // Backend connection (keeping your original code)
    const fetchMessage = async () => {
      try {
        // Uncomment when you have backend ready
        // const response = await axios.get('/api');
        // console.log('✅ Backend Connection Successful:', response.data.message);
        console.log('✅ Backend Connection Ready');
      } catch (error) {
        console.error("❌ Backend Connection Failed:", error);
      }
    };

    fetchMessage();

    return () => {
      // Cleanup GSAP ScrollTriggers
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  return (
    <div className="bg-white text-gray-800 font-unbounded mt-[-20px]">
            {/* App Name Full Screen Section */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='65' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* App Name */}
        <div className="text-center z-10">
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-unbounded text-rose-300 tracking-wider transform hover:scale-105 transition-transform duration-500 select-none">
            QUIZORA
          </h1>
          <div className="mt-6 w-32 h-1 bg-gradient-to-r from-pink-400 to-purple-300 mx-auto rounded-full"></div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 opacity-80">Scroll down</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Scroll Animation Section */}
      <div 
        ref={videoContainerRef}
        className="video-section h-screen w-full bg-gradient-to-br from-white to-gray-400 flex items-center justify-center relative overflow-hidden"
      >
        {/* Video Element */}
        <video 
          ref={videoRef}
          className="scroll-video w-96 h-64 object-cover rounded-2xl shadow-2xl"
          style={{
            transformOrigin: 'center center',
            filter: 'brightness(0.9) contrast(1.1)'
          }}
          autoPlay
          loop
          muted
          playsInline
        >
          {/* Replace with your video source */}
          <source 
            src={heroVideo}
            type="video/mp4" 
          />
          {/* Fallback for browsers that don't support video */}
          <div className="w-96 h-64 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
            Video Preview
          </div>
        </video>
      </div>


      {/* Hero Section */}
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-white to-gray-400 p-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 animate-fade-in-down">
            Transform Documents into <span className="text-indigo-600">Knowledge</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 font-sans max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            Upload any PDF and let our AI create a personalized quiz for you. The smartest way to study, prepare, and master any subject.
          </p>
          <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <Link
              to="/quiz"
              className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 duration-300"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-white to-gray-400">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Unlock Your Learning Potential</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12 font-sans">
            QuizMestro is more than just a quiz app. It's a powerful tool designed to enhance your learning experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1: AI Quiz Generation */}
            <div className="p-8 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="bg-indigo-100 text-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <FileText size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3">AI Quiz Generation</h3>
              <p className="text-gray-600 font-sans">
                Our cutting-edge AI reads your PDFs, understands the context, and generates relevant questions in seconds.
              </p>
            </div>
            {/* Feature 2: User Profiles & Progress */}
            <div className="p-8 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="bg-indigo-100 text-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <UserCheck size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Track Your Progress</h3>
              <p className="text-gray-600 font-sans">
                Create a profile to save your quiz results, track your scores over time, and identify areas for improvement.
              </p>
            </div>
            {/* Feature 3: Leaderboards */}
            <div className="p-8 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="bg-indigo-100 text-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Trophy size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Compete & Conquer</h3>
              <p className="text-gray-600 font-sans">
                Challenge your friends, compete on leaderboards, and prove your mastery of the subject matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
//         .animate-fade-in-down {
//           animation: fadeInDown 1s ease-out;
//         }
        
//         .animate-fade-in-up {
//           animation: fadeInUp 1s ease-out;
//         }
        
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
        
//         @keyframes fadeInDown {
//           from {
//             opacity: 0;
//             transform: translateY(-30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-20px);
//           }
//         }
//       `}</style>

    </div>
  );
};

export default LandingPage;

// const LandingPage = () => {
//   const videoRef = useRef(null);
//   const videoContainerRef = useRef(null);

//   useEffect(() => {
//     // GSAP Animation Setup
//     const setupScrollAnimation = () => {
//       // Check if GSAP is loaded
//       if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
//         gsap.registerPlugin(ScrollTrigger);
        
//         // Create the timeline
//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: ".video-section",
//             start: "top top",
//             end: "bottom top", 
//             scrub: 2,
//             pin: true,
//           }
//         });

//         tl.to(".scroll-video", {
//           scale: 1.4,
//           ease: "power1.inOut"
//         });
//       }
//     };

//     // Load GSAP if not already loaded
//     if (typeof gsap === 'undefined') {
//       const gsapScript = document.createElement('script');
//       gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js';
//       gsapScript.onload = () => {
//         const scrollTriggerScript = document.createElement('script');
//         scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js';
//         scrollTriggerScript.onload = setupScrollAnimation;
//         document.head.appendChild(scrollTriggerScript);
//       };
//       document.head.appendChild(gsapScript);
//     } else {
//       setupScrollAnimation();
//     }

//     // Backend connection (keeping your original code)
//     const fetchMessage = async () => {
//       try {
//         // Uncomment when you have backend ready
//         // const response = await axios.get('/api');
//         // console.log('✅ Backend Connection Successful:', response.data.message);
//         console.log('✅ Backend Connection Ready');
//       } catch (error) {
//         console.error("❌ Backend Connection Failed:", error);
//       }
//     };

//     fetchMessage();

//     return () => {
//       // Cleanup GSAP ScrollTriggers
//       if (typeof ScrollTrigger !== 'undefined') {
//         ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//       }
//     };
//   }, []);

//   return (
//     <div className="bg-white text-gray-800 font-unbounded overflow-x-hidden">
//       {/* App Name Full Screen Section */}
//       <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 relative overflow-hidden">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute inset-0" style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='65' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
//           }}></div>
//         </div>
        
//         {/* App Name */}
//         <div className="text-center z-10">
//           <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-unbounded text-rose-600 tracking-wider transform hover:scale-105 transition-transform duration-500 select-none">
//             QUIZORA
//           </h1>
//           <div className="mt-6 w-32 h-1 bg-gradient-to-r from-pink-400 to-purple-300 mx-auto rounded-full"></div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
//           <div className="flex flex-col items-center">
//             <span className="text-sm mb-2 opacity-80">Scroll down</span>
//             <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
//               <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Video Scroll Animation Section */}
//       <div 
//         ref={videoContainerRef}
//         className="video-section h-screen w-full bg-gradient-to-br from-white to-gray-400 flex items-center justify-center relative overflow-hidden"
//       >
//         {/* Video Element */}
//         <video 
//           ref={videoRef}
//           className="scroll-video w-96 h-64 object-cover rounded-2xl shadow-2xl"
//           style={{
//             transformOrigin: 'center center',
//             filter: 'brightness(0.9) contrast(1.1)'
//           }}
//           autoPlay
//           loop
//           muted
//           playsInline
//         >
//           {/* Replace with your video source */}
//           <source 
//             src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" 
//             type="video/mp4" 
//           />
//           {/* Fallback for browsers that don't support video */}
//           <div className="w-96 h-64 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
//             Video Preview
//           </div>
//         </video>
//       </div>

//       {/* Hero Section */}
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-400 p-6">
//         <div className="text-center max-w-4xl mx-auto">
//           <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 animate-fade-in-down">
//             Transform Documents into <span className="text-indigo-600">Knowledge</span>
//           </h1>
//           <p className="mt-4 text-lg md:text-xl text-gray-600 font-sans max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
//             Upload any PDF and let our AI create a personalized quiz for you. The smartest way to study, prepare, and master any subject.
//           </p>
//           <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '1s' }}>
//             <button
//               onClick={() => window.location.href = '/quiz'}
//               className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 duration-300"
//             >
//               Get Started
//               <ArrowRight className="ml-2 h-5 w-5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <section className="py-20 px-6 bg-gradient-to-br from-white to-gray-400">
//         <div className="container mx-auto text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">Unlock Your Learning Potential</h2>
//           <p className="text-gray-600 max-w-2xl mx-auto mb-12 font-sans">
//             QuizMestro is more than just a quiz app. It's a powerful tool designed to enhance your learning experience.
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {/* Feature 1: AI Quiz Generation */}
//             <div className="p-8 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
//               <div className="bg-indigo-100 text-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
//                 <FileText size={32} />
//               </div>
//               <h3 className="text-2xl font-bold mb-3">AI Quiz Generation</h3>
//               <p className="text-gray-600 font-sans">
//                 Our cutting-edge AI reads your PDFs, understands the context, and generates relevant questions in seconds.
//               </p>
//             </div>
//             {/* Feature 2: User Profiles & Progress */}
//             <div className="p-8 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
//               <div className="bg-indigo-100 text-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
//                 <UserCheck size={32} />
//               </div>
//               <h3 className="text-2xl font-bold mb-3">Track Your Progress</h3>
//               <p className="text-gray-600 font-sans">
//                 Create a profile to save your quiz results, track your scores over time, and identify areas for improvement.
//               </p>
//             </div>
//             {/* Feature 3: Leaderboards */}
//             <div className="p-8 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
//               <div className="bg-indigo-100 text-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
//                 <Trophy size={32} />
//               </div>
//               <h3 className="text-2xl font-bold mb-3">Compete & Conquer</h3>
//               <p className="text-gray-600 font-sans">
//                 Challenge your friends, compete on leaderboards, and prove your mastery of the subject matter.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <style jsx>{`
//         .animate-fade-in-down {
//           animation: fadeInDown 1s ease-out;
//         }
        
//         .animate-fade-in-up {
//           animation: fadeInUp 1s ease-out;
//         }
        
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
        
//         @keyframes fadeInDown {
//           from {
//             opacity: 0;
//             transform: translateY(-30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-20px);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LandingPage;

