import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { Post } from '@/types';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setPosts(data); // No transformation needed, use _id directly
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        alert('Failed to fetch posts');
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = (postId: string) => {
    setPosts(posts.filter((post) => post._id !== postId));
  };

  return (
    <div className="min-h-screen bg-transparent px-20 py-20">
      <h1 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-md">Blog Posts</h1>
      <div className="container mx-auto flex flex-col gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}