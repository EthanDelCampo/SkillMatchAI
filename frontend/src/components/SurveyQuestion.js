import React from "react";

const SurveyQuestion = ({ question, response, setResponse, options, isUnanswered }) => {
  const handleChange = (e) => {
    setResponse((prev) => ({ ...prev, [question.id]: e.target.value }));
  };

  return (
    <div
      className={`p-6 bg-white rounded-lg shadow-md border transition duration-300 ${
        isUnanswered ? "border-red-500" : "border-gray-200"
      }`}
    >
      <p className="mb-4 font-medium text-gray-800">{question.question}</p>
      <div className="flex flex-wrap gap-4">
        {options.map((option, index) => (
          <label
            key={index}
            className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-md hover:bg-blue-50 transition cursor-pointer"
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option}
              checked={response[question.id] === option}
              onChange={handleChange}
              className="accent-blue-600"
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>
      {isUnanswered && (
        <p className="mt-2 text-sm text-red-500">Please answer this question.</p>
      )}
    </div>
  );
};

export default SurveyQuestion;

