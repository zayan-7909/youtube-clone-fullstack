import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile, getAllVideos } from "../api/services";
import VideoCard from "../components/VideoCard";

export default function ChannelProfile() {
  const { username } = useParams();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getUserProfile(username).then((data) => {
      setChannel(data);
      getAllVideos({ userId: data._id }).then(setVideos);
    });
  }, [username]);

  if (!channel) return <div className="p-12 text-center text-zinc-400">Loading channel...</div>;

  return (
    <div className="max-w-6xl mx-auto pt-14">
      {channel.coverImage && (
        <div className="h-44 md:h-56 w-full overflow-hidden">
          <img src={channel.coverImage} className="w-full h-full object-cover" alt="" />
        </div>
      )}
      <div className="p-6 border-b border-zinc-800 flex items-center gap-5">
        <img src={channel.avatar} className="w-20 h-20 rounded-full object-cover border-2 border-zinc-700" alt="" />
        <div>
          <h1 className="text-2xl font-bold">{channel.fullname}</h1>
          <p className="text-zinc-400 text-sm">@{channel.username} • {channel.subscribersCount || 0} subscribers</p>
        </div>
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(videos) && videos.map((v) => (
          <VideoCard key={v._id} video={v} />
        ))}
      </div>
    </div>
  );
}