// src/components/AuthForm.tsx
import { useAuth } from "@/context/AuthContext";
import { Button } from "@material-tailwind/react";
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
    <div className="flex items-center bg-transparent/10 justify-center pt-24 px-4">

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-transparent/10 backdrop-blur-md p-6 rounded-lg border border-white/60 w-full max-w-md"
      >
        <p className="flex justify-center underline text-2xl font-bold text-white mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </p>

        {error && (
          <div className="text-red-500 text-center font-semibold">{error}</div>
        )}

        {!isLogin && (
          <div className="flex flex-col gap-2 ">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="text-white placeholder-white bg-transparent backdrop-blur-md border border-white/40 rounded-lg p-3 transition-all drop-shadow-md"
            />

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="text-white placeholder-white bg-transparent backdrop-blur-md border border-white/40 rounded-lg p-3 transition-all drop-shadow-md"
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Example@email.com"
          required
          className="text-white placeholder-white bg-transparent backdrop-blur-md border border-white/40 rounded-lg p-3 transition-all drop-shadow-md"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="text-white placeholder-white bg-transparent backdrop-blur-md border border-white/40 rounded-lg p-3 transition-all drop-shadow-md"
        />  
        </div>

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
