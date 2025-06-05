import React, { useState, useContext } from 'react';
// import { DarkModeContext } from '../App';

export default function Multiverse({darkMode}) {
//   const { darkMode } = useContext(DarkModeContext);

  const [formData, setFormData] = useState({
    codeforces: '',
    codechef: '',
    leetcode: '',
    atcoder: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch('http://localhost:5000/api/users/multiverse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (res.status !== 200) {
        console.error('Failed to submit IDs:', res.statusText);
        return;
      }
  
      const data = await res.json();
      console.log('Response data:', data);
  
      // Optional: Handle the data here (e.g., set it in state)
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <div
      className={`${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      } min-h-screen transition-colors`}
    >
      <header className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center">Multiverse</h1>
        <p className="text-center mt-2 text-lg">
          Add your coding platform IDs to fetch your problem-solving stats
        </p>
      </header>

      <main className="container mx-auto px-6 pb-12">
        <div
          className={`${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } max-w-xl mx-auto p-6 rounded-md shadow`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {['codeforces', 'codechef', 'leetcode', 'atcoder'].map((platform) => (
              <div key={platform}>
                <label
                  htmlFor={platform}
                  className="block mb-1 font-semibold capitalize"
                >
                  {platform} ID
                </label>
                <input
                  type="text"
                  id={platform}
                  name={platform}
                  value={formData[platform]}
                  onChange={handleChange}
                  placeholder={`Enter your ${platform} ID`}
                  className={`w-full px-3 py-2 rounded border ${
                    darkMode
                      ? 'bg-gray-700 text-white border-gray-600'
                      : 'bg-gray-100 text-black border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
