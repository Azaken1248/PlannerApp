import React from 'react';
import AuthForm from "../components/AuthForm";
import '../styles/LoginSignupPage.css';

function LoginSignupPage({ setCurrentPage }) {
  return (
    <div className="login-signup-page">
      <h1>Tourismo</h1>
      <div>
        <AuthForm mode="login" setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
}

export default LoginSignupPage;
