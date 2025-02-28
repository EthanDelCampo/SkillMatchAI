import React from "react";

const SurveyQuestion = ({ question, response, setResponse, options }) => {
  const handleChange = (e) => {
    setResponse((prev) => ({ ...prev, [question.id]: e.target.value }));
  };

  return (
    <div className="survey-question">
      <p>{question.question}</p>
      {options.map((option, index) => (
        <label key={index}>
          <input
            type="radio"
            name={`question-${question.id}`}
            value={option}
            checked={response[question.id] === option}
            onChange={handleChange}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default SurveyQuestion;
