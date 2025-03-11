// Filename - demoapp/app.js

const express = require("express");
const app = express();

// import questions from survey
const surveyQuestions = require("../surveyQuestions.json");

const DEVMODE = true;

app.use(express.json());

// Handle POST request
app.post('/api/survey', (req, res) => {

    // process data
    console.log('\nReceived post request'); 
    //console.log(req.body);
    //console.log(req.body.responses[2]);

    // check for validity
    // js implementation of enum
    const E_VALID = {
        invalid: 0,
        valid: 1,
        dev_valid: 2
    };
    var is_valid = E_VALID.invalid;


    // check for dev mode
    if (DEVMODE) {
        // loop through
        for (let i = 1; i <= 30; i++) {
            const element = req.body.responses[i];
            if (element != null && i == 1) {
                is_valid = E_VALID.dev_valid;
            } else if (element == null && i != 1) {
            } else {
                is_valid = E_VALID.invalid;
            }
        }
        if (is_valid == E_VALID.dev_valid) {
            console.log(" Dev mode activated, allowing incomplete survey. making all answers disagree");
            for (let i = 1; i <= 30; i++) {
                req.body.responses[i] = "Strongly Disagree"; 
            }
        }
    }

    // if not dev, check for normal response
    // break and send error if invalid
    if (!is_valid) {
        for (let i = 1; i <= 30; i++) {
            const element = req.body.responses[i];

            if (element == null) {
                console.log(" Invalid number of responses, rejecting.");
                res.status(418).json({
                    message: "Invalid number of responses",
                    recommendations: ["unemployed"],
                    success: false
                });
                return;
            }
        }
        is_valid = E_VALID.valid;
    }

    var ai_string = generateAISurveyString(surveyQuestions, req);
    console.log(ai_string);

    if (is_valid == E_VALID.dev_valid) {
        res.status(201).json({
            message: 'Data received successfully',
            recommendations: ["developer of SkillMatchAI :)"],
            success: true
        }); 
    }

    // if at this point then it is valid
    if (is_valid == E_VALID.valid) {

        // chatgpt(ai_string);
        var aiResult = ["unemployed"];

        res.status(201).json({
            message: 'Data received successfully',
            recommendations: aiResult,
            success: true
        }); 
    }
});


const PORT = process.env.PORT || 8080;

app.listen(PORT,
    console.log(`Server started on port ${PORT}`)
);


function generateAISurveyString(surveyQuestions, req) {
    var str = "";
    for (let i = 1; i < 30; i++) {
        str += surveyQuestions.questions[i].question + " " + req.body.responses[i] + "\n";
    }

    return str;
}
