import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllVideos } from "../api/services";
import VideoCard from "../components/VideoCard";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    setLoading(true);
    getAllVideos({ query })
      .then((data) => setVideos(data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [query]);

  if (loading) {
    return <div className="p-12 text-center text-zinc-400">Loading videos...</div>;
  }

  if (videos.length === 0) {
    return <div className="p-12 text-center text-zinc-500">No videos found.</div>;
  }

  return (
    <div className="p-6 pt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-7 max-w-7xl mx-auto">
      {Array.isArray(videos) && videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
}