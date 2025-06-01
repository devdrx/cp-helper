import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";

export default function SubmitBlog() {
  const { problemID } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const location = useLocation();
  const problem = location.state?.problem;
  console.log("Problem from state:", problem);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit blog logic here
    // console.log({ problemID, index, title, content });
    const blogData = {
      problemID,
      title,
      content,
      problemName: problem.problem.name,
      problemIndex: problem.problem.index,
      tags: problem.problem.tags,
      contestID: problem.problem.contestId,
      //   contestName: problem.problem.contestName,
    };
    console.log("Submitting blog data:", blogData);
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
  };

  return (
    <div className="flex justify-center mt-20 bg-gray-100">
      <div className="w-[600px] h-fit mx-auto p-6 bg-gray-200 shadow rounded-xl">
        <h2 className="text-xl mb-4">
          Write a Blog for{" "}
          <span className="font-semibold">{problem.problem.name}</span> problem
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold ">Title</label>
          <input
            className="w-full p-2 mb-4 border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label className="block mb-2 font-semibold">Content</label>
          <textarea
            className="w-full p-2 h-80 border rounded-md"
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
