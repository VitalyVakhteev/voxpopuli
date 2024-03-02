import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/Home'; // Assume this is your Home component
import PollPage from './PollPage/PollPage'; // Assume this is your PollPage component

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<PollPage />} />
      </Routes>
    </Router>
  );
}

export default App;
