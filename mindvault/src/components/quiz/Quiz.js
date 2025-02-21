import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import qBank from "./Components/QuestionBank";
import Score from "./Components/Score";
import "./Quiz.css";

const Quiz = () => {
  const [questionBank] = useState(qBank);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [quizEnd, setQuizEnd] = useState(false);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    checkAnswer();
    handleNextQuestion();
  };

  const checkAnswer = () => {
    if (selectedOption === questionBank[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questionBank.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption("");
    } else {
      setQuizEnd(true);
    }
  };

  return (
    <div className="quiz-container d-flex flex-column align-items-center justify-content-center">
      <h1 className="app-title">QUIZ</h1>
      {!quizEnd ? (
        <div className="question-container">
          <h2 className="question-text">{questionBank[currentQuestion].question}</h2>
          <form onSubmit={handleFormSubmit} className="quiz-options">
            {questionBank[currentQuestion].options.map((option, index) => (
              <label key={index} className="quiz-option">
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                />
                {option}
              </label>
            ))}
            <button type="submit" className="quiz-btn">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <Score score={score} />
      )}
    </div>
  );
};

export default Quiz;
