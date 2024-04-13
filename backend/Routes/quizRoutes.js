const express = require("express");
const router = express.Router();
const Quiz = require("../Models/quiz");

const quizController = require('../Controllers/quizController');


router.post('/quizzes', quizController.createQuiz);
router.post('/add-question', async (req, res) => {
  try {
    const { quizId, question, answers, correctAnswerIndex, imagePath, questiontype } = req.body;

    // Validate request body
   

    // Find or create the quiz
    let quiz;
    if (quizId) {
      quiz = await Quiz.findById(quizId);
    
    } else {
      quiz = new Quiz({ questions: [] });
    }

    // Create a new question object
    const newQuestion = {
      questionText: question,
      options: answers || [],
      correctAnswers: [answers[correctAnswerIndex]],
      questionType: questiontype || null,
      imagePath: imagePath || null, // Include imagePath if provided
    };

    // Add the new question to the questions array of the quiz
    quiz.questions.push(newQuestion);

    // Save the updated quiz to the database
    await quiz.save();

    res.status(201).json({ message: 'Question added successfully', quiz });
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
