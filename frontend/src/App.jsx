import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import WatchPage from "./pages/WatchPage";
import UploadVideo from "./pages/UploadVideo";
import Dashboard from "./pages/Dashboard";
import ChannelProfile from "./pages/ChannelProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main className="min-h-screen pb-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watch/:videoId" element={<WatchPage />} />
            <Route path="/upload" element={<UploadVideo />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/c/:username" element={<ChannelProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}