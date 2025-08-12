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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar
      className="mx-auto bg-transparent backdrop-blur-md w-full flex items-center justify-between px-4 py-3 shadow-md"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="container flex items-center mr-auto px-4 py-3 ">
        {/* Logo or Placeholder */}
        <div className="">
          <Link
            to={isLoggedIn ? "/home" : "/"}
            className="text-4xl font-bold text-white drop-shadow-md outline-4 outline-black"
          >
            Bloggz
          </Link>
        </div>

        {/* Right-aligned Buttons */}
        <div className="flex ml-auto items-center gap-4">
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
                    <MenuItem
                    className="hover:bg-gray-300 text-black font-bold"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      View Profile
                    </MenuItem>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-black font-semibold w-full p-[-10px] rounded-md drop-shadow-md mt-2"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <MenuItem
                    className="text-white font-bold hover:bg-red-600 hover:text-white"
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
