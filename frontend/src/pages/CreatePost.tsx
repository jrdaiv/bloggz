// src/pages/CreatePost.tsx
import { Button } from "@material-tailwind/react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [error, setError] = useState<string | null>(null); // Added for error display
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(`${backendUrl}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create post");
      }
      navigate("/home");
    } catch (error: any) {
      console.error("Failed to create post", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center max-w-lg mx-auto mt-16 p-6 text-white rounded-lg bg-transparent shadow-md">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-transparent/20 backdrop-blur-md p-8 sm:p-10 rounded-2xl border border-white/60 w-full max-w-lg shadow-xl"
      >
        <h2 className="text-3xl font-bold underline text-white text-center drop-shadow-lg">
          Create Post
        </h2>

        {error && (
          <div className="bg-red-500/20 border border-red-400 text-red-300 px-4 py-2 rounded-md text-center font-semibold">
            {error}
          </div>
        )}

        {/* Title */}
        <div className="w-full">

          <label
            htmlFor="title"
            className="block text-sm font-medium text-white mb-2"
          >
            Title
          </label>

          <input
            id="title"
            placeholder="Enter post title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            className="w-full rounded-lg p-3 bg-transparent text-white placeholder-white border border-white/60  transition-all drop-shadow-md"
          />

        </div>

        {/* Content */}
        <div className="w-full">

          <label
            htmlFor="content"
            className="block text-sm font-medium text-white mb-2"
          >
            Content
          </label>

          <textarea
            id="content"
            placeholder="Write your post content..."
            rows={8}
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            required
            className="w-full rounded-lg p-3 bg-transparent text-white placeholder-white border border-white/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/70 transition-all drop-shadow-md"
          />

        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Create Post
        </Button>
      </form>
    </div>
  );
}
