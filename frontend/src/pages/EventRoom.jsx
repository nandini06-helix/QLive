import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../socket';
import QuestionCard from '../components/QuestionCard';
import './EventRoom.css';

export default function EventRoom() {
  const { id: eventId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [nickname, setNickname] = useState('');
  const [question, setQuestion] = useState('');
  const [upvotedIds, setUpvotedIds] = useState(new Set());

  useEffect(() => {
    socket.emit('joinEvent', eventId);

    const fetchInitial = async () => {
      const res = await fetch(`/api/questions/${eventId}`);
      const data = await res.json();
      setQuestions(data);
    };
    fetchInitial();

    socket.on('questionAdded', (newQ) => {
      setQuestions(prev => [newQ, ...prev]);
    });

    socket.on('questionUpdated', (updatedQ) => {
      setQuestions(prev => prev.map(q => q._id === updatedQ._id ? updatedQ : q));
    });

    return () => {
      socket.off('questionAdded');
      socket.off('questionUpdated');
    };
  }, [eventId]);

  const submitQuestion = () => {
    if (!question.trim()) return;
    socket.emit('newQuestion', {
      content: question,
      author: nickname.trim() || 'Anonymous',
      eventId
    });
    setQuestion('');
  };

  const upvote = (index) => {
    const questionId = questions[index]._id;
    if (upvotedIds.has(questionId)) {
      alert('You can upvote only once per question!');
      return;
    }
    socket.emit('upvoteQuestion', { eventId, questionId });
    setUpvotedIds(prev => new Set(prev).add(questionId));
  };

  return (
    <div className="event-container">
      <h2 className="event-header">Event: {eventId}</h2>
      <input
        className="question-input"
        placeholder="Your name (optional)"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <textarea
        className="question-input"
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      ></textarea>
      <button className="submit-btn" onClick={submitQuestion}>Submit </button>

      {questions.map((q, i) => (
        <QuestionCard
          key={q._id}
          content={q.content}
          author={q.author}
          votes={q.upvotes}       
          onUpvote={() => upvote(i)}
          disabled={upvotedIds.has(q._id)} 
        />
      ))}
    </div>
  );
}
