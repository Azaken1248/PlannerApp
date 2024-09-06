import React, { useState } from 'react';
import LoginSignupPage from './pages/LoginSignupPage';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  const [page, setCurrentPage] = useState("auth");

  if (page === "auth") {
    return <LoginSignupPage setCurrentPage={setCurrentPage} />;
  } else if (page === "home") {
    return <HomePage />;
  }
}

export default App;
