import { useEffect, useState } from "react";
import DefaultProfilePic from "/Profilepic.webp";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types";

export default function Profile() {
  const { token } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user");

        const data = await response.json();
        setUser(data);
        setName(data.name);
        setUsername(data.username);
        setBio(data.bio);
        setAvatarUrl(data.avatarUrl);
      } catch (err: any) {
        console.error("Fetch error:", err.message);
      }
    };

    fetchUser();
  }, [token]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/api/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, username, bio, avatarUrl }),
      });

      if (!response.ok) throw new Error("Update failed");

      const updated = await response.json();
      setUser(updated);
      setIsEditing(false);
    } catch (err: any) {
      console.error("Update error:", err.message);
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="max-w-lg mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Avatar URL</label>
            <input
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="btn bg-blue-600 text-white mr-2">
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="btn bg-gray-400 text-white"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <img
            src={user.avatarUrl || DefaultProfilePic}
            alt="Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-center">{user.name}</h2>
          <p className="text-center text-gray-600">@{user.username}</p>
          <p className="mt-4 text-gray-700">{user.bio || "No bio yet."}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 btn bg-blue-600 text-white"
          >
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
}