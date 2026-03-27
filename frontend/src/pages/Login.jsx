import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { login as loginRequest } from '../services/auth.js';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const { role: roleParam } = useParams();
  const role = roleParam === 'ngo' ? 'ngo' : 'restaurant';

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
    <div className="container" style={{ maxWidth: 520 }}>
      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <div className="flex-between">
          <h2 style={{ margin: 0 }}>{role === 'restaurant' ? 'Restaurant Login' : 'NGO Login'}</h2>
          <div className="badge">{role.toUpperCase()}</div>
        </div>

        {role === 'restaurant' ? (
          <p className="lead" style={{ color: '#0f172a' }}>
            Turn surplus meals into impact. Sign in to share excess food with nearby NGOs.
          </p>
        ) : (
          <p className="lead" style={{ color: '#0f172a' }}>
            Access the food distribution dashboard to match incoming donations.
          </p>
        )}

        {error && <div className="alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input className="input" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input className="input" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
          <button className="button" type="submit" disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
        </form>

        <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link to="/register" className="button ghost" style={{ padding: '8px 12px' }}>
              Register
            </Link>
          </div>
          <Link to="/" style={{ fontWeight: 600 }}>← Back to home</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
