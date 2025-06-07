const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newEvent = new Event({ title, description });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
