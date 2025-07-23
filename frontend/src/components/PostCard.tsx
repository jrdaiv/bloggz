import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

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

export default function PostCard({ post, onDelete }: PostCardProps) {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleEdit = (_id: string) => {
    console.log("Navigating to:", `/edit/${post._id}`);
    console.log(post);
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
    <div className="w-full">
      <Card
        className="bg-transparent/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <CardHeader
          className="text-xl font-semibold text-white p-4 border-b border-white/20 drop-shadow-md"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {post.title.substring(0, 50)}
        </CardHeader>

        <CardBody
          className="p-4 text-white/90 drop-shadow-md"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <p className="mb-2">{post.content.substring(0, 1000)}</p>
          <p className="text-sm">
            - {post.author} on {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </CardBody>

        <CardFooter
          className="p-4 flex justify-end gap-2 border-t border-white/20"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Button
            onClick={() => handleEdit(post._id)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md drop-shadow-md"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Edit
          </Button>

          <Button
            onClick={() => handleDelete(post._id)}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md drop-shadow-md"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
