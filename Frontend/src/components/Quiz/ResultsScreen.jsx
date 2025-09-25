// Iska kaam hai final score aur user ke diye gaye answers ko ek saaf-suthre format mein display karna.
// Ye saara data apne parent QuizApp se props mein leta hai. Chaliye isko bhi samajhte hain.

import React from 'react';
import { RotateCcw, CheckCircle, XCircle, Trophy } from 'lucide-react';
// Ye component props mein score, totalQuestions, answers, aur onRestart function le raha hai.
// Humne `answers = []` add kiya hai. Ye ek default value hai.
// Agar kabhi `answers` prop pass nahi hota ya undefined hota hai, to ye automatically ek empty array maan lega.
// Isse `answers.map` wala error nahi aayega, kyunki empty array par .map() safely chal jaata hai.
const ResultsScreen = ({ score, totalQuestions, answers = [], onRestart }) => {
    // Score ko percentage mein convert kar rahe hain. Math.round() se decimal value round off ho jaati hai.
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Score Summary Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 text-center">
                    <div className="mb-6">
                        <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <Trophy className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
                        <p className="text-gray-600">Here's how you performed</p>
                    </div>

                    {/* Correct aur Incorrect answers ka count dikhane ke liye grid. */}
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

                    {/* Final percentage score. */}
                    <div className="text-center mb-6">
                        <div className="text-4xl font-bold text-indigo-600">{percentage}%</div>
                        <div className="text-gray-600">Final Score</div>
                    </div>
                </div>

                {/* Detailed Question Review Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Question Review</h2>

                    <div className="space-y-4">
                        {/* -- List Rendering with .map() -- */}
                        {/* `answers` array (jo prop se mila hai) ke har item ke liye ek review block banega. */}
                        {answers.map((answer, index) => (
                            // `key` yahan bhi zaroori hai. Hum questionId use kar rahe hain kyunki wo unique hai.
                            <div key={answer.questionId} className="border-l-4 border-gray-200 pl-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900 mb-2">
                                            {index + 1}. {answer.question}
                                        </h3>
                                        <div className="text-sm space-y-1">
                                            {/* -- Conditional Styling -- */}
                                            {/* Ternary operator se text ka color decide ho raha hai - green ya red. */}
                                            <div className={`flex items-center space-x-2 ${answer.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                                {/* -- Conditional Rendering -- */}
                                                {/* Yahan check ho raha hai ki user ne answer diya tha ya time up ho gaya tha. */}
                                                {answer.selectedAnswer === null ? (
                                                    <XCircle className="w-4 h-4" /> // Time's up
                                                ) : answer.isCorrect ? (
                                                    <CheckCircle className="w-4 h-4" /> // Correct
                                                ) : (
                                                    <XCircle className="w-4 h-4" /> // Incorrect
                                                )}
                                                <span>Your answer: {answer.selectedAnswer !== null ? answer.options[answer.selectedAnswer] : 'Not Answered'}</span>
                                            </div>
                                            {/* Agar answer galat tha, to correct answer bhi dikhao. `&&` ka use. */}
                                            {!answer.isCorrect && (
                                                <div className="text-green-700 flex items-center space-x-2">
                                                    <CheckCircle className="w-4 h-4" />
                                                    <span>Correct answer: {answer.options[answer.correctAnswer]}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/* Category ka badge. Iska color bhi answer ke correct/incorrect hone par depend karta hai. */}
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        answer.isCorrect
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}>
                                        {answer.category}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Restart Button */}
                <button
                    // Iske click par parent se mila `onRestart` function call hoga.
                    onClick={onRestart}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                    <RotateCcw className="w-4 h-4" />
                    <span>Take Quiz Again</span>
                </button>
            </div>
        </div>
    );
};


export default ResultsScreen;