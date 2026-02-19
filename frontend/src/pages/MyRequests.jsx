import React, { useEffect, useState } from 'react';
import api from '../services/api.js';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');

  const loadRequests = async () => {
    try {
      const { data } = await api.get('/api/request/my-requests');
      setRequests(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load requests');
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <div className="container">
      <h2>My Requests</h2>
      {error && <div className="alert">{error}</div>}
      <div className="list" style={{ marginTop: 12 }}>
        {requests.map((req) => (
          <div className="card" key={req._id}>
            <div className="flex-between">
              <div>
                <div style={{ fontWeight: 700 }}>{req.foodId?.title}</div>
                <div style={{ fontSize: 13, color: '#475569' }}>{req.foodId?.quantity}</div>
              </div>
              <span className="badge" style={{ background: req.status === 'approved' ? '#16a34a' : '#ea580c', color: '#fff' }}>
                {req.status}
              </span>
            </div>
            <div style={{ fontSize: 13, marginTop: 6 }}>Pickup: {req.foodId ? `${new Date(req.foodId.pickupStartTime).toLocaleString()} - ${new Date(req.foodId.pickupEndTime).toLocaleString()}` : 'N/A'}</div>
            <div style={{ fontSize: 13 }}>Expiry: {req.foodId ? new Date(req.foodId.expiryTime).toLocaleString() : 'N/A'}</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Location: {req.foodId?.location}</div>
          </div>
        ))}
        {requests.length === 0 && <div className="card">No requests yet.</div>}
      </div>
    </div>
  );
};

export default MyRequests;
