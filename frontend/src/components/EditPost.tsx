// src/components/EditPost.tsx
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null); // Added for error display

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  if (!id) {
    return <div>Post ID is missing</div>;
  }

  useEffect(() => {
    const fetchPost = async () => {
      console.log(
        "Fetching post with id:",
        id,
        "Token:",
        localStorage.getItem("token")
      );
      console.log("EditPost Loaded");
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token missing");
        return;
      }
      try {
        const res = await fetch(`${backendUrl}/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        console.error(err);
        setError("Failed to load post");
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${backendUrl}/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title,
          content,
          _id: id, // Optional: pass _id if your backend requires it in the body
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update post");
      }

      navigate(`/home`);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-transparent/10 pt-28">

      <form
        onSubmit={handleUpdate}
        className="space-y-6 bg-transparent/10 backdrop-blur-md p-8 rounded-xl border border-white/60 w-full max-w-lg"
      >

        <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow-lg">
          Edit Post
        </h2>

        {error && (
          <div className="text-red-500 text-center font-semibold drop-shadow-md">
            {error}
          </div>
        )}

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="w-full text-white placeholder-white bg-transparent backdrop-blur-md border border-white/60 rounded-lg p-3 transition-all drop-shadow-md"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={8}
          className="w-full text-white placeholder-white bg-transparent backdrop-blur-md border border-white/60 rounded-lg p-3 transition-all drop-shadow-md"
        />

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg drop-shadow-md"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Update Post
        </Button>
        
      </form>
    </div>
  );
};

export default EditPost;
