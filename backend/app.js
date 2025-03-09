// Filename - demoapp/app.js

const express = require("express");
const app = express();

// Handle POST request
app.post('/api/survey', (req, res) => {
   
    // Process the data (e.g., save to database)
    console.log('Received post request'); 
    

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

