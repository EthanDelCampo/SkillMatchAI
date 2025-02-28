// frontend/src/pages/Home.js
import React from "react";
import Survey from "../components/Survey";

const Home = () => {
  return (
    <div>
      <h1>Welcome to SkillMatch AI</h1>
      <p>Take the survey to get personalized career recommendations.</p>
      <Survey /> 
    </div>
  );
};

export default Home;
