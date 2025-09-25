import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, XCircle, Trophy, BookOpen, RotateCcw } from 'lucide-react';
// import { quizQuestions } from '../data/questions.js';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


// Component: Start Screen
const StartScreen = ({ hasGeneratedQuestions }) => {
    // Agar AI se questions generate ho rahe hain, toh loading spinner dikhao.
    if (hasGeneratedQuestions) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900 relative overflow-hidden mt-[-25px]">
                {/* Animated background elements */}
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                
                <div className="text-center relative z-10">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-white/80 border-r-purple-300/60 mx-auto"></div>
                        <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-2 border-white/20 mx-auto"></div>
                    </div>
                    <p className="mt-6 text-white/90 text-lg font-medium">Loading your generated quiz...</p>
                    <div className="mt-4 flex justify-center space-x-1">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-200"></div>
                    </div>
                </div>
            </div>
        );
    }
    
    // Agar user direct is page par aata hai, toh use dashboard par jaane ko kaho.
    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900 relative overflow-hidden mt-[-25px]">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            
            <div className="relative z-10 flex items-center justify-center min-h-screen p-4 pt-20">
                <div className="w-full max-w-md mx-auto">
                    {/* Glass morphism card */}
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 text-center hover:bg-white/15 transition-all duration-500 transform hover:scale-105">
                        {/* Icon with glow effect */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-150"></div>
                            <div className="relative bg-gradient-to-br from-white/20 to-white/10 rounded-full p-4 backdrop-blur-sm border border-white/30">
                                <BookOpen className="w-12 h-12 text-white mx-auto" />
                            </div>
                        </div>
                        
                        <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white via-purple-100 to-indigo-100 bg-clip-text text-transparent">
                            Ready for a Quiz?
                        </h1>
                        
                        <p className="text-white/80 mb-8 text-lg leading-relaxed">
                            Please go to your dashboard to generate a new quiz from a PDF.
                        </p>
                        
                        <Link
                            to="/dashboard"
                            className="group relative w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3 overflow-hidden"
                        >
                            {/* Button shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                            
                            <span className="relative z-10">Go to Dashboard</span>
                            <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                        
                    </div>
                    
                    {/* Floating elements */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-white/10 rounded-full animate-float"></div>
                    <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-purple-400/20 rounded-full animate-float delay-1000"></div>
                </div>
            </div>
        </div>
    );
};

