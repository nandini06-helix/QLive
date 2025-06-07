const express = require('express');
const router = express.Router();
const { getQuestions, createQuestion, upvoteQuestion } = require('../controllers/questionController');

router.get('/:eventId', getQuestions);
router.post('/', createQuestion);
router.put('/upvote/:id', upvoteQuestion);

module.exports = router;
