// Filename - demoapp/app.js

const express = require("express");
const app = express();

// import questions from survey
const surveyQuestions = require("../surveyQuestions.json");

app.use(express.json());

// Handle POST request
app.post('/api/survey', (req, res) => {

    // process data
    console.log('\nReceived post request'); 
    //console.log(req.body);
    //console.log(req.body.responses[2]);
    
    for (let i = 1; i <= 30; i++) {
      const element = req.body.responses[i];
      if (element == null) {
        console.log("Invalid number of responses, rejecting.");

        res.status(400).json({
          message: "Invalid number of responses",
          recommendations: ["unemployed"],
          success: false
        });

        return;
      }

      console.log(element);
    }

    res.status(201).json({
        message: 'Data received successfully',
        recommendations: [ "mc donalds :)", "wendys :(", "waffle house"],
        success: true
    });
});


const PORT = process.env.PORT || 8080;

app.listen(PORT,
    console.log(`Server started on port ${PORT}`)
);

