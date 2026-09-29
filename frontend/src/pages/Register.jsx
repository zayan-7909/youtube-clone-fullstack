import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/services";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullname: "", username: "", email: "", password: "" });
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!avatar) return setError("Avatar image is required");

    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    data.append("avatar", avatar);
    if (coverImage) data.append("coverImage", coverImage);

    try {
      await registerUser(data);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl w-full max-w-md space-y-3 text-sm">
        <h2 className="text-lg font-bold text-center">Create Channel</h2>
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <input
          placeholder="Full Name"
          required
          className="w-full bg-zinc-800 p-2 rounded-lg border border-zinc-700"
          value={form.fullname}
          onChange={(e) => setForm({ ...form, fullname: e.target.value })}
        />
        <input
          placeholder="Username"
          required
          className="w-full bg-zinc-800 p-2 rounded-lg border border-zinc-700"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full bg-zinc-800 p-2 rounded-lg border border-zinc-700"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full bg-zinc-800 p-2 rounded-lg border border-zinc-700"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <div>
          <label className="text-xs text-zinc-400 block mb-1">Avatar (Required)</label>
          <input type="file" accept="image/*" required onChange={(e) => setAvatar(e.target.files[0])} />
        </div>
        <div>
          <label className="text-xs text-zinc-400 block mb-1">Cover Image (Optional)</label>
          <input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])} />
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 p-2.5 rounded-lg font-semibold mt-2">
          Create Account
        </button>
        <p className="text-xs text-zinc-400 text-center pt-2">
          Already registered? <Link to="/login" className="text-blue-400 hover:underline">Sign In</Link>
        </p>
      </form>
    </div>
  );
}