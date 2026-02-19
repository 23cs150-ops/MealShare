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
      {error && <div className="alert">{error}</div>}
      {message && <div className="success">{message}</div>}
      <div className="list" style={{ marginTop: 12 }}>
        {foods.map((food) => (
          <div className="card" key={food._id}>
            <div className="flex-between">
              <div>
                <div style={{ fontWeight: 700 }}>{food.title}</div>
                <div style={{ fontSize: 13, color: '#475569' }}>{food.quantity}</div>
              </div>
            </div>
            <div style={{ fontSize: 13, marginTop: 6 }}>Pickup: {new Date(food.pickupStartTime).toLocaleString()} - {new Date(food.pickupEndTime).toLocaleString()}</div>
            <div style={{ fontSize: 13 }}>Expiry: {new Date(food.expiryTime).toLocaleString()}</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Location: {food.location}</div>
            <button className="button" style={{ marginTop: 8 }} disabled={loading} onClick={() => requestFood(food._id)}>
              {loading ? 'Processing...' : 'Request'}
            </button>
          </div>
        ))}
        {foods.length === 0 && <div className="card">No available food right now.</div>}
      </div>
    </div>
  );
};

export default NGODashboard;
