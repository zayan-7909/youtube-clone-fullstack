import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  return (
    <Link to={`/watch/${video._id}`} className="group flex flex-col gap-2.5">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-800">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <span className="absolute bottom-1.5 right-1.5 bg-black/85 text-[11px] px-1.5 py-0.5 rounded font-mono font-medium">
          {Math.floor(video.duration || 0)}s
        </span>
      </div>

      <div className="flex gap-3 px-0.5">
        <img
          src={video.owner?.avatar || "https://via.placeholder.com/40"}
          alt={video.owner?.username}
          className="w-9 h-9 rounded-full object-cover mt-0.5 shrink-0"
        />
        <div className="flex flex-col min-w-0">
          <h3 className="font-semibold text-sm line-clamp-2 leading-snug group-hover:text-blue-400">
            {video.title}
          </h3>
          <span className="text-xs text-zinc-400 mt-1 truncate">
            {video.owner?.fullname || video.owner?.username}
          </span>
          <span className="text-xs text-zinc-500">
            {video.views || 0} views • {new Date(video.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}