import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ login }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      login(res.data.user, res.data.token);
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-primaryGreen mb-4">Login</h2>
      {error && <p className="text-red-500 text-center mb-2">{error}</p>}
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input type="email" placeholder="Email" className="border p-2 rounded" required
          onChange={e => setFormData({ ...formData, email: e.target.value })} />
        <input type="password" placeholder="Password" className="border p-2 rounded" required
          onChange={e => setFormData({ ...formData, password: e.target.value })} />
        <button type="submit" className="bg-primaryGreen text-white p-2 rounded font-bold">Login</button>
      </form>
    </div>
  );
}
