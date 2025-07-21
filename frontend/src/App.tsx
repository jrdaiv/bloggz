import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavigationBar from "./components/NavigationBar";
import CreatePost from "./pages/CreatePost";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import EditPost from "./pages/EditPost";
import '/Users/kidx_/Projects/blog-app/frontend/public/Bloggz-Background.jpeg'


function App() {
  return (
    <>
    <NavigationBar />
    {/* <Home /> */}
    <Routes>
      <Route path="/" element={ <LandingPage /> } />
      <Route path="/home" element={ <Home /> } />
      <Route path="/create" element={ <CreatePost /> } />
      <Route path="/auth" element={ <Auth /> } />
      <Route path="/edit/:id" element={ <EditPost /> } />
    </Routes>
    </>
  );
}

export default App;
