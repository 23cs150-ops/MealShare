import React, { useEffect, useState } from 'react';
import api from '../services/api.js';

const initialForm = {
  title: '',
  quantity: '',
  expiryTime: '',
  pickupStartTime: '',
  pickupEndTime: '',
  location: ''
};

const StatusBadge = ({ status }) => {
  const colors = {
    available: '#16a34a',
    requested: '#ea580c',
    collected: '#2563eb',
    expired: '#6b7280'
  };
  return (
    <span className="badge" style={{ background: colors[status] || '#e2e8f0', color: '#fff' }}>
      {status}
    </span>
  );
};

const StatCard = ({ label, value }) => (
  <div className="card" style={{ textAlign: 'center' }}>
    <div style={{ fontSize: 13, color: '#475569' }}>{label}</div>
    <div style={{ fontSize: 24, fontWeight: 700 }}>{value}</div>
  </div>
);

const RestaurantDashboard = () => {
  const [form, setForm] = useState(initialForm);
  const [foods, setFoods] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const [foodRes, statsRes] = await Promise.all([
        api.get('/api/food/my-food'),
        api.get('/api/stats/restaurant-summary')
      ]);
      setFoods(foodRes.data);
      setStats(statsRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/api/food', form);
      setForm(initialForm);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add food');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    setError('');
    try {
      await api.put(`/api/food/${id}/status`, { status });
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
    }
  };

  return (
    <div className="container">
      <h2>Restaurant Dashboard</h2>
      {error && <div className="alert">{error}</div>}

      <h3>Statistics</h3>
      {stats && (
        <div className="stats-grid">
          <StatCard label="Total Food Posted" value={stats.totalFoodPosted} />
          <StatCard label="Total Food Collected" value={stats.totalFoodCollected} />
          <StatCard label="Total Requested" value={stats.totalRequested} />
          <StatCard label="Total Expired" value={stats.totalExpired} />
        </div>
      )}

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Add Food</h3>
        <form onSubmit={handleCreate}>
          <label style={{ display: 'block', fontSize: 13, color: '#475569', marginBottom: 4 }}>Title</label>
          <input className="input" name="title" placeholder="e.g., Veg Curry Trays" value={form.title} onChange={handleChange} />

          <label style={{ display: 'block', fontSize: 13, color: '#475569', marginBottom: 4 }}>Quantity</label>
          <input className="input" name="quantity" placeholder="e.g., 10 portions" value={form.quantity} onChange={handleChange} />

          <label style={{ display: 'block', fontSize: 13, color: '#475569', marginBottom: 4 }}>Pickup start</label>
          <input className="input" type="datetime-local" name="pickupStartTime" value={form.pickupStartTime} onChange={handleChange} />

          <label style={{ display: 'block', fontSize: 13, color: '#475569', marginBottom: 4 }}>Pickup end</label>
          <input className="input" type="datetime-local" name="pickupEndTime" value={form.pickupEndTime} onChange={handleChange} />

          <label style={{ display: 'block', fontSize: 13, color: '#475569', marginBottom: 4 }}>Expiry</label>
          <input className="input" type="datetime-local" name="expiryTime" value={form.expiryTime} onChange={handleChange} />

          <label style={{ display: 'block', fontSize: 13, color: '#475569', marginBottom: 4 }}>Pickup location</label>
          <input className="input" name="location" placeholder="Address or pickup point" value={form.location} onChange={handleChange} />

          <button className="button" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Post Food'}</button>
        </form>
      </div>

      <h3 style={{ marginTop: 24 }}>My Food</h3>
      <div className="list">
        {foods.map((food) => (
          <div className="card" key={food._id}>
            <div className="flex-between">
              <div style={{ fontWeight: 700 }}>{food.title}</div>
              <StatusBadge status={food.status} />
            </div>
            <div style={{ fontSize: 14, color: '#475569' }}>{food.quantity}</div>
            <div style={{ fontSize: 13, marginTop: 8 }}>Pickup: {new Date(food.pickupStartTime).toLocaleString()} - {new Date(food.pickupEndTime).toLocaleString()}</div>
            <div style={{ fontSize: 13 }}>Expiry: {new Date(food.expiryTime).toLocaleString()}</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Location: {food.location}</div>
            <div className="flex" style={{ marginTop: 8 }}>
              {food.status !== 'collected' && food.status !== 'expired' && (
                <button className="button secondary" onClick={() => updateStatus(food._id, 'collected')}>Mark Collected</button>
              )}
              {food.status !== 'expired' && food.status !== 'collected' && (
                <button className="button" style={{ background: '#6b7280' }} onClick={() => updateStatus(food._id, 'expired')}>Expire</button>
              )}
            </div>
          </div>
        ))}
        {foods.length === 0 && <div className="card">No food posted yet.</div>}
      </div>
    </div>
  );
};

export default RestaurantDashboard;
