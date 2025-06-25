import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { DarkModeContext } from "../App";
import { useContext } from "react";

export default function SubmitBlogContest() {
  const { contestId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const location = useLocation();
  const contest = location.state?.contest;
  const { darkMode } = useContext(DarkModeContext);

  const handleSubmit = async (e)=> {
    e.preventDefault();
    // Submit blog logic here
    const blogData = {
      contestID: contestId,
      title,
      content,
      contestName: contest.name,
      type: "contest",
    };
    
    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit blog");
      }

      console.log("Blog submitted successfully:", data);

      // Optionally reset form
      setTitle("");
      setContent("");

      // Optionally redirect user or show a success message here

    } catch (error) {
      console.error("Error submitting blog:", error.message);
      // Optionally show error to user
    }
  }

  return (
    <div className="flex justify-center mt-20 ">
      <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'} w-[600px] h-fit mx-auto p-6 shadow rounded-xl`}>
        <h2 className="text-xl mb-4">
          Write a Blog for{" "}
          <span className="font-semibold">{contest.name}</span> 
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold ">Title</label>
          <input
            className={`${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-black border-gray-300'} w-full p-2 mb-4 border rounded-md"`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label className="block mb-2 font-semibold">Content</label>
          <textarea
            className={`${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-black border-gray-300'} w-full p-2 h-80 border rounded-md"`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Blog
          </button>
        </form>
      </div>
    </div>
  );
}
