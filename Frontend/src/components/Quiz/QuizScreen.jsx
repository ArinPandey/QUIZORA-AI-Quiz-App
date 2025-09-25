// Ab aate hain QuizScreen par. Ye component quiz ka main interface hai, jahan user question dekhta hai aur answer select karta hai.

// Ye ek "presentational" component hai. Matlab iske paas apni koi state ya logic nahi hai. Ye bas apne parent (QuizApp) se 
// props ke through data aur functions leta hai aur unhe screen par dikhata hai. Jaisa parent bolega, ye waisa karega.

// Ye component poori tarah se props par dependent hai. Iska kaam sirf UI dikhana hai aur user ke actions (jaise button click) 
// ko parent component tak pahunchana hai. Is separation se code saaf aur maintain karne mein aasan ho jaata hai.


import React from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, XCircle } from 'lucide-react';

// Chota, reusable component jo circular timer dikhata hai.
// Isko props mein bas 'timeLeft' chahiye.
const CircularTimer = ({ timeLeft, totalTime = 60 }) => {
  // SVG circle banane ke liye thodi si maths.
  const radius = 22;
  const circumference = 2 * Math.PI * radius;

  // Kitna progress hua hai, 0 se 1 ke beech mein.
  const progress = timeLeft / totalTime;
  
  // Circle ka 'stroke' (border) kitna bhara hua dikhega.
  const strokeDashoffset = circumference * (1 - progress);
  
  // -- Conditional Styling --
  // Jab 10 second se kam time ho to color change kar do.
  const isLowTime = timeLeft <= 10;
  const strokeColor = isLowTime ? 'stroke-red-500' : 'stroke-indigo-600';
  const textColor = isLowTime ? 'text-red-600' : 'text-indigo-800';

  return (
    // Ye JSX timer ka visual structure banata hai.
    <div className="relative w-14 h-14">
      <svg className="w-full h-full" viewBox="0 0 52 52">
        {/* Background wala halka circle */}
        <circle
          className="stroke-current text-gray-200"
          strokeWidth="4"
          fill="transparent"
          r={radius}
          cx="26"
          cy="26"
        />
        {/* Progress dikhane wala main circle */}
        <circle
          className={`transform -rotate-90 origin-center transition-all duration-300 ${strokeColor}`}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="26"
          cy="26"
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
      {/* Circle ke beech mein time ka text */}
      <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold ${textColor}`}>
        {timeLeft}
      </span>
    </div>
  );
};


// Main QuizScreen component.
// Iske saare data aur functions iske parent (QuizApp) se as 'props' aa rahe hain.
const QuizScreen = ({
  question,
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  showAnswer,
  score,
  onAnswerSelect,
  onSubmitAnswer,
  onNextQuestion,
  onPreviousQuestion,
  timer
}) => {
  // -- Safeguard --
  // Agar question prop abhi tak load nahi hua hai (undefined hai), to component ko crash hone se roko.
  // Parent component (QuizApp) mein loading check hai, but ye extra safety hai.
  if (!question) {
    return null; // Kuch bhi render mat karo jab tak question na ho.
  }

  // Simple calculation progress bar ke liye.
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-gray-600">
              Score: {score}/{currentQuestion + (showAnswer ? 1 : 0)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 relative">
          <div className="absolute top-4 right-4">
            {/* Upar banaya hua CircularTimer component yahan use ho raha hai. */}
            <CircularTimer timeLeft={timer} />
          </div>

          <div className="mb-6">
            <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
              {question.category}
            </span>
            <h2 className="text-2xl font-bold text-gray-900 leading-tight pr-16">
              {question.question}
            </h2>
          </div>

          <div className="space-y-3">
            {/* -- Rendering a List with .map() -- */}
            {/* `question.options` array ke har item ke liye ek button render kar rahe hain. */}
            {/* React mein lists render karne ka ye standard tareeka hai. */}
            {question.options.map((option, index) => {
              // Har button ki styling ke liye dynamic class logic.
              let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ";

              // -- Dynamic Styling based on Props --
              // Ye logic props (showAnswer, selectedAnswer) ke hisab se button ka color decide karta hai.
              if (showAnswer) {
                if (index === question.correctAnswer) {
                  buttonClass += "border-green-500 bg-green-50 text-green-800"; // Correct answer ko green dikhao.
                } else if (index === selectedAnswer && index !== question.correctAnswer) {
                  buttonClass += "border-red-500 bg-red-50 text-red-800"; // Galat selected answer ko red dikhao.
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-500"; // Baaki options ko disabled/gray dikhao.
                }
              } else if (selectedAnswer === index) {
                buttonClass += "border-indigo-500 bg-indigo-50 text-indigo-800"; // Jo answer select kiya hai use highlight karo.
              } else {
                buttonClass += "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700"; // Normal state.
              }

              return (
                <button
                  // `key` prop React ke liye zaroori hai jab hum map se list banate hain. Isse React har item ko uniquely identify kar pata hai.
                  key={index}
                  // Jab button click hoga, to parent se mila `onAnswerSelect` function call hoga.
                  onClick={() => onAnswerSelect(index)}
                  className={buttonClass}
                  disabled={showAnswer} // Jab answer dikh jaye to button disable kar do.
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {/* -- Conditional Rendering -- */}
                    {/* Ye icons sirf tab dikhenge jab `showAnswer` true hoga. */}
                    {showAnswer && index === question.correctAnswer && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    {showAnswer && index === selectedAnswer && index !== question.correctAnswer && (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="flex space-x-4">
          {/* Ye button sirf pehle question ke baad dikhega. `&&` ek shortcut hai conditional rendering ka. */}
          {currentQuestion > 0 && !showAnswer && (
            <button
              onClick={onPreviousQuestion}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
          )}

          {/* Ternary operator `? :` se decide ho raha hai ki 'Submit' button dikhega ya 'Next' button. */}
          {!showAnswer ? (
            <button
              onClick={onSubmitAnswer}
              disabled={selectedAnswer === null} // Jab tak koi option select na ho, button disabled rahega.
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={onNextQuestion}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {/* Button ka text bhi conditionally change ho raha hai. */}
              <span>{currentQuestion === totalQuestions - 1 ? 'View Results' : 'Next Question'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;


