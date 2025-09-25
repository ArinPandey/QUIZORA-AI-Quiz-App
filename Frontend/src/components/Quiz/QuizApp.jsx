// Ab aate hain QuizScreen par. Ye component quiz ka main interface hai, jahan user question dekhta hai aur answer select karta hai.

// Ye ek "presentational" component hai. Matlab iske paas apni koi state ya logic nahi hai. Ye bas apne parent (QuizApp) se props ke through data aur 
//functions leta hai aur unhe screen par dikhata hai. Jaisa parent bolega, ye waisa karega.

// Toh, ye tha aapka main QuizApp component. Isne saari state (useState), side effects (useEffect), aur logic (functions) ko ek jagah rakha hua hai. 
// Phir ye state aur functions ko as props apne child components (StartScreen, QuizScreen, ResultsScreen) ko pass karta hai.

// Ye ek bahut hi common aur accha pattern hai React apps banane ka. Ise "Container and Presentational Components" pattern kehte hain.

import React, { useState, useEffect, useRef } from 'react';
import StartScreen from './StartScreen';
import QuizScreen from './QuizScreen';
import ResultsScreen from './ResultsScreen';
import { quizQuestions } from '../../data/questions';

const QuizApp = () => {
  // --- STATE MANAGEMENT ---
  // useState hook isliye use karte hain taaki jab bhi inki value change ho, component re-render ho aur UI update ho.
  
  // Kaunsi screen dikhani hai ('start', 'quiz', 'results'), uska track rakhta hai.
  const [gameState, setGameState] = useState('start'); 
  
  // Abhi user kaunse question par hai, uska index store karta hai.
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // User ne kaunsa option select kiya hai, uska index.
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  // User ke diye hue saare answers ka record rakhta hai.
  const [answers, setAnswers] = useState([]);

  // User ka current score.
  const [score, setScore] = useState(0);
  
  // Saare questions jo quiz mein use honge.
  const [questions, setQuestions] = useState([]);

  // Sahi answer dikhana hai ya nahi, ye control karta hai.
  const [showAnswer, setShowAnswer] = useState(false);

  // Har question ke liye countdown timer.
  const [timer, setTimer] = useState(60);

  // --- REF ---
  // useRef hook timer ke interval ID ko store karne ke liye hai.
  // Isse update karne par component re-render nahi hota, jo humein yahan chahiye.
  const timerInterval = useRef(null);

  // --- SIDE EFFECTS ---
  // useEffect hook side effects (jaise API calls ya timers) manage karne ke liye hai.

  // Ye effect sirf ek baar chalta hai jab component mount hota hai (kyunki dependency array [] khali hai).
  // Iska kaam hai questions ko state mein load karna.
  useEffect(() => {
      setQuestions(quizQuestions);

      // Abhi ke liye local data use kar rahe hain, future mein yahan API call hogi.
  }, []);
  
  // Ye effect timer ko start/stop karta hai.
  // Ye tabhi chalega jab `gameState` ya `showAnswer` ki value change hogi.
  useEffect(() => {
    if (gameState === 'quiz' && !showAnswer) {
      // Har second timer ko 1 se kam karne ke liye interval set kar rahe hain.
      timerInterval.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      // Agar quiz state mein nahi hain, to interval clear kar do.
      clearInterval(timerInterval.current);
    }

    // Ye 'cleanup function' hai. Component re-render hone se pehle purana interval saaf kar deta hai.
    // Isse memory leaks nahi hote.
    return () => clearInterval(timerInterval.current);
  }, [gameState, showAnswer]);


  // Ye effect 'timer' state ko dekhta rehta hai.
  // Jab bhi timer change hoga, ye check karega kahin wo 0 to nahi ho gaya.
  useEffect(() => {
    if (timer === 0) {
      clearInterval(timerInterval.current);
      submitAnswer(true); // Time khatam, answer auto-submit kar do.
    }
  }, [timer]);

// --- FUNCTIONS ---

  // Quiz shuru karne ke liye. Saari values ko reset karta hai.
  const startQuiz = () => {
    setGameState('quiz');
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setScore(0);
    setShowAnswer(false);
    setTimer(60);
  };

 // Jab user koi answer option select karta hai.
  const handleAnswerSelect = (answerIndex) => {
    if (showAnswer) return; // Agar answer dikh chuka hai to kuch mat karo.
    setSelectedAnswer(answerIndex);
  };
    
  // User ka answer submit karne ke liye.
  const submitAnswer = (isTimeUp = false) => {
    const currentSelectedAnswer = isTimeUp ? null : selectedAnswer;
    const isCorrect = currentSelectedAnswer === questions[currentQuestion].correctAnswer;
    
    // User ke attempt ka ek object banakar 'answers' array mein store kar rahe hain.
    const newAnswer = {
      questionId: questions[currentQuestion].id,
      question: questions[currentQuestion].question,
      selectedAnswer: currentSelectedAnswer,
      correctAnswer: questions[currentQuestion].correctAnswer,
      options: questions[currentQuestion].options,
      isCorrect,
      category: questions[currentQuestion].category
    };

    setAnswers([...answers, newAnswer]); // Naya answer state mein add kar do.
    if (isCorrect) {
      setScore(score + 1); // Agar sahi hai to score badha do.
    }
    setShowAnswer(true); // Ab correct answer dikhane ka time hai.
    clearInterval(timerInterval.current); // Timer rok do.
  };


  // Agle question par jaane ke liye.
  const nextQuestion = () => {
    // Check karo ki ye aakhri question to nahi hai.
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      // Next question ke liye values reset kar do.
      setSelectedAnswer(null);
      setShowAnswer(false);
      setTimer(60);
    } else {
      // Agar aakhri tha, to results screen dikhao.
      setGameState('results');
    }
  };

  // Pichle question par jaane ke liye (ye ek extra feature hai).
  const previousQuestion = () => {
    if (currentQuestion > 0) {
      // Pichle question ka answer record aue score update ahtao.
      const lastAnswer = answers[answers.length - 1];
      if (lastAnswer && lastAnswer.isCorrect) {
        setScore(score - 1);
      }
      setAnswers(answers.slice(0, -1));

      // Pichle question par jao aur values reset karo.
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
      setTimer(60);
    }
  };

  // Quiz ko dobara start karne ke liye.
  const restartQuiz = () => {
    setGameState('start');
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setScore(0);
    setShowAnswer(false);
  };

  // --- CONDITIONAL RENDERING ---

  // Jab tak questions load nahi hote, loading indicator dikhao.
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  // `gameState` ke hisab se correct screen component render karo.
  // Ise conditional rendering kehte hain.
  switch (gameState) {
    case 'start':
      return (
        // Data aur functions ko child components mein 'props' ke through pass kar rahe hain.
        // For example, `onStart={startQuiz}` ka matlab hai ki `startQuiz` function ab `StartScreen` component ke andar 'onStart' naam se available hoga.
        <StartScreen
          onStart={startQuiz}
          totalQuestions={questions.length}
        />
      );
    case 'quiz':
      return (
        <QuizScreen
          question={questions[currentQuestion]}
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          selectedAnswer={selectedAnswer}
          showAnswer={showAnswer}
          score={score}
          onAnswerSelect={handleAnswerSelect}
          onSubmitAnswer={() => submitAnswer(false)}
          onNextQuestion={nextQuestion}
          onPreviousQuestion={previousQuestion}
          timer={timer}
        />
      );
    case 'results':
      return (
        <ResultsScreen
          score={score}
          totalQuestions={questions.length}
          answers={answers}
          onRestart={restartQuiz}
        />
      );
    default:
      return (
        <StartScreen
          onStart={startQuiz}
          totalQuestions={questions.length}
        />
      );
  }
};

export default QuizApp;
