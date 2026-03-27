import React, { useEffect, useState } from 'react';
import api from '../services/api.js';

const NGODashboard = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadFoods = async () => {
    try {
      const { data } = await api.get('/api/food');
      setFoods(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load food');
    }
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const requestFood = async (foodId) => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await api.post('/api/request', { foodId });
      setMessage('Request submitted');
      await loadFoods();
    } catch (err) {
      setError(err.response?.data?.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>NGO Dashboard</h2>
      <p style={{ marginTop: -8, color: '#475569' }}>Review available food and send a request during the pickup window.</p>
      {error && <div className="alert">{error}</div>}
      {message && <div className="success">{message}</div>}
      <div className="list" style={{ marginTop: 12 }}>
        {foods.map((food) => (
          <div className="card" key={food._id}>
            <div className="flex-between" style={{ marginBottom: 6 }}>
              <div>
                <div style={{ fontWeight: 700 }}>{food.title}</div>
                <div style={{ fontSize: 13, color: '#475569' }}>{food.quantity}</div>
              </div>
              <span className="badge" style={{ background: '#16a34a', color: '#fff' }}>Available</span>
            </div>
            <div style={{ fontSize: 13, marginTop: 6 }}>
              <strong>Pickup window:</strong> {new Date(food.pickupStartTime).toLocaleString()} — {new Date(food.pickupEndTime).toLocaleString()}
            </div>
            <div style={{ fontSize: 13, marginTop: 4 }}>
              <strong>Expiry:</strong> {new Date(food.expiryTime).toLocaleString()}
            </div>
            <div style={{ fontSize: 13, marginTop: 4 }}>
              <strong>Location:</strong> {food.location}
            </div>
            <div style={{ fontSize: 13, marginTop: 8, color: '#475569' }}>
              You can only request if the current time is within the pickup window.
            </div>
            <button
              className="button"
              style={{ marginTop: 10 }}
              disabled={loading}
              onClick={() => requestFood(food._id)}
            >
              {loading ? 'Processing...' : 'Request this food'}
            </button>
          </div>
        ))}
        {foods.length === 0 && <div className="card">No available food right now.</div>}
      </div>
    </div>
  );
};

export default NGODashboard;
