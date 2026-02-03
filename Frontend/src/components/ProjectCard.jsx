// src/components/ProjectCard.jsx
import { useRef, useState } from "react";

const ProjectCard = ({
  mediaUrl,
  mediaType,
  category,
  title,
  description,
  city,
  date,
  loading = false,
}) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  /* ---------- SKELETON ---------- */
  if (loading) {
    return (
      <article className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 animate-pulse">
        <div className="h-64 bg-gray-200" />
        <div className="p-6 space-y-4">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-4" />
        </div>
      </article>
    );
  }

  const isVideo = mediaType === "video" && mediaUrl;
  const isImage = mediaType === "image" && mediaUrl;

  const formattedDate =
    date && !isNaN(new Date(date))
      ? new Date(date).toLocaleDateString("en-IN")
      : null;

  /* ---------- VIDEO HANDLERS ---------- */
  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setPlaying(false);
    }
  };

  return (
    <article className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-orange-200 transition-all duration-300 border border-gray-200">
      
      {/* MEDIA */}
      <div
        className="relative h-64 overflow-hidden bg-gray-100"
        onMouseEnter={isVideo ? playVideo : undefined}
        onMouseLeave={isVideo ? stopVideo : undefined}
      >
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all z-10" />

        {/* IMAGE */}
        {isImage && (
          <img
            src={mediaUrl}
            alt={title || "Project image"}
            className="w-full h-full object-cover"
          />
        )}

        {/* VIDEO */}
        {isVideo && (
          <>
            <video
              ref={videoRef}
              src={mediaUrl}
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
              onClick={() => (playing ? stopVideo() : playVideo())}
            />

            {/* PLAY ICON */}
           
          </>
        )}

        {/* FALLBACK */}
        {!isImage && !isVideo && (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No media available
          </div>
        )}

        {/* CATEGORY */}
        {category && (
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 text-xs font-bold bg-white text-gray-900 rounded-full shadow">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-6">
        <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
          {title || "Untitled Project"}
        </h4>

        <p className="text-gray-700 mb-4 flex-1 text-sm leading-relaxed line-clamp-3">
          {description || "No description available."}
        </p>

        <div className="text-sm text-gray-600 space-y-1 mt-auto">
          {city && <div>📍 {city}</div>}
          {formattedDate && <div>📅 {formattedDate}</div>}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
