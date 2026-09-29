import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ThumbsUp, Send, Trash2 } from "lucide-react";
import {
  getVideoById,
  toggleVideoLike,
  toggleSubscription,
  getVideoComments,
  addComment,
  deleteComment,
} from "../api/services";
import { useAuth } from "../context/AuthContext";

export default function WatchPage() {
  const { videoId } = useParams();
  const { user } = useAuth();

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    getVideoById(videoId).then(setVideo);
    getVideoComments(videoId).then(setComments);
  }, [videoId]);

  const handleLike = async () => {
    if (!user) return alert("Please sign in to like this video.");
    const res = await toggleVideoLike(videoId);
    setIsLiked(res.liked);
  };

  const handleSubscribe = async () => {
    if (!user) return alert("Please sign in to subscribe.");
    const res = await toggleSubscription(video.owner._id);
    setIsSubscribed(res.subscribed);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment = await addComment(videoId, commentText);
    setComments([{ ...newComment, owner: user }, ...comments]);
    setCommentText("");
  };

  const handleDeleteComment = async (id) => {
    await deleteComment(id);
    setComments(comments.filter((c) => c._id !== id));
  };

  if (!video) return <div className="p-12 text-center text-zinc-400">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 pt-18 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="aspect-video bg-black rounded-xl overflow-hidden border border-zinc-800">
          <video src={video.videoFile} poster={video.thumbnail} controls autoPlay className="w-full h-full" />
        </div>

        <h1 className="text-xl font-bold">{video.title}</h1>

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <Link to={`/c/${video.owner?.username}`}>
              <img
                src={video.owner?.avatar}
                alt={video.owner?.username}
                className="w-10 h-10 rounded-full object-cover"
              />
            </Link>
            <div>
              <Link to={`/c/${video.owner?.username}`} className="font-semibold block hover:underline text-sm">
                {video.owner?.fullname || video.owner?.username}
              </Link>
              <span className="text-xs text-zinc-400">@{video.owner?.username}</span>
            </div>

            {user?._id !== video.owner?._id && (
              <button
                onClick={handleSubscribe}
                className={`ml-4 px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                  isSubscribed ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700" : "bg-white text-black hover:bg-zinc-200"
                }`}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            )}
          </div>

          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border transition ${
              isLiked ? "bg-blue-600 border-blue-500 text-white" : "bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-200"
            }`}
          >
            <ThumbsUp size={15} />
            {isLiked ? "Liked" : "Like"}
          </button>
        </div>

        <div className="bg-zinc-900/70 p-4 rounded-xl text-sm whitespace-pre-wrap">
          <p className="text-xs text-zinc-400 mb-1">
            {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
          </p>
          <p className="text-zinc-200">{video.description}</p>
        </div>

        {/* Comments */}
        <div className="pt-2 space-y-4">
          <h2 className="text-base font-bold">{comments.length} Comments</h2>

          {user && (
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-zinc-500"
              />
              <button type="submit" className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                <Send size={15} />
              </button>
            </form>
          )}

          <div className="space-y-3 pt-2">
            {comments?.map((comment) => (
              <div key={comment._id} className="flex justify-between items-start text-sm">
                <div className="flex gap-3">
                  <img
                    src={comment.owner?.avatar || "https://via.placeholder.com/32"}
                    alt={comment.owner?.username}
                    className="w-8 h-8 rounded-full object-cover mt-0.5"
                  />
                  <div>
                    <span className="font-semibold text-xs text-zinc-300">@{comment.owner?.username}</span>
                    <p className="text-zinc-200 mt-0.5">{comment.content}</p>
                  </div>
                </div>
                {user?._id === comment.owner?._id && (
                  <button onClick={() => handleDeleteComment(comment._id)} className="text-zinc-500 hover:text-red-400">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-zinc-300 text-sm">More Videos</h3>
        <p className="text-xs text-zinc-500">Related content will appear here.</p>
      </div>
    </div>
  );
}