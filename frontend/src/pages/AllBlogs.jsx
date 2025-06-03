import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../App';
import axios from 'axios';

export default function AllBlogs() {
  const { darkMode } = useContext(DarkModeContext);
  const [groupedBlogs, setGroupedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupedBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts/grouped-by-problem');
        console.log(response.data); // Debug log to check the response structure
        setGroupedBlogs(response.data);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupedBlogs();
  }, []);

  if (loading) {
    return (
      <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen flex items-center justify-center`}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen transition-colors`}>
      <header className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center">All Blogs</h1>
        <p className="text-center mt-2 text-lg">Explore blogs grouped by Codeforces problems</p>
      </header>

      <main className="container mx-auto px-6 pb-12">
        {groupedBlogs.length === 0 ? (
          <p className="text-center">No blogs found.</p>
        ) : (
          groupedBlogs.map(group => (
            <div key={group._id.problemId} className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                {group._id.problemOrContest} 
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.blogs.map(blog => (
                  <div key={blog._id} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow p-4 rounded-md`}>
                    <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                    <p className="text-sm mb-2">by {blog.author || 'Anonymous'}</p>
                    <Link
                      to={`/blog/${blog._id}`}
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Read Blog →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
