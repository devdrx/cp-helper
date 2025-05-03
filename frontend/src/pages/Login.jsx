// src/pages/Login.jsx

import * as Label from '@radix-ui/react-label';
import { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', formData);
    // Call API or Auth handler here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Login to Forum</h1>

        <div className="space-y-2">
          <Label.Root htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </Label.Root>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="space-y-2">
          <Label.Root htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </Label.Root>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Log In
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account? <a href="/register" className="text-blue-600 underline">Sign Up</a>
        </p>
      </form>
    </div>
  );
}
