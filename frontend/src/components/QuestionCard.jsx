import React from 'react';
import './QuestionCard.css';

export default function QuestionCard({ content, author, votes, onUpvote, disabled }) {
  return (
    <div className="question-card">
      <div className="question-content">{content}</div>
      <div className="question-meta">
        <span>By {author || "Anonymous"}</span>
        <button onClick={onUpvote} className="upvote-btn" disabled={disabled}>
          👍 {votes}
        </button>
      </div>
    </div>
  );
}
