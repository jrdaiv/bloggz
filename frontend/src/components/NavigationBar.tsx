// src/components/NavigationBar.tsx
import { useAuth } from "@/context/AuthContext";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
} from "@material-tailwind/react";
import {  useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DefaultProfilePic from "/public/Profilepic.webp";
import { User } from "@/types";

// const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function NavigationBar() {
  const [user] = useState<User | null>(null);
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = location.pathname === "/auth";

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const token = localStorage.getItem("token");
  //     if (!token) return;
  //     const res = await fetch(`${backendUrl}/api/profile/me`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const data = await res.json();
  //     setUser(data);
  //   };

  //   if (isLoggedIn) fetchUser();
  // }, [isLoggedIn]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar
      className="bg-transparent backdrop-blur-md w-full "
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo or Placeholder */}
        <div className="flex items-center">
          <Link
            to={isLoggedIn ? "/home" : "/"}
            className="text-2xl font-bold text-white drop-shadow-md"
          >
            Bloggz
          </Link>
        </div>

        {/* Right-aligned Buttons */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link to="/create">
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md drop-shadow-md"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Create Post
                </Button>
              </Link>

              <Menu>
                <MenuHandler>
                  <Avatar
                    variant="circular"
                    alt={user?.username}
                    className="cursor-pointer"
                    src={(user?.avatarUrl as string) || DefaultProfilePic}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </MenuHandler>
                <MenuList
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <Link to="/profile">
                    {/* <MenuItem className="cursor-default" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      Signed in as: {user?.username}
                    </MenuItem> */}
                    <MenuItem
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      View Profile
                    </MenuItem>
                  </Link>
                  <Link to="/edit-profile">
                    <MenuItem
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      Edit Profile
                    </MenuItem>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-black font-semibold w-full p-[-10px] rounded-md drop-shadow-md"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <MenuItem
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      Logout
                    </MenuItem>
                  </Button>
                </MenuList>
              </Menu>
            </>
          ) : (
            !isAuthPage && (
              <Link to="/auth">
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md drop-shadow-md"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Login / Signup
                </Button>
              </Link>
            )
          )}
        </div>
      </div>
    </Navbar>
  );
}
