// frontend/src/components/AuthForm.tsx
import { useAuth } from "@/context/AuthContext";
import { Button, Input } from "@material-tailwind/react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const url = `${backendUrl}/api/auth/${isLogin ? "login" : "register"}`;
    const data = isLogin
      ? { email, password }
      : { name, username, email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error || `HTTP error! status: ${response.status}`
        );
      setError(null);
      login(result.token);
      navigate("/home");
      console.log(`${email} Successfully logged in.`);
      // alert("Success: " + email);
    } catch (error) {
      console.error("Auth error:", error);
      setError("Something went wrong");
    }
  };

  const handleDemoLogin = () => {
    setEmail('test@example.com');
    setPassword('password123')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4 sm:px-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-2 bg-transparent backdrop-blur-md p-6 rounded-lg border border-white/20 w-full max-w-md"
      >

        {error && (
          <div className="text-red-500 text-center font-semibold drop-shadow-md">
            {error}
          </div>
        )}
        {!isLogin && (
          <>

            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="w-full border-white/30 rounded-md p-2 bg-transparent text-white placeholder-white/70 focus:ring-2 focus:ring-blue-500 drop-shadow-md" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}            />

            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full border-white/30 rounded-md p-2 bg-transparent text-white placeholder-white/70 focus:ring-2 focus:ring-blue-500 drop-shadow-md" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}            />

          </>
        )}
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full border-white/30 rounded-md p-2 bg-transparent text-white placeholder-white/70 focus:ring-2 focus:ring-blue-500 drop-shadow-md" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}        />

        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full border-white/30 rounded-md p-2 bg-transparent text-white placeholder-white/70 focus:ring-2 focus:ring-blue-500 drop-shadow-md" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}        />

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md drop-shadow-md" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          {isLogin ? "Login" : "Sign Up"}
        </Button>

        <Button 
          type="submit"
          onClick={handleDemoLogin}
          className="w-full bg-gray-500 text-white p-2 rounded" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
          Demo Login
        </Button>

        <Button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-md drop-shadow-md" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          Switch to {isLogin ? "Sign Up" : "Login"}
        </Button>

      </form>
    </div>
  );
};

export default AuthForm;
