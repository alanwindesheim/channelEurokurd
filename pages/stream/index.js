import { useRef, useEffect } from "react";
import Link from "next/link";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default function IndexPage() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videojs(videoRef.current, {
        sources: [
          {
            src: "http://eurokurd.mymediapc.net:40/live/Eurokurd/playlist.m3u8",
            type: "application/x-mpegURL",
            fluid: true,
            autoplay: true,
            nativeAudioTracks: false,
            nativeVideoTracks: false,
          },
        ],
      });
    }
  });

  return (
    <div>
      Hello World.{" "}
      <Link href="/about">
        <a>About</a>
      </Link>
      <video
        width="852"
        height="598"
        controls
        ref={videoRef}
        className="video-js"
      />
    </div>
  );
}
