import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please fill in both fields");
      return;
    }

    try {
      setError("");
      setIsSubmitting(true);
      
      // Accepts username or email matching backend controller
      await login({ username, password });
      
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to log in");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl w-full max-w-sm space-y-4 shadow-xl"
      >
        <h2 className="text-xl font-bold text-center">Sign In</h2>
        
        {error && (
          <div className="text-red-400 bg-red-950/40 border border-red-800/50 p-2.5 rounded-lg text-xs">
            {error}
          </div>
        )}

        <div>
          <label className="text-xs text-zinc-400 block mb-1">Username or Email</label>
          <input
            type="text"
            required
            autoComplete="username"
            className="w-full bg-zinc-800 p-2.5 rounded-lg text-sm border border-zinc-700 focus:outline-none focus:border-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="text-xs text-zinc-400 block mb-1">Password</label>
          <input
            type="password"
            required
            autoComplete="current-password"
            className="w-full bg-zinc-800 p-2.5 rounded-lg text-sm border border-zinc-700 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 p-2.5 rounded-lg text-sm font-semibold disabled:opacity-50 transition"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-xs text-zinc-400 text-center pt-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}