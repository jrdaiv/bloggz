import { useEffect, useState } from "react";
import DefaultProfilePic from "/Profilepic.webp";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types";
import { Button } from "@material-tailwind/react";

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
  console.log("Token:", token);
  console.log("Backend URL:", backendUrl);
  const fetchUser = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      
      console.log("Response status:", response.status); // Debug status
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error data:", errorData); // Debug error response
        throw new Error(`Failed to fetch user: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("User data:", data);
      setUser(data);
      setName(data.name || "");
      setUsername(data.username || "");
      setBio(data.bio || "");
      setAvatarUrl(data.avatarUrl || "");
    } catch (err: any) {
      console.error("Fetch error:", err.message);
    }
  };

  if (token) {
    fetchUser();
  } else {
    console.error("No token found");
  }
}, [token, backendUrl]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/api/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, username, bio, avatarUrl }),
      });

      if (!response.ok) {
        throw new Error(`Update failed: ${response.status} ${response.statusText}`);
      }

      const updated = await response.json();
      setUser(updated);
      setIsEditing(false);
    } catch (err: any) {
      console.error("Update error:", err.message);
    }
  };

  if (!user) return <p className="text-center mt-8">Loading profile...</p>;

  return (
    <div className="flex justify-center max-w-lg mx-auto mt-24 p-6 text-white rounded-lg bg-transparent/20 backdrop-blur-md border border-white/60 ">

      {isEditing ? (
        <form className="bg-transparent" onSubmit={handleUpdate}>

          <h2 className="flex justify-center mx-auto text-3xl font-bold mb-4">Edit Profile</h2>

          <div className="mb-4">
            
            <label className="block text-sm font-medium mb-1">Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded bg-transparent"
            />
          </div>

          <div className="mb-4">

            <label className="block text-sm font-medium mb-1">Username</label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded bg-transparent"
            />
          </div>

          <div className="mb-4">

            <label className="block text-sm font-medium mb-1">Bio</label>

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 border rounded bg-transparent"
            />

          </div>

          <div className="mb-4">

            <label className="block text-sm font-medium mb-1">Avatar URL</label>

            <input
              type="text"
              placeholder={user.avatarUrl || "Enter avatar URL"}
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full p-2 border rounded bg-transparent placeholder-white"
            />
          </div>

          <div className="flex justify-center gap-2">
            <Button type="submit" className="btn bg-blue-600 text-white mr-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Save Changes
            </Button>
            <Button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn bg-gray-600 text-white" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Cancel
            </Button>
          </div>

        </form>
      ) : (

        <div className="text-center text-white w-full p-4 rounded-lg">

          <img
            src={user.avatarUrl || DefaultProfilePic}
            alt="Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />

          <h2 className="text-2xl font-bold text-white text-center">{user.name}</h2>

          <p className="text-center text-white">@{user.username}</p>

          <p className="mt-4 text-white">{user.bio || "No bio yet."}</p>

          <Button
              onClick={() => setIsEditing(true)}
              className="mt-4 btn bg-blue-600 text-white" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            Edit Profile
          </Button>

        </div>
      )}
    </div>
  );
}