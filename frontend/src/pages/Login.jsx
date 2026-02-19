import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginRequest } from '../services/auth.js';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
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
      const { data } = await loginRequest(form);
      login(data);
      navigate(data.user.role === 'restaurant' ? '/restaurant' : '/ngo');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <div className="card">
        <h2>Login</h2>
        {error && <div className="alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input className="input" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input className="input" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
          <button className="button" type="submit" disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
