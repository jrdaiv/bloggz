// src/components/PostCard.tsx
import { User } from "@/types";
import { Button, Card, CardBody, CardFooter } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommentSection from "./CommentSection";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

interface PostCardProps {
  post: Post;
  onDelete?: (id: string) => void;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function PostCard({ post, onDelete }: PostCardProps) {
  const navigate = useNavigate();
  const [user] = useState<User | null>(null);

  const handleEdit = (_id: string) => {
    console.log("Navigating to:", `/edit/${post._id}`);
    console.log(post);
    console.log("EditPost Loaded");
    try {
      navigate(`/edit/${post._id}`);
    } catch (err) {
      console.error("Navigation failed", err);
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      const response = await fetch(`${backendUrl}/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete post");
      }

      if (onDelete) {
        onDelete(postId);
      }
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  return (
    <div className="w-full max-w-full bg-transparent/10">
      <Card
        className="bg-transparent/10 backdrop-blur-md border transition-transform hover:scale-105 border-white/60 rounded-lg shadow-lg"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <p className="text-xl font-semibold bg-transparent text-white p-4 ">
          {post.title.substring(0, 50)}
        </p>

        {/* Card body with post content and author information */}
        <CardBody
          className="p-4 text-white/90 drop-shadow-md"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <p className="mb-2">{post.content.substring(0, 1000)}</p>
        </CardBody>

        {/* Footer with Edit and Delete buttons */}
        <CardFooter
          className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-2 border-t border-white/20 w-full"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <p className="text-sm text-white sm:order-none">
            - {post.author} on {new Date(post.createdAt).toLocaleDateString()}
          </p>

          {/* Buttons for Edit and Delete actions */}
          <div className="flex flex-col sm:flex-row sm:ml-auto gap-2 w-full sm:w-auto ">
            <Button
            onClick={() => handleEdit(post._id)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md drop-shadow-md sm:w-auto"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Edit Post
          </Button>

          <Button
            onClick={() => handleDelete(post._id)}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md drop-shadow-md sm:w-auto"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Delete Post
          </Button>
          </div>
          

        </CardFooter>
        <CommentSection postId={post._id} />

      </Card>
    </div>
  );
}
