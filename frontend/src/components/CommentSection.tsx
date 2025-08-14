import { useEffect, useState } from "react";
import axios from "axios";
import { Comment } from "@/types";

interface CommentSectionProps {
  postId: string;
  isLoggedIn: boolean;
  token: string;
  currentUserId?: string;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  isLoggedIn,
  token,
  currentUserId,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/comments/${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!isLoggedIn || !newComment.trim()) return;
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
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments((prev) => prev.filter((comment) => comment._id !== id));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div>
      <h2>Comments</h2>

      {/* Add comment section */}
      {isLoggedIn ? (
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="border p-2 rounded-md flex-1"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </div>
      ) : (
        <p>Please log in to view and add comments.</p>
      )}

      {/* Comments list */}
      <div className="space-y-3">
        {comments.map((comment) => (
          <div key={comment._id} className="p-2 border rounded-md">
            <p className="font-semibold">{comment.author}</p>
            <p>{comment.content}</p>
            {comment.userId === currentUserId && (
              <button
                onClick={() => handleDeleteComment(comment._id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            )}
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
