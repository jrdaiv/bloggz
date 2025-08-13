// src/App.tsx
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavigationBar from "./components/NavigationBar";
import CreatePost from "./pages/CreatePost";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import EditPost from "./components/EditPost";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
