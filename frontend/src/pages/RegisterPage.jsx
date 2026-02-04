import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Sprint 1: Register page
const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    // Validate passwords match
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Validate password length
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password });
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <h2>🏦 Create Account</h2>
        <p className="muted">Join Simple Bank today.</p>
        <form className="grid" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              placeholder="Enter your name"
              required 
            />
          </label>
          <label>
            Email
            <input 
              name="email" 
              type="email" 
              value={form.email} 
              onChange={handleChange} 
              placeholder="Enter your email"
              required 
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </label>
          <label>
            Confirm Password
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
        {error && <div className="alert">{error}</div>}
        {message && <div className="alert success">{message}</div>}
        <p className="muted">
          Already have an account? <Link className="link" to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
