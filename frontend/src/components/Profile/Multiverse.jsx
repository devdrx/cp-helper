import React, { useState } from 'react';
export default function Multiverse({ darkMode }) {
  const [formData, setFormData] = useState({ codeforces: '', codechef: '', leetcode: '' });
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
        setLoading(false);
        return;
      }
      const data = await res.json();
      console.log('Fetched stats:', data);
      setStats(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCount = (platform) =>
    stats?.[platform]?.problemsSolved ?? stats?.[platform]?.solvedCount ?? 0;

  const total = stats
    ? getCount('codeforces') + getCount('codechef') + getCount('leetcode')
    : 0;

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen transition-colors`}>
      <header className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center">Multiverse</h1>
        <p className="text-center mt-2 text-lg">Add your coding platform IDs to fetch your problem-solving stats</p>
      </header>

      <main className="container mx-auto px-6 pb-12">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} max-w-xl mx-auto p-6 rounded-md shadow`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {['codeforces', 'codechef', 'leetcode'].map((platform) => (
              <div key={platform}>
                <label htmlFor={platform} className="block mb-1 font-semibold capitalize">
                  {platform} ID
                </label>
                <input
                  type="text"
                  id={platform}
                  name={platform}
                  value={formData[platform]}
                  onChange={handleChange}
                  placeholder={`Enter your ${platform} ID`}
                  className={`w-full px-3 py-2 rounded border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-black border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            ))}
            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Submit
            </button>
          </form>
          {loading && <div className="mt-6 text-center">Loading...</div>}
          {stats && !loading && (
            <div className="mt-6 p-4 bg-green-100 rounded">
              <h2 className="text-2xl font-semibold mb-2">Your Stats</h2>
              <p>Total questions solved: {total}</p>
              <ul className="list-disc pl-5">
                <li>Codeforces: {getCount('codeforces')}</li>
                <li>CodeChef: {getCount('codechef')}</li>
                <li>LeetCode: {getCount('leetcode')}</li>
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
