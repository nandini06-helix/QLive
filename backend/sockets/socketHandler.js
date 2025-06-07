const Question = require('../models/Question');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('joinEvent', (eventId) => {
      socket.join(eventId);
      console.log(`Socket ${socket.id} joined event ${eventId}`);
    });

    socket.on('newQuestion', async (data) => {
      const { eventId, content, anonymous, author } = data;
      const question = new Question({
        eventId,
        content,
        anonymous,
        author: anonymous ? 'Anonymous' : author || 'Anonymous',
      });
      await question.save();

      io.to(eventId).emit('questionAdded', question);
    });

    socket.on('upvoteQuestion', async ({ questionId, eventId }) => {
      const question = await Question.findById(questionId);
      if (question) {
        question.upvotes += 1;
        await question.save();
        io.to(eventId).emit('questionUpdated', question);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};
