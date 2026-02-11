import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, UserCheck, Trophy } from 'lucide-react';
import { useSelector } from 'react-redux'; // Pull auth state


// Importing the local video file
import heroVideo from '../assets/a_bit_longer_the_video_is_ama.mp4';

// Register the GSAP plugin once
gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const main = useRef();

  // Check if user is logged in via Redux token
  const { token } = useSelector((state) => state.auth);
  const isNavbarMenuOpen = useSelector((state) => state.ui?.isNavbarMenuOpen);

  useEffect(() => {
    // GSAP context provides easy cleanup
    const ctx = gsap.context(() => {
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
        scale: 1.9,
        ease: "power1.inOut"
      });

      // if (token) {
      //   // Initial entrance
      //   gsap.from(".features-indicator", {
      //     opacity: 0,
      //     y: 40,
      //     duration: 1,
      //     ease: "bounce.out",
      //     delay: 0.5
      //   });

      //   // Continuous floating/yoyo effect
      //   gsap.to(".features-indicator", {
      //     y: 5,
      //     duration: 0.8,
      //     repeat: -1,
      //     yoyo: true,
      //     ease: "power1.inOut"
      //   });
      // }
      if (token) {
        if (isNavbarMenuOpen) {
          // Fade out when dropdown is open
          gsap.to(".features-indicator", { opacity: 0, y: -10, duration: 0.3 });
        } else {
          // Fade in and resume floating when dropdown is closed
          gsap.to(".features-indicator", { opacity: 1, y: 9, duration: 0.4,repeat: -1,yoyo:true,ease: "power1.inOut" });
        }
      }
      
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, main); // Scope animations to the main ref

    return () => ctx.revert(); // Cleanup of GSAP animations and re run if login status changes...
  }, [isNavbarMenuOpen,token]);

  return (
    <div ref={main} className="bg-white text-gray-800 font-unbounded mt-[-31px]">

      {/* 1. NEW: Features Indicator (Positioned relative to the header) */}
      {token && (
        <div className="features-indicator absolute top-25 left-1/2 transform -translate-x-1/2 z-[60] flex flex-col items-center pointer-events-none">
          <span className="text-xs text-rose-200 font-medium uppercase tracking-widest drop-shadow-md">Features</span>
          <svg className="w-4 h-4 text-rose-200 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
      )}
      
      {/* App Name Full Screen Section */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-black via-zinc-900 to-zinc-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='65' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
        <div className="text-center z-10">
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] text-rose-300 tracking-wider select-none">
            QUIZORA
          </h1>
          {/*<div className="mt-6 w-32 h-1 bg-gradient-to-r from-pink-400 to-purple-300 mx-auto rounded-full"></div>*/}
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-300 rounded-full"></div>

            <span className="text-rose-200 text-xl tracking-[0.3em] uppercase select-none animate-pulse">
              Upload · Learn
            </span>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-rose-300 animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 opacity-80">Scroll down</span>
            <div className="w-6 h-10 border-2 border-rose-300 rounded-full flex justify-center"><div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div></div>
          </div>
        </div>
      </div>

      {/* Video Scroll Animation Section */}
      <div className="video-section h-screen w-full bg-gradient-to-br from-gray-200 to-gray-500 flex items-center justify-center overflow-hidden">
        <video 
          className="scroll-video w-96 h-64 object-cover rounded-2xl shadow-2xl"
          style={{ transformOrigin: 'center center', filter: 'brightness(0.9) contrast(1.1)' }}
          autoPlay loop muted playsInline
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-400 to-gray-200 p-6">
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
              Try Me
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
            Quizora is more than just a quiz app. It's a powerful tool designed to enhance your learning experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 features-grid">
            <div className="feature-card p-8 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 hover:-translate-y-2 hover:rotate-1">
              <div className="bg-indigo-100 text-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6"><FileText size={32} /></div>
              <h3 className="text-2xl font-bold mb-3">AI Quiz Generation</h3>
              <p className="text-gray-600 font-sans">Our AI reads your PDFs, understands the context, and generates relevant questions in seconds.</p>
            </div>
            <div className="feature-card p-8 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="bg-indigo-100 text-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6"><UserCheck size={32} /></div>
              <h3 className="text-2xl font-bold mb-3">Instant Quiz</h3>
              <p className="text-gray-600 font-sans">Create quizzes instantly by choosing topic, level, and difficulty.</p>
            </div>
            <div className="feature-card p-8 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="bg-indigo-100 text-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6"><Trophy size={32} /></div>
              <h3 className="text-2xl font-bold mb-3">Compete & Conquer</h3>
              <p className="text-gray-600 font-sans">Challenge your friends, compete on leaderboards, and prove your mastery of the subject matter.</p>
              <p className="text-red-900 font-sans">! Coming Soon</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;