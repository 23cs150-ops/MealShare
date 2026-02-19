import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register as registerRequest } from '../services/auth.js';
import { useAuth } from '../context/AuthContext.jsx';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'restaurant' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await registerRequest(form);
      login(data);
      navigate(form.role === 'restaurant' ? '/restaurant' : '/ngo');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <div className="card">
        <h2>Register</h2>
        {error && <div className="alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input className="input" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          <input className="input" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input className="input" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
          <select className="select" name="role" value={form.role} onChange={handleChange}>
            <option value="restaurant">Restaurant</option>
            <option value="ngo">NGO</option>
          </select>
          <button className="button" type="submit" disabled={loading}>{loading ? 'Loading...' : 'Register'}</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
