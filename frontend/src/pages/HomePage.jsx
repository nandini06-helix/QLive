import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

export default function HomePage() {
  const [eventId, setEventId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const joinEvent = () => {
    if (eventId.trim()) navigate(`/event/${eventId}`);
  };

  const createEvent = async () => {
    if (!title.trim()) return alert('Title is required');
    try {
      const res = await axios.post('http://localhost:5000/api/events', {
        title,
        description
      });
      navigate(`/event/${res.data._id}`);
    } catch (err) {
      console.error('Error creating event:', err);
      alert('Failed to create event');
    }
  };

  return (
    <div className="container">
      <div className="app-name">
        <h1>Welcome to QLive👋</h1>
      </div>
      <h1>Join an Event✨</h1>
      <input
        type="text"
        placeholder="Enter Event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
      />
      <button onClick={joinEvent}>Join</button>

      <h1 style={{ color: '#F472B6', fontSize: '30px' }}>OR</h1>
      <h1>Create a New Event📆</h1>
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Event Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button onClick={createEvent}>Create Event</button>
    </div>
  );
}
