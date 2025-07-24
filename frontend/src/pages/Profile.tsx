import { useEffect, useState } from "react";
import DefaultProfilePic from "/Profilepic.webp";
import { User } from "@/types";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch(`${backendUrl}/api/profile/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch user");
      }

      const data = await response.json();
      setUser(data);
      console.log("Fetched user:", data);
    } catch (err: any) {
      console.error("Error fetching user:", err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="max-w-lg mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
      <img
        src={user.avatarUrl || DefaultProfilePic}
        alt="Avatar"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h2 className="text-2xl font-bold text-center">{user.name}</h2>
      <p className="text-center text-gray-600">@{user.username}</p>
      <p className="mt-4 text-gray-700">{user.bio || "No bio yet."}</p>
    </div>
  );
}