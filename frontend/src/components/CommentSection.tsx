// src/components/CommentSection.tsx

import { useEffect, useState } from "react";
import axios from "axios";
import { Comment } from "@/types";
import { useAuth } from "@/context/AuthContext";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const CommentSection: React.FC<{ postId: string }> = ({ postId }) => {
  const { token, isLoggedIn } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    console.log("Backend URL:", backendUrl);
    if (!isLoggedIn) return;
    if (!postId) return;
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/comments/${postId}`
        );
        setComments(response.data);
      } catch (error: any) {
        console.error(
          "Error fetching comments:",
          error.response?.data || error.message
        );
        // Optionally show a user-facing error
        console.log("Failed to load comments. Please try again later.");
      }
    };
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!isLoggedIn) return;
    console.log("Sending comment:", { content: newComment, postId, token });
    try {
      const response = await axios.post(
        `${backendUrl}/api/comments`,
        { content: newComment, postId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Comment added:", response.data);
      setComments((prev) => [response.data, ...prev]);
      setNewComment("");
    } catch (error: any) {
      console.error(
        "Error adding comment:",
        error.response?.data || error.message
      );
      console.log("Failed to add comment. Please try again.");
    }
  };

  const handleDeleteComment = async (id: string) => {
    if (!isLoggedIn) return;
    console.log("Deleting comment ID:", id);
    try {
      await axios.delete(`${backendUrl}/api/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(comments.filter((comment) => comment._id !== id));
    } catch (error: any) {
      console.error(
        "Error deleting comment:",
        error.response?.data || error.message
      );
      if (error.response?.status === 403) {
        alert("You are not authorized to delete this comment.");
      }
    }
  };

  return (
    <div>
      {/* <h2>Comments</h2> */}

      {/* Add comment section */}
      {isLoggedIn ? (
        <div>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="border p-2 rounded-md"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md drop-shadow-md"
          >
            Submit
          </button>
        </div>
      ) : (
        <p className="text-white">Please log in to view and add comments.</p>
      )}

      {/* Comments list */}
      <div>
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="border-b border-gray-300 py-2 flex justify-between items-center"
          >
            <div className=" ">
              <p className="text-white/90 ">{comment.content}</p>
              <p className="text-sm text-white/60">
                - {comment.author} on{" "}
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
            {isLoggedIn && (
              <button
                onClick={() => handleDeleteComment(comment._id)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-md drop-shadow-md"
              >
                Delete Comment
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
