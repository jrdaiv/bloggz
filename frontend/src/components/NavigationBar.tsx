import { useAuth } from "@/context/AuthContext";
import { Button, Navbar } from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function NavigationBar() {
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
              <Button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md drop-shadow-md"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Logout
              </Button>
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
