import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Video, User as UserIcon, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?query=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[#0f0f0f] border-b border-[#272727] flex items-center justify-between px-4 z-50">
      <Link to="/" className="flex items-center gap-1.5 font-bold text-lg tracking-tight">
        <span className="bg-red-600 px-2 py-0.5 rounded-lg text-white font-extrabold text-sm">YT</span>
        <span>Clone</span>
      </Link>

      <form onSubmit={handleSearch} className="flex items-center w-full max-w-md mx-4">
        <input
          type="text"
          placeholder="Search videos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-[#121212] border border-[#303030] rounded-l-full px-4 py-1.5 focus:outline-none focus:border-blue-500 text-sm"
        />
        <button
          type="submit"
          className="bg-[#222222] border border-l-0 border-[#303030] rounded-r-full px-5 py-1.5 text-gray-400 hover:text-white"
        >
          <Search size={17} />
        </button>
      </form>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <Link
              to="/upload"
              title="Upload Video"
              className="p-2 hover:bg-[#272727] rounded-full text-zinc-300 hover:text-white"
            >
              <Video size={20} />
            </Link>
            <Link
              to="/dashboard"
              title="Creator Studio"
              className="p-2 hover:bg-[#272727] rounded-full text-zinc-300 hover:text-white"
            >
              <LayoutDashboard size={20} />
            </Link>
            <Link to={`/c/${user.username}`}>
              <img
                src={user.avatar}
                alt={user.username}
                className="w-8 h-8 rounded-full object-cover border border-zinc-700 hover:scale-105 transition"
              />
            </Link>
            <button
              onClick={logout}
              title="Logout"
              className="p-2 hover:bg-[#272727] rounded-full text-zinc-400 hover:text-red-400"
            >
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-1.5 border border-[#3ea6ff] text-[#3ea6ff] px-3.5 py-1 rounded-full text-sm font-medium hover:bg-[#3ea6ff]/10 transition"
          >
            <UserIcon size={16} /> Sign in
          </Link>
        )}
      </div>
    </header>
  );
}