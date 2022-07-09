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
            src: "https://www.google.com/search?q=%http://http://eurokurd.mymediapc.net:40/live/Eurokurd/playlist.m3u8",
            type: "application/x-mpegURL",
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
        muted="muted"
        width="852"
        height="598"
        controls
        ref={videoRef}
        className="video-js"
      />
    </div>
  );
}
