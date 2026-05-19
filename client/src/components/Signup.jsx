import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider.jsx';
import API_BASE_URL from "../config/api";
import registerImage from "../assets/registerImage.png";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    college: "",
    year: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const yearOptions = [
    "1st Year",
    "2nd Year",
    "3rd Year",
    "4th Year",
    "Final Year",
  ];

  const validateForm = () => {
    const newErrors = {};

    // Username Validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // College Validation
    if (!formData.college.trim()) {
      newErrors.college = "College name is required";
    }

    // Year Validation
    if (!formData.year) {
      newErrors.year = "Please select your current year";
    }

    // Email Validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    // Password Validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters long";
      } else if (!/[A-Z]/.test(formData.password)) {
        newErrors.password =
          "Password must contain at least one uppercase letter";
      } else if (!/[a-z]/.test(formData.password)) {
        newErrors.password =
          "Password must contain at least one lowercase letter";
      } else if (!/[0-9]/.test(formData.password)) {
        newErrors.password = "Password must contain at least one number";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
        newErrors.password =
          "Password must contain at least one special character";
      }
    }

    // Confirm Password Validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Remove error while typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (loading) return; // Prevent duplicate submissions

    setLoading(true);
    setResponseMsg("");

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        username: formData.username,
        Email: formData.email,
        password: formData.password,
        college: formData.college,
        year: formData.year,
      });

      setResponseMsg(response.data.message);

      if (response.data.success) {
        // Optional auto login
        login(response.data.user, response.data.token);

        // Redirect after success
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      console.error("Signup Error:", error);

      setResponseMsg(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.username &&
    formData.college &&
    formData.year &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    Object.keys(errors).filter((key) => errors[key]).length === 0;

  return (
    <section className="login-section">
      <div className="login-container">
        {/* Left Image */}
        <div className="login-image">
          <img
            src={registerImage}
            className="registerImage"
            alt="Student Registration"
          />
        </div>

        {/* Signup Form */}
        <div className="login-card">
          <form
            className="login-form"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Sign Up Form"
          >
            <h1>Create Your Account</h1>

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

            <label>PASSWORD:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "-10px", marginBottom: "15px", textAlign: "left" }}>
              *Password must be at least 6 characters long.
            </p>

            <button type="submit" disabled={loading}>
              {loading ? "JOINING..." : "SUBMIT"}
            </button>

            {/* Login Link */}
            <p className="login-link">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
