const Quiz = require('../Models/quiz')

exports.createQuiz = async (req, res) => {
  try {
    const { title, visibility, folder, posterImg, userId } = req.body;
    const quiz = new Quiz({
      title,
      visibility,
      folder,
      posterImg,
      createdBy: userId // Assign userId to the createdBy field
    });

    console.log('Form Data:', req.body);
    const newQuiz = await quiz.save();
    res.status(201).json(newQuiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getQuizzesByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const quizzes = await Quiz.find({ createdBy: userId });
    res.status(200).json({ quizzes });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
