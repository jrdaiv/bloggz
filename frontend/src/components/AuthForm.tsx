// src/components/AuthForm.tsx
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

  const handleLogin = async () => {
    
    const url = `${backendUrl}/api/auth/login`;
    const data = { email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Login failed");

      setError(null);
      login(result.token);
      navigate("/home");
      console.log("Login success:", result.token);
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Something went wrong");
    }
  };

  const handleRegister = async () => {
    const url = `${backendUrl}/api/auth/register`;
    const data = { name, username, email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Registration failed");

      setError(null);
      login(result.token);
      navigate("/home");
      console.log("Registration success:", result.token);
    } catch (err: any) {
      console.error("Register error:", err);
      setError(err.message || "Something went wrong");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    isLogin ? await handleLogin() : await handleRegister();
  };

  const handleDemoLogin = () => {
    setEmail("test@example.com");
    setPassword("password123");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white/5 backdrop-blur-md p-6 rounded-lg border border-white/20 w-full max-w-md"
      >
        {error && (
          <div className="text-red-500 text-center font-semibold">{error}</div>
        )}

        {!isLogin && (
          <>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="text-white placeholder-white/70"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="text-white placeholder-white/70"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </>
        )}

        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="text-white placeholder-white/70"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          crossOrigin={undefined}
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="text-white placeholder-white/70"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          crossOrigin={undefined}
        />

        <Button
          type="submit"
          className="w-full bg-blue-600"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {isLogin ? "Login" : "Sign Up"}
        </Button>

        <Button
          type="button"
          onClick={handleDemoLogin}
          className="w-full bg-gray-500"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Demo Login
        </Button>

        <Button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="w-full bg-gray-700"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Switch to {isLogin ? "Sign Up" : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default AuthForm;
