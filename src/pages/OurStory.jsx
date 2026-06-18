import { useRef, useEffect } from "react";
import Hls from "hls.js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function OurStory() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const videoUrl = "https://gourmethouse.com/cdn/shop/videos/c/vp/6b8a10b734f14c5b95cf333911a2fe8b/6b8a10b734f14c5b95cf333911a2fe8b.m3u8?v=0";

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((e) => console.log("Autoplay blocked:", e));
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoUrl;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((e) => console.log("Autoplay blocked:", e));
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans select-none">
      <Navbar />
      <main className="flex-grow flex flex-col pb-24">
        
        <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden bg-[#121212]">
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover opacity-95"
            muted
            loop
            playsInline
            autoPlay
          />
          <div className="absolute inset-0 bg-black/5 z-10"></div>
          <div className="absolute inset-0 flex items-center justify-center z-20 select-none pointer-events-none">
            <h1 className="font-ivy text-[48px] sm:text-[68px] md:text-[84px] font-light text-white tracking-normal text-center">
              Our Story
            </h1>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

