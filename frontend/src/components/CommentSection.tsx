// src/components/CommentSection.tsx

import { useEffect, useState } from "react";
import axios from "axios";
import { Comment } from "@/types";

interface CommentSectionProps {
  postId: string;
  isLoggedIn: boolean;
  token: string;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  isLoggedIn,
  token,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/comments/${postId}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!isLoggedIn) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/comments`,
        { content: newComment, postId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments((prev) => [response.data, ...prev]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (id: string) => {
    if (!isLoggedIn) return;

    try {
      await axios.delete(`${backendUrl}/api/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComments(comments.filter((comment) => comment._id !== id));
    } catch (error) {
      console.error("Error deleting comment:", error);
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
          <div key={comment._id}>
            <p>{comment.content}</p>
            <button onClick={() => handleDeleteComment(comment._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
