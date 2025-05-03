// src/pages/Register.jsx

import * as Label from '@radix-ui/react-label';
import { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Registration Data:', formData);
    // Send to backend API here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Create an Account</h1>

        <div className="space-y-2">
          <Label.Root htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </Label.Root>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

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

        <div className="space-y-2">
          <Label.Root htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </Label.Root>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account? <a href="/login" className="text-blue-600 underline">Log In</a>
        </p>
      </form>
    </div>
  );
}
