import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { DarkModeContext } from '../App';
import { formatDistanceToNow } from 'date-fns';

export default function BlogDetail() {
  const { id } = useParams();
  const { darkMode } = useContext(DarkModeContext);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/blog/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen flex items-center justify-center`}>
        <p>Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-xl">
        Blog not found.
      </div>
    );
  }

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray text-gray-900'} min-h-screen transition-colors`}>
      <div className="bg-white border rounded-md mt-10 container mx-auto px-6 py-12 max-w-4xl">
        <Link to="/allblogs" className="text-blue-500 hover:underline text-sm">&larr; Back to all blogs</Link>

        <h1 className="text-3xl font-bold mt-4 mb-2">{blog.title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          by <span className="font-medium">{blog.author || 'Anonymous'}</span> •{" "}
          {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
        </p>

        <div className="mb-6">
          <p className="text-lg"><strong>Problem:</strong> {blog.problemName} (ContestID {blog.contestID})</p>
          <a
        //   https://codeforces.com/problemset/problem/2084/D
            href={`https://codeforces.com/problemset/problem/${blog.contestID}/${blog.problemIndex}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View Problem on Codeforces →
          </a>
        </div>

        <div className="bg-gray-50 max-w-[700px] p-4 prose dark:prose-invert  mb-40 mt-10">
          <p>{blog.content}</p>
        </div>

        {blog.tags && blog.tags.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Tags:</h2>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm dark:bg-blue-800 dark:text-white">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="text-sm text-gray-600 dark:text-gray-400 mt-8">
          {blog.likes?.length || 0} likes • {blog.dislikes?.length || 0} dislikes • {blog.comments?.length || 0} comments
        </div>
      </div>
    </div>
  );
}
