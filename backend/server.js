const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
const questionRoutes = require('./routes/questionRoutes');
const socketHandler = require('./sockets/socketHandler');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: { origin: '*' },
});

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/questions', questionRoutes);
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});


socketHandler(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