// Component: Quiz Screen (with Previous Button)
const QuizScreen = ({ question, currentQuestion, totalQuestions, selectedAnswer, showAnswer, score, onAnswerSelect, onSubmitAnswer, onNextQuestion, onPreviousQuestion, timer }) => {
  if (!question) return <div className="text-center p-10">Loading question...</div>;

  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - (timer / 60));
  const isLowTime = timer <= 10;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 py-8 px-4 flex items-center mt-[-20px]">
      <div className="max-w-2xl mx-auto w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2 text-sm font-medium text-gray-600">
            <span>Question {currentQuestion + 1} of {totalQuestions}</span>
            <span>Score: {score}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div></div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 relative">
          <div className="absolute top-4 right-4">
            <div className="relative w-14 h-14">
              <svg className="w-full h-full" viewBox="0 0 52 52">
                <circle className="stroke-current text-gray-200" strokeWidth="4" fill="transparent" r={radius} cx="26" cy="26" />
                <circle className={`transform -rotate-90 origin-center ${isLowTime ? 'stroke-red-500' : 'stroke-indigo-600'}`} strokeWidth="4" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" fill="transparent" r={radius} cx="26" cy="26" style={{ transition: 'stroke-dashoffset 1s linear' }} />
              </svg>
              <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold ${isLowTime ? 'text-red-600' : 'text-indigo-800'}`}>{timer}</span>
            </div>
          </div>
          <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full mb-4">{question.category}</span>
          <h2 className="text-2xl font-bold text-gray-900 leading-tight pr-16">{question.question}</h2>
          <div className="mt-6 space-y-3">
            {question.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ";
              if (showAnswer) {
                if (index === question.correctAnswer) buttonClass += "border-green-500 bg-green-50 text-green-800";
                else if (index === selectedAnswer) buttonClass += "border-red-500 bg-red-50 text-red-800";
                else buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
              } else if (selectedAnswer === index) {
                buttonClass += "border-indigo-500 bg-indigo-50 text-indigo-800";
              } else {
                buttonClass += "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700";
              }
              return (
                <button key={index} onClick={() => onAnswerSelect(index)} className={buttonClass} disabled={showAnswer}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {showAnswer && index === question.correctAnswer && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {showAnswer && index === selectedAnswer && index !== question.correctAnswer && <XCircle className="w-5 h-5 text-red-600" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-4">
          {currentQuestion > 0 && !showAnswer && (
            <button onClick={onPreviousQuestion} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
          )}
          {!showAnswer ? (
            <button onClick={onSubmitAnswer} disabled={selectedAnswer === null} className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">Submit</button>
          ) : (
            <button onClick={onNextQuestion} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <span>{currentQuestion === totalQuestions - 1 ? 'View Results' : 'Next Question'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Component: Results Screen (Detailed Version)
const ResultsScreen = ({ score, totalQuestions, answers, onRestart }) => {
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 py-8 px-4 mt-[-20px]">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 text-center animate-fade-in-up">
                    <div className="mb-6">
                        <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <Trophy className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
                        <p className="text-gray-600">Here's how you performed</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-green-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-green-800">{score}</div>
                            <div className="text-green-600">Correct</div>
                        </div>
                        <div className="bg-red-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-red-800">{totalQuestions - score}</div>
                            <div className="text-red-600">Incorrect</div>
                        </div>
                    </div>
                    <div className="text-center mb-6">
                        <div className="text-4xl font-bold text-indigo-600">{percentage}%</div>
                        <div className="text-gray-600">Final Score</div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Question Review</h2>
                    <div className="space-y-4">
                        {answers.map((answer, index) => (
                            <div key={answer.id} className="border-l-4 pl-4 transition-all duration-300 hover:border-indigo-400">
                                <h3 className="font-medium text-gray-900 mb-2">{index + 1}. {answer.question}</h3>
                                <div className="text-sm space-y-1">
                                    <div className={`flex items-center space-x-2 ${answer.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                        {answer.selectedAnswer === null ? <XCircle className="w-4 h-4" /> : answer.isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                        <span>Your answer: {answer.selectedAnswer !== null ? answer.options[answer.selectedAnswer] : 'Not Answered'}</span>
                                    </div>
                                    {!answer.isCorrect && (
                                        <div className="text-green-700 flex items-center space-x-2">
                                            <CheckCircle className="w-4 h-4" />
                                            <span>Correct answer: {answer.options[answer.correctAnswer]}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <button onClick={onRestart} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"><RotateCcw className="w-4 h-4" /><span>Take Quiz Again</span></button>
            </div>
        </div>
    );
};

// Main "Brain" Component for the Quiz Page
const QuizPage = () => {
  const [gameState, setGameState] = useState('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  // const [questions] = useState(quizQuestions);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timer, setTimer] = useState(60);
  const timerInterval = useRef(null);
  // Get the AI-generated questions and loading state from the Redux store
  const { quizQuestions, loading } = useSelector((state) => state.quiz);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    if (gameState === 'quiz' && !showAnswer) {
      timerInterval.current = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timerInterval.current);
  }, [gameState, showAnswer]);

  useEffect(() => {
    if (timer === 0 && !showAnswer && gameState === 'quiz') {
      submitAnswer(true);
    }
  }, [timer, showAnswer, gameState]);

  // This effect runs when the component loads or when new questions arrive from Redux. THE AI MAGIC.......................
  useEffect(() => {
        if (quizQuestions && quizQuestions.length > 0) {
            setGameState('quiz');
            // Reset all local states for the new quiz
            setCurrentQuestion(0);
            setSelectedAnswer(null);
            setAnswers([]);
            setScore(0);
            setShowAnswer(false);
            setTimer(60);
        } else {
            // If there are no questions in Redux, show the start screen
            setGameState('start');
        }
    }, [quizQuestions]); // The key is to run this effect whenever quizQuestions changes


  const startQuiz = () => {
    setGameState('quiz');
    // Reset all values for a new quiz session
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setScore(0);
    setShowAnswer(false);
    setTimer(60);
  };

  const handleAnswerSelect = (index) => {
    if (!showAnswer) setSelectedAnswer(index);
  };

  const submitAnswer = (isTimeUp = false) => {
    if (showAnswer) return;
    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer;
    
    setAnswers(prev => [...prev, {
      ...quizQuestions[currentQuestion],
      selectedAnswer: isTimeUp ? null : selectedAnswer,
      isCorrect: isTimeUp ? false : isCorrect,
    }]);

    if (isCorrect) setScore(prev => prev + 1);
    setShowAnswer(true);
    clearInterval(timerInterval.current);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
      setTimer(60);
    } else {
      setGameState('results');
    }
  };

  const previousQuestion = () => {
      if (currentQuestion > 0) {
        const lastAnswer = answers.pop(); // Remove the last answer
        if (lastAnswer && lastAnswer.isCorrect) {
            setScore(prev => prev - 1); // Decrease score if it was correct
        }
        setAnswers([...answers]); // Update the answers array
        setCurrentQuestion(currentQuestion - 1);
        setSelectedAnswer(null);
        setShowAnswer(false);
        setTimer(60);
      }
  };

  const restartQuiz = () => {
    // We can add a Redux action here later to clear the quiz state if needed
    navigate('/dashboard'); 
  };

  // // Render logic based on gameState
  // if (gameState === 'start') {
  //   return <StartScreen onStart={startQuiz} totalQuestions={questions.length} />;
  // }
  
  // if (gameState === 'quiz') {
  //   return <QuizScreen
  //       question={questions[currentQuestion]}
  //       currentQuestion={currentQuestion}
  //       totalQuestions={questions.length}
  //       selectedAnswer={selectedAnswer}
  //       showAnswer={showAnswer}
  //       score={score}
  //       onAnswerSelect={handleAnswerSelect}
  //       onSubmitAnswer={() => submitAnswer(false)}
  //       onNextQuestion={nextQuestion}
  //       onPreviousQuestion={previousQuestion}
  //       timer={timer}
  //     />
  // }

  // if (gameState === 'results') {
  //   return <ResultsScreen
  //       score={score}
  //       totalQuestions={questions.length}
  //       answers={answers}
  //       onRestart={startQuiz} // Use startQuiz to reset everything
  //     />
  // }


  if (loading) {
      // Show a loading indicator while the quiz is being generated
      return <StartScreen hasGeneratedQuestions={true} />;
  }

  switch (gameState) {
      case 'quiz':
           // If the user lands here but there are no questions, show the start screen
           if (!quizQuestions || quizQuestions.length === 0) {
              return <StartScreen hasGeneratedQuestions={false} />;
          }
          return <QuizScreen
              question={quizQuestions[currentQuestion]}
              currentQuestion={currentQuestion}
              totalQuestions={quizQuestions.length}
              selectedAnswer={selectedAnswer}
              showAnswer={showAnswer}
              score={score}
              onAnswerSelect={setSelectedAnswer}
              onSubmitAnswer={() => submitAnswer(false)}
              onNextQuestion={nextQuestion}
              onPreviousQuestion={previousQuestion}
              timer={timer}
          />;
      case 'results':
          return <ResultsScreen
              score={score}
              totalQuestions={quizQuestions.length}
              answers={answers}
              onRestart={restartQuiz} // Use the new restart function
          />;
      case 'start':
      default:
          // This will now direct the user to the dashboard to generate a quiz
          return <StartScreen hasGeneratedQuestions={false} />;
  }
};

export default QuizPage;

