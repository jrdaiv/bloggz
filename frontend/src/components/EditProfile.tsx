// // src/pages/EditProfile.tsx
// import { useState } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { User } from "@/types";

// export default function EditProfile() {
//   const { token } = useAuth();
//     const [user, setUser] = useState<User>();
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [bio, setBio] = useState("");
//   const [avatarUrl, setAvatarUrl] = useState("");
// //   const [password, setPassword] = useState("");
// const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const handleUpdate = async () => {
//   try {
//     // const token = localStorage.getItem("token");
//     const response = await fetch(`${backendUrl}/api/profile/me`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         name,
//         username,
//         avatarUrl,
//         bio,
//       }),
//     });

//     if (!response.ok) throw new Error("Update failed");

//     const updated = await response.json();
//     setUser(updated); // update context
//     console.log("Updated user:", updated);
//   } catch (err: any) {
//     console.error("Update error:", err.message);
//   }
// };


//   return (
    
//     <div className="max-w-lg mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
//       <form onSubmit={handleUpdate}>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Name</label>
//           <input
//             type="text"
//             value={user?.name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Username</label>
//           <input
//             type="text"
//             value={user?.username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Bio</label>
//           <textarea
//             value={user?.bio as string}
//             onChange={(e) => setBio(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Avatar URL</label>
//           <input
//             type="text"
//             value={user?.avatarUrl as string}
//             onChange={(e) => setAvatarUrl(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <button type="submit" className="btn bg-blue-600 text-white">
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// }