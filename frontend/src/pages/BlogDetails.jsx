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
  const [commentText, setCommentText] = useState('');
  const [userId, setUserId] = useState('6836215d10e1895a88fa59e2'); // Replace with actual auth system

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`https://cp-helper-i6xy.onrender.com/api/posts/blog/${id}`);
      setBlog(res.data);
    } catch (err) {
      console.error("Failed to fetch blog:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleLike = async () => {
    try {
      await axios.put(
        `https://cp-helper-i6xy.onrender.com/api/posts/like/${id}`,
        {}, // request body (empty in this case)
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // attach token here
          },
          withCredentials: true, // include cookies if needed
        }
      );
      fetchBlog();
    } catch (err) {
      console.error('Failed to like post:', err);
    }
  };
  

  const handleDislike = async () => {
    try {
      await axios.put(`https://cp-helper-i6xy.onrender.com/api/posts/dislike/${id}`,
        {}, // request body (empty in this case)
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // attach token here
          },
          withCredentials: true, // include cookies if needed
        }
      );
      fetchBlog();
    } catch (err) {
      console.error('Failed to dislike post:', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
  
    try {
      await axios.post(
        `https://cp-helper-i6xy.onrender.com/api/posts/comment/${id}`,
        {
          by: userId,
          content: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // attach the auth token here
          },
          withCredentials: true, // optional: include cookies if your backend uses them
        }
      );
  
      setCommentText('');
      fetchBlog();
    } catch (err) {
      console.error('Failed to submit comment:', err);
    }
  };
  

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
    <div className={`${darkMode ? 'bg-gray-900 text-white' : ' text-gray-900'} min-h-screen transition-colors`}>
      <div className={`${darkMode ? 'bg-gray-900 text-white' : ' text-gray-900'}  border rounded-md mt-10 container mx-auto px-6 py-12 max-w-4xl`}>
        <Link to="/allblogs" className="text-blue-500 hover:underline text-sm">&larr; Back to all blogs</Link>

        <h1 className="text-3xl font-bold mt-4 mb-2">{blog.title}</h1>
        <p className={`${darkMode ? 'bg-gray-900 text-gray-400' : ' text-gray-500'} p-1 text-sm  mb-4 `}>
          by <span className="font-medium">{blog.author || 'Anonymous'}</span> •{' '}
          {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
        </p>

        <div className="mb-6">
          <p className="text-lg"><strong>{blog.type==="problem"?<span>Problem:</span>:<span>Contest:</span>}</strong> {blog.problemName} (ContestID {blog.contestID})</p>
          {blog.type==="problem" && (<a
            href={`https://codeforces.com/problemset/problem/${blog.contestID}/${blog.problemIndex}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View Problem on Codeforces →
          </a>)}
            {blog.type==="contest" && (<a
            href={`https://codeforces.com/contest/${blog.contestID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
            >
            View Contest on Codeforces →
            </a>)}

        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'}  p-4 prose dark:prose-invert mb-10 mt-6`}>
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

        <div className="flex gap-4 items-center text-sm text-gray-600 dark:text-gray-300 mt-6">
          <button onClick={handleLike} className="hover:underline">👍 {blog.likes?.length || 0} Likes</button>
          <button onClick={handleDislike} className="hover:underline">👎 {blog.dislikes?.length || 0} Dislikes</button>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Comments ({blog.comments?.length || 0})</h2>

          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-500'} text-black w-full p-3 border rounded`}
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Post Comment
            </button>
          </form>

          <div className="space-y-4">
            {blog.comments.map((comment, index) => (
              <div key={index} className="border-b pb-2">
                <span className="text-sm ">By:</span> <span className="text-sm font-bold">{comment.by.userName.charAt(0).toUpperCase() + comment.by.userName.slice(1)}</span>
                <p className={`${darkMode ? ' text-gray-200' : ' text-gray-700'}`}>{comment.content}</p>
                <p className={`${darkMode ? ' text-gray-400' : ' text-gray-500'} text-xs dark:text-gray-400`}>
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
