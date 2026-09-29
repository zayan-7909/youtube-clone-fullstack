import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publishVideo } from "../api/services";

export default function UploadVideo() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile || !thumbnail) return setError("Both video and thumbnail files are required.");

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("videoFile", videoFile);
    data.append("thumbnail", thumbnail);

    try {
      setUploading(true);
      setError("");
      const video = await publishVideo(data);
      navigate(`/watch/${video._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 pt-24">
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
        <h1 className="text-xl font-bold mb-4">Upload New Video</h1>
        {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-zinc-400 text-xs mb-1">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-zinc-400 text-xs mb-1">Description</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 px-3 py-2 rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-zinc-400 text-xs mb-1">Video File</label>
            <input
              type="file"
              accept="video/*"
              required
              onChange={(e) => setVideoFile(e.target.files[0])}
              className="w-full text-xs text-zinc-400 file:bg-zinc-800 file:border-0 file:text-white file:px-3 file:py-1 file:rounded file:mr-2"
            />
          </div>
          <div>
            <label className="block text-zinc-400 text-xs mb-1">Thumbnail Image</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="w-full text-xs text-zinc-400 file:bg-zinc-800 file:border-0 file:text-white file:px-3 file:py-1 file:rounded file:mr-2"
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-600 hover:bg-blue-700 py-2.5 rounded-lg font-semibold disabled:opacity-50 transition"
          >
            {uploading ? "Uploading..." : "Publish Video"}
          </button>
        </form>
      </div>
    </div>
  );
}