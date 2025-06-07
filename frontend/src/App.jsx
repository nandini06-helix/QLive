import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventRoom from './pages/EventRoom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/event/:id" element={<EventRoom />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
