import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Zap, Plus, X, Sliders, Brain } from 'lucide-react'; // 1. Importing icons for the card and tags
import toast from 'react-hot-toast'; // 2. Library for showing success/error messages

const InstantQuiz = () => {
  const navigate = useNavigate(); // 3. For redirecting to the quiz view after generation
  const { token } = useSelector((state) => state.auth);
  const [topic, setTopic] = useState(""); // 4. Stores the manual topic typed by the user
  const [selectedTags, setSelectedTags] = useState([]); // 5. Preset tags for quick selection
  const [customTags, setCustomTags] = useState([]); // 6. Stores tags that the user creates themselves
  const [numQuestions, setNumQuestions] = useState(5); // 7. Range slider state (starts at 5)
  const [difficulty, setDifficulty] = useState("Medium"); // 8. Difficulty selection state

  // 9. Logic to add a tag when the user clicks the '+' button
  const handleAddTag = () => {
    if (topic.trim() && !customTags.includes(topic.trim())) {
      setCustomTags([...customTags, topic.trim()]);
      setTopic("");
    }
  };

  // 10. Removes a specific custom tag when the 'X' is clicked
  const removeTag = (tagToRemove) => {
    setCustomTags(customTags.filter(tag => tag !== tagToRemove));
  };

  // 11. Handles the final API call (The logic we'll build in the backend next)
  const handleGenerate = async () => {
    // This now works because both are arrays
    const allTags = [...selectedTags, ...customTags]; 
    
    if (allTags.length === 0) return toast.error("Please add at least one topic!");
    
    const toastId = toast.loading("AI is crafting your quiz...");
    
    try {
      const response = await axios.post(
        "https://quizora-ai-quiz-app18.onrender.com/api/quiz/generate", 
        {
          type: 'instant',
          tags: allTags,
          numQuestions: numQuestions,
          difficulty: difficulty
        },
        {
          headers: {
            // This is where your 401 error is likely triggered if token is invalid
            Authorization: `Bearer ${token}`, 
          }
        }
      );

      if (response.data.success) {
        toast.success("Quiz Ready!", { id: toastId });
        navigate("/quiz", { state: { questions: response.data.quiz } });
      }
    } catch (error) {
      console.error("Generation Error:", error);
      // Detailed error message to help you debug the 401
      const message = error.response?.status === 401 
        ? "Session expired. Please logout and login again." 
        : "Failed to generate quiz. Check your connection.";
      toast.error(message, { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 via-orange-200 to-orange-100 flex items-center justify-center p-4 mt-[-36px]">
      {/* 12. Main Selection Card with Glassmorphism */}
      <div className="bg-white/50 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-lg border border-white/20">
        
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-orange-100 rounded-lg text-orange-600"><Zap size={24} /></div>
          <h2 className="text-3xl font-bold text-gray-900">Instant Quiz</h2>
        </div>

        {/* 13. Topic / Custom Tag Input Section */}
        <div className="space-y-4 mb-8">
          <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">What do you want to learn?</label>
          <div className="flex space-x-2">
            <input 
              type="text" value={topic} onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Quantum Physics, Python Basics..."
              className="flex-grow bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-orange-400 outline-none transition-all"
            />
            <button onClick={handleAddTag} className="bg-gray-900 text-white p-3 rounded-xl hover:bg-black transition-all"><Plus size={20}/></button>
          </div>
          
          {/* 14. Active Tags Container (Displays both preset and custom tags) */}
          <div className="flex flex-wrap gap-2">
            {[...selectedTags, ...customTags].map((tag) => (
              <span key={tag} className="flex items-center space-x-1 bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full text-sm font-medium border border-orange-200">
                <span>{tag}</span>
                <button onClick={() => removeTag(tag)}><X size={14}/></button>
              </span>
            ))}
          </div>
        </div>

        {/* 15. Range Slider for Question Count (5 to 10) */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-500 uppercase">Number of Questions</label>
            <span className="text-orange-600 font-bold text-lg">{numQuestions}</span>
          </div>
          <input 
            type="range" min="5" max="10" value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>

        {/* 16. Difficulty Level Selector Buttons */}
        <div className="mb-8">
          <label className="text-sm font-semibold text-gray-500 uppercase block mb-3">Difficulty Level</label>
          <div className="grid grid-cols-3 gap-3">
            {["Easy", "Medium", "Hard"].map((lvl) => (
              <button 
                key={lvl} onClick={() => setDifficulty(lvl)}
                className={`py-2 rounded-xl text-sm font-bold transition-all border ${
                  difficulty === lvl ? 'bg-orange-500 text-white border-orange-500 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'
                }`}
              >{lvl}</button>
            ))}
          </div>
        </div>

        {/* 17. Final Action Button */}
        <button onClick={handleGenerate} className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-2xl transition-all shadow-xl flex items-center justify-center space-x-2">
          <Brain size={20} />
          <span>Generate My Quiz</span>
        </button>
      </div>
    </div>
  );
};

export default InstantQuiz;