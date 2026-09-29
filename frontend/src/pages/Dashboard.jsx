import { useEffect, useState } from "react";
import { getChannelStats, getChannelVideos, deleteVideo } from "../api/services";
import { Trash2 } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getChannelStats(), getChannelVideos()])
      .then(([statsData, videosData]) => {
        setStats(statsData);
        setVideos(videosData || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (videoId) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    await deleteVideo(videoId);
    setVideos(videos.filter((v) => v._id !== videoId));
  };

  if (loading) return <div className="p-12 text-center text-zinc-400">Loading Studio...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 pt-20 space-y-6">
      <h1 className="text-2xl font-bold">Channel Dashboard</h1>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
          <span className="text-xs text-zinc-400">Total Videos</span>
          <p className="text-2xl font-bold mt-1">{stats?.totalVideos || 0}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
          <span className="text-xs text-zinc-400">Total Views</span>
          <p className="text-2xl font-bold mt-1">{stats?.totalViews || 0}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
          <span className="text-xs text-zinc-400">Subscribers</span>
          <p className="text-2xl font-bold mt-1">{stats?.totalSubscribers || 0}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
          <span className="text-xs text-zinc-400">Total Likes</span>
          <p className="text-2xl font-bold mt-1">{stats?.totalLikes || 0}</p>
        </div>
      </div>

      {/* Uploaded Videos Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-800/60 text-zinc-400 text-xs uppercase border-b border-zinc-800">
            <tr>
              <th className="p-4">Video</th>
              <th className="p-4">Views</th>
              <th className="p-4">Uploaded</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {Array.isArray(videos) && videos.map((video) => (
              <tr key={video._id} className="hover:bg-zinc-800/30">
                <td className="p-4 flex items-center gap-3">
                  <img src={video.thumbnail} className="w-16 h-10 object-cover rounded" alt="" />
                  <span className="font-medium line-clamp-1">{video.title}</span>
                </td>
                <td className="p-4 text-zinc-400">{video.views || 0}</td>
                <td className="p-4 text-zinc-400">{new Date(video.createdAt).toLocaleDateString()}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(video._id)} className="text-zinc-500 hover:text-red-400">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}