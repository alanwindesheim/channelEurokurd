import styles from "./Homepage.module.css";
import { useContext, useEffect, useState, useRef } from "react";
import { userContext } from "../../lib/context";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const HomepageHero = () => {
  const { plates, fetchPosts } = useContext(userContext);
  const [plateData, setPlateData] = useState(plates);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    setPlateData(plates);
  }, [plates]);

  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videojs(videoRef.current, {
        sources: [
          {
            width: "500",
            src: "http://eurokurd.mymediapc.net:40/live/Eurokurd/playlist.m3u8",
            type: "application/x-mpegURL",
          },
        ],
      });
    }
  });

  return (
    <section className={styles.section}>
      <p>
        <h1>Eurokurd test</h1>
        <video
          width="852"
          height="598"
          preload={"none"}
          controls
          ref={videoRef}
          className="video-js"
        />
      </p>
      <div className={styles.grid}>
        {!!plateData.length &&
          plateData.map((plate) => (
            <div className={styles.div2Child} key={plate.id}>
              {plate.title ? (
                <h3 className={styles.title}>
                  <iframe
                    src={plate.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </h3>
              ) : (
                <h3 className={styles.title}>Geen titel</h3>
              )}
            </div>
          ))}
      </div>
    </section>
  );
};

export default HomepageHero;
