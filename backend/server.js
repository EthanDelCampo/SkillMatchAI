require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = "gemini-2.0-flash"; // ✅ model you have access to on v1beta

// ✅ Step 1: Add survey questions mapping here
const surveyQuestions = {
  1: "I can analyze complex problems and find effective solutions.",
  2: "I manage my time efficiently and meet deadlines consistently." ,
  3: "I am comfortable using digital productivity tools." ,
  4: "I can effectively interpret and analyze data to make informed decisions." ,
  5: "I quickly adapt to new software and technologies." ,
  6: "I can work independently with minimal supervision." ,
  7: "I collaborate well with team members and contribute to group discussions." ,
  8: "I can clearly express my ideas in meetings and presentations." ,
  9: "I write professional emails and reports with clarity and accuracy." ,
  10: "I perform well under pressure and can handle tight deadlines." ,
  11: "I am proficient in using industry-specific tools/software (e.g., Python, SQL, Adobe Suite).",
  12: "I understand and apply project management methodologies (e.g., Agile, Scrum, Waterfall)." ,
  13: "I can create and interpret data visualizations effectively." ,
  14: "I have sufficient coding/programming experience for my field." ,
  15: "I keep up with new trends and advancements in my industry." ,
  16: "I excel at critical thinking and logical problem-solving." ,
  17: "I am confident in my ability to lead a team or project." ,
  18: "I prefer working with data and structured processes over creative tasks." ,
  19: "I am comfortable delegating tasks and managing team performance." ,
  20: "I actively seek constructive feedback to improve my skills." ,
  21: "I am willing to learn new skills to improve my career prospects." ,
  22: "I prefer structured learning (e.g., certifications, courses) over self-learning." ,
  23: "I can quickly adapt to new roles, tasks, or work environments." ,
  24: "When faced with a skill gap, I proactively seek ways to improve." ,
  25: "I have taken career assessments (e.g., StrengthsFinder, Myers-Briggs) to understand my work style." ,
  26: "I am aware of the skills I need to improve to advance my career." ,
  27: "I feel confident in my ability to achieve my career goals." ,
  28: "I prefer career growth through structured promotions rather than skill-based growth (e.g., freelance work, entrepreneurship)." ,
  29: "I believe networking is crucial for career advancement." ,
  30: "I would like AI-driven recommendations to improve my career development."
};

// ✅ Route to verify server is running
app.get("/", (req, res) => {
  res.send("Gemini backend is running! POST to /submit");
});

// ✅ POST endpoint for survey submission
app.post("/submit", async (req, res) => {
  const formData = req.body;
  console.log("Received survey responses:", formData);

  try {
    // ✅ Step 2: Combine answers with their question text
    const combinedResponses = Object.entries(formData).map(([num, answer]) => {
      const question = surveyQuestions[num];
      return `Q${num}: ${question} -> ${answer}`;
    }).join("\n");

    // ✅ Step 3: Create the prompt for Gemini
    const prompt = `
You are an expert career counselor AI.

The following are direct responses to a career self-assessment survey.
Each question is followed by the user's answer.

DO NOT make any assumptions about the questions.
ONLY use the provided questions and answers to generate recommendations.
Do not generalize or group categories unless explicitly stated in the questions.

Survey Responses:
${combinedResponses}

TASK:
Carefully analyze the survey responses provided above. Then suggest exactly three personalized career paths for the user. Return each suggestion as a short paragraph.

Each paragraph should:
- Start with the career name (e.g., "Business Analyst:").
- Follow with a 1–2 sentence explanation of why the user is a strong match for this career.
- Do not add any formatting symbols such as asterisks, dashes, or numbers.
- Do not use bullet points or numbered lists.
- Do not use markdown formatting of any kind.
- Do not include introductions, summaries, or closing statements.

ONLY output the three paragraphs exactly like this example format:

Software Developer: Your high comfort with digital tools and coding experience makes you a great fit for a software development role.

Project Manager: Your time management, leadership, and preference for structured processes align well with project management careers.

Data Analyst: You showed strengths in data interpretation and decision-making, which are core to data analysis roles.

Follow this exact structure.
`;


    // ✅ Step 4: Setup the Gemini API request
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

    const requestBody = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    };

    // ✅ Step 5: Send the request to Gemini API (using native fetch in Node.js v18+)
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    // ✅ Step 6: Handle Gemini API response
    if (!response.ok) {
      const error = await response.json();
      console.error("Gemini API Error:", error);
      return res.status(500).json({ error: "Failed to get recommendations from Gemini API." });
    }

    const result = await response.json();

    const textResponse = result.candidates[0]?.content?.parts[0]?.text || "No response from Gemini.";

    console.log("Gemini Response:", textResponse);

    // ✅ Step 7: Send back recommendations to frontend
    res.json({
      message: "Survey submitted successfully!",
      recommendations: textResponse.split("\n").filter(line => line.trim() !== ""),
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Something went wrong with Gemini API." });
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
