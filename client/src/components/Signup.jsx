import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider.jsx';
import PasswordField from "./PasswordField";
import API_BASE_URL from "../config/api";
import registerImage from "../assets/registerImage.png";

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [college, setCollege] = useState('');
  const [year, setYear] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // 👈 NEW
  const [responseMsg, setResponseMsg] = useState('');
  const [passwordError, setPasswordError] = useState(''); // 👈 NEW
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // 👈 NEW: Password validation function
  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError("❌ Passwords do not match");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("❌ Password must be at least 6 characters");
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 👈 NEW: Check password match before sending
    if (!validatePasswords()) {
      return;
    }
    
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        username,
        Email: email,
        password,
        college,
        year,
      });

      console.log("✅ Signup successful", response.data);
      setResponseMsg(response.data.message);

      if (response.data.success) {
        login(response.data.user, response.data.token);
        navigate("/Dashboard");
      }
    } catch (error) {
      console.error("❌ Signup error", error.response?.data || error.message);
      setResponseMsg(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='login-section'>
      <div className="login-container">
        <div className="login-image">
          <img src={registerImage} className='registerImage' alt="Register" />
        </div>
        <div className="login-card">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1>Join Us Today!</h1>

            <label>USERNAME:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label>COLLEGE:</label>
            <input
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              required
            />

            <label>YEAR:</label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />

            <label>EMAIL:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <PasswordField
              id="signup-password"
              label="PASSWORD:"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              hint={(
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "-10px", marginBottom: "15px", textAlign: "left" }}>
                  *Password must be at least 6 characters long
                </p>
              )}
            />
            

            {/* 👈 NEW: Confirm Password Field */}
            <label>CONFIRM PASSWORD:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordError(''); // Clear error when user types
              }}
              required
            />

            {/* 👈 NEW: Password mismatch error message */}
            {passwordError && (
              <p style={{ color: "#ff6b6b", fontSize: "0.85rem", marginTop: "-10px", marginBottom: "15px", textAlign: "left" }}>
                {passwordError}
              </p>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "LOADING..." : "SUBMIT"}
            </button>

            {responseMsg && <p style={{ color: "white" }}>{responseMsg}</p>}

            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;