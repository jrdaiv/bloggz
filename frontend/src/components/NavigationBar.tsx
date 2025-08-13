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
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DefaultProfilePic from "/Profilepic.webp";
import { User } from "@/types";
import bloggzLogo from "/Bloggz.svg";

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
      className="mx-auto bg-transparent/10 backdrop-blur-md w-full flex items-center h-28 shadow-md"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="flex items-center justify-between w-full px-4">
        {/* Left placeholder (optional) */}
        <div className=""></div>

        {/* Logo or Placeholder */}
        <div className="flex justify-center sm:justify-start flex-1 h-full">
          {isLoggedIn ? (
            <Link className="flex items-center" to="/home">
              <img
                src={bloggzLogo}
                alt="Bloggz Logo"
                className="w-[190px] h-[190px] min-h-[190px]"
              />
            </Link>
          ) : (
            <Link to="/">
              <img
                src={bloggzLogo}
                alt="Bloggz Logo"
                className="w-[190px] h-[190px]"
              />
            </Link>
          )}
        </div>

        {/* Right-aligned Buttons */}
        <div className="flex items-center justify-end w-[190px] gap-4">
          {isLoggedIn ? (
            <>
              <Menu >
                <MenuHandler >
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
                  <Link to="/create">
                    <MenuItem
                      className="text-black font-bold rounded-md drop-shadow-md"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      Create Post
                    </MenuItem>
                  </Link>

                  <Link to="/profile">
                    <MenuItem
                      className="drop-shadow-md text-black font-bold"
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
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md drop-shadow-md"
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
