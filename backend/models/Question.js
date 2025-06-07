const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  content: { type: String, required: true },
  anonymous: { type: Boolean, default: true },
  author: { type: String, default: 'Anonymous' },
  upvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Question', QuestionSchema);
