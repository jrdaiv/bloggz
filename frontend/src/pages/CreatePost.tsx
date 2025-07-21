import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [error, setError] = useState<string | null>(null); // Added for error display
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("/api/posts", {
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
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
      <form onSubmit={handleSubmit} className="space-y-6 bg-transparent backdrop-blur-lg p-8 sm:p-10 rounded-xl border border-white/30 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow-lg">Create Post</h2>
        {error && <div className="text-red-500 text-center font-semibold drop-shadow-md">{error}</div>}
        <div className="w-full">
          <Input
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            className="w-full border-white/40 rounded-lg p-3 bg-transparent text-white placeholder-white/70 focus:ring-2 focus:ring-blue-500 drop-shadow-md"
          />
        </div>
        <div className="w-full">
          <Textarea
            placeholder="Content"
            rows={8}
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            required
            className="w-full border-white/40 rounded-lg p-3 bg-transparent text-white placeholder-white/70 focus:ring-2 focus:ring-blue-500 drop-shadow-md"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg drop-shadow-md"
        >
          Create Post
        </Button>
      </form>
    </div>
  );
}