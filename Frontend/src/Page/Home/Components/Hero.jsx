import { useEffect, useState } from "react";
import { TbArrowIteration } from "react-icons/tb";

const videos = [
"https://archive.org/download/monarkVideoSmllestFreeConvert/monarkVideoSmllestFreeConvert.mp4"
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videos.length);
    }, 6000); // change video every 6s

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative w-full min-h-[650px] flex items-center justify-center overflow-hidden">
      {/* 🎥 VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0">
        {videos.map((video, index) => (
          <video
            key={index}
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent" />
      </div>

      {/* 🔥 HERO CONTENT (UNCHANGED) */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl flex flex-col gap-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 w-fit animate-pulse">
            <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(244,140,37,0.8)]" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Empowering Communities, Creating Change
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
            Empowering Communities,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-300">
              Igniting Hope.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 font-medium leading-relaxed max-w-2xl">
             
          </p>

          <div className="flex flex-wrap gap-4 mt-2">
           
            <button className="h-14 px-8 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm cursor-pointer text-white border border-white/30 font-bold shadow-lg flex items-center gap-2">
              <span className="loading loading-spinner loading-sm"></span>
              Watch Our Story
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
