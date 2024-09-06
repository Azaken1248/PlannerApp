import React, { useState } from "react";
import '../styles/AuthForm.css';

const AuthForm = ({ setCurrentPage }) => {
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: mode === "signup" ? "" : undefined,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming login/signup is always successful
    setCurrentPage("home"); // Switch to home page after login/signup
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "login" ? "signup" : "login"));
    setFormData({
      email: "",
      password: "",
      confirmPassword: mode === "signup" ? "" : undefined,
    });
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">
        {mode === "login" ? "Login to Your Account" : "Create an Account"}
      </h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {mode === "signup" && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        )}

        <button type="submit">
          {mode === "login" ? "Login" : "Sign Up"}
        </button>

        <div className="auth-footer">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <a href="#" onClick={toggleMode}>
                Sign up
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href="#" onClick={toggleMode}>
                Login
              </a>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
