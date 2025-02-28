import React, { useState } from "react";
import SurveyQuestion from "./SurveyQuestion";
import { submitSurvey } from "../api/surveyApi";

const surveyQuestions = [
  { id: 1, question: "I can analyze complex problems and find effective solutions." },
  { id: 2, question: "I manage my time efficiently and meet deadlines consistently." },
  { id: 3, question: "I am comfortable using digital productivity tools." },
  { id: 4, question: "I can effectively interpret and analyze data to make informed decisions." },
  { id: 5, question: "I quickly adapt to new software and technologies." },
  { id: 6, question: "I can work independently with minimal supervision." },
  { id: 7, question: "I collaborate well with team members and contribute to group discussions." },
  { id: 8, question: "I can clearly express my ideas in meetings and presentations." },
  { id: 9, question: "I write professional emails and reports with clarity and accuracy." },
  { id: 10, question: "I perform well under pressure and can handle tight deadlines." },
  { id: 11, question: "I am proficient in using industry-specific tools/software (e.g., Python, SQL, Adobe Suite)." },
  { id: 12, question: "I understand and apply project management methodologies (e.g., Agile, Scrum, Waterfall)." },
  { id: 13, question: "I can create and interpret data visualizations effectively." },
  { id: 14, question: "I have sufficient coding/programming experience for my field." },
  { id: 15, question: "I keep up with new trends and advancements in my industry." },
  { id: 16, question: "I excel at critical thinking and logical problem-solving." },
  { id: 17, question: "I am confident in my ability to lead a team or project." },
  { id: 18, question: "I prefer working with data and structured processes over creative tasks." },
  { id: 19, question: "I am comfortable delegating tasks and managing team performance." },
  { id: 20, question: "I actively seek constructive feedback to improve my skills." },
  { id: 21, question: "I am willing to learn new skills to improve my career prospects." },
  { id: 22, question: "I prefer structured learning (e.g., certifications, courses) over self-learning." },
  { id: 23, question: "I can quickly adapt to new roles, tasks, or work environments." },
  { id: 24, question: "When faced with a skill gap, I proactively seek ways to improve." },
  { id: 25, question: "I have taken career assessments (e.g., StrengthsFinder, Myers-Briggs) to understand my work style." },
  { id: 26, question: "I am aware of the skills I need to improve to advance my career." },
  { id: 27, question: "I feel confident in my ability to achieve my career goals." },
  { id: 28, question: "I prefer career growth through structured promotions rather than skill-based growth (e.g., freelance work, entrepreneurship)." },
  { id: 29, question: "I believe networking is crucial for career advancement." },
  { id: 30, question: "I would like AI-driven recommendations to improve my career development." },
];

const options = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];

const Survey = () => {
  const [responses, setResponses] = useState({});
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await submitSurvey(responses);
      setResult(res.data.recommendations);
    } catch (err) {
      console.error("Error submitting survey:", err);
    }
  };

  return (
    <div>
      <h2>SkillMatch AI - Self-Assessment Survey</h2>
      <form onSubmit={handleSubmit}>
        {surveyQuestions.map((q) => (
          <SurveyQuestion key={q.id} question={q} response={responses} setResponse={setResponses} options={options} />
        ))}
        <button type="submit">Submit</button>
      </form>

      {result && (
        <div>
          <h3>Career Recommendations:</h3>
          <ul>
            {result.map((career, index) => <li key={index}>{career}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Survey;
