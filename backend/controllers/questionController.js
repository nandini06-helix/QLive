const Question = require('../models/Question');

exports.getQuestions = async (req, res) => {
  try {
    const { eventId } = req.params;
    const questions = await Question.find({ eventId }).sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createQuestion = async (req, res) => {
  try {
    console.log('Incoming body:', req.body); 
    const { eventId, content, anonymous, author } = req.body;

    const question = new Question({
      eventId,
      content,
      anonymous: anonymous !== undefined ? anonymous : true,
      author: anonymous ? 'Anonymous' : author || 'Anonymous',
    });

    await question.save();
    res.status(201).json(question);
  } catch (err) {
    console.error('Error in createQuestion:', err.message); 
    res.status(500).json({ error: 'Server error' });
  }
};


exports.upvoteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    question.upvotes += 1;
    await question.save();
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
