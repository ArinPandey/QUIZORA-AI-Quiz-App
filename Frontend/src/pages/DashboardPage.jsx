import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, File, X } from 'lucide-react';
import { generateQuiz } from '../operations/quizAPI.js'; 

const DashboardPage = () => {
    const { user, token } = useSelector((state) => state.auth); 
    const { loading: quizLoading } = useSelector((state) => state.quiz); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setSelectedFile(file);
        } else {
            alert("Please select a PDF file.");
            setSelectedFile(null); 
        }
    };

    const handleUpload = () => {
        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }
        dispatch(generateQuiz(selectedFile, token, navigate));
    };

    const onFileUploadClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="min-h-[calc(100vh-128px)] p-4 md:p-8 mt-[-25px] bg-gradient-to-br from-rose-300 via-pink-400 to-purple-400">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Welcome back, <span className="text-indigo-600">{user?.firstName || 'Guest'}</span>!
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Ready to transform your documents into knowledge?
                    </p>
                </div>

                {/* --- File Upload Section --- */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create a New Quiz</h2>
                    
                    <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="application/pdf"
                    />

                    <div 
                        className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300"
                        onClick={onFileUploadClick}
                    >
                        <div className="flex flex-col items-center text-gray-500">
                            <UploadCloud size={48} className="mb-4 text-gray-400" />
                            <p className="font-semibold">
                                <span className="text-indigo-600">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-sm mt-1">PDF (max. 10MB)</p>
                        </div>
                    </div>

                    {selectedFile && (
                        <div className="mt-6 bg-gray-100 p-4 rounded-lg flex items-center justify-between animate-fade-in">
                            <div className="flex items-center space-x-3">
                                <File className="text-indigo-600" />
                                <span className="font-medium text-gray-800">{selectedFile.name}</span>
                            </div>
                            <button onClick={() => setSelectedFile(null)} className="text-gray-500 hover:text-red-600">
                                <X />
                            </button>
                        </div>
                    )}

                    <div className="mt-6">
                        <button
                            onClick={handleUpload}
                            disabled={!selectedFile || quizLoading}
                            className="w-full px-6 py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center"
                        >
                            {quizLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                    Generating...
                                </>
                            ) : (
                                'Generate Quiz'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;

