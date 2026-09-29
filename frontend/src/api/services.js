import { api } from "./client";

// Auth & User
export const registerUser = (formData) => api.post("/users/register", formData);
export const loginUser = (credentials) => api.post("/users/login", credentials);
export const logoutUser = () => api.post("/users/logout");
export const getCurrentUser = () => api.get("/users/current-user");
export const getUserProfile = (username) => api.get(`/users/c/${username}`);
export const getWatchHistory = () => api.get("/users/history");

// Videos
export const getAllVideos = (params) => api.get("/videos", { params });
export const getVideoById = (videoId) => api.get(`/videos/${videoId}`);
export const publishVideo = (formData) => api.post("/videos", formData);
export const deleteVideo = (videoId) => api.delete(`/videos/${videoId}`);

// Comments
export const getVideoComments = (videoId, params) => api.get(`/comments/${videoId}`, { params });
export const addComment = (videoId, content) => api.post(`/comments/${videoId}`, { content });
export const deleteComment = (commentId) => api.delete(`/comments/c/${commentId}`);

// Likes & Subscriptions
export const toggleVideoLike = (videoId) => api.post(`/likes/toggle/v/${videoId}`);
export const getLikedVideos = () => api.get("/likes/videos");
export const toggleSubscription = (channelId) => api.post(`/subscriptions/c/${channelId}`);

// Dashboard
export const getChannelStats = () => api.get("/dashboard/stats");
export const getChannelVideos = () => api.get("/dashboard/videos");