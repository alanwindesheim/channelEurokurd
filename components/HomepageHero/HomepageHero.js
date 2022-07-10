import styles from "./Homepage.module.css";
import { useContext, useEffect, useState, useRef } from "react";
import { userContext } from "../../lib/context";
import videojs from "video.js";
import Image from "next/image";
import "video.js/dist/video-js.css";
import logo from "../../public/images/logoEurokurd.png";
import ig from "../../public/images/instagram.svg";
import fb from "../../public/images/facebook.svg";
import yt from "../../public/images/youtube.svg";
import mail from "../../public/images/Mail.svg";
import phone from "../../public/images/Phone.svg";

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
            src: "http://eurokurd.mymediapc.net:40/live/Eurokurd/playlist.m3u8",
            type: "application/x-mpegURL",
          },
        ],
      });
    }
  });

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            <Image
              src={logo}
              alt="eurokurd tv channel"
              width={140}
              height={50}
              className={styles.img}
            />
          </div>
          <div className={styles.menus}>
            <div>
              <a
                href="https://www.youtube.com/channel/UCWD-5c-8OaDms747WJTEBQg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  className={styles.icon}
                  src={yt}
                  width={30}
                  height={30}
                  alt="eurokurd tv channel"
                />
              </a>
            </div>
            <div>
              {" "}
              <a
                href="https://www.facebook.com/Eurokurd-1981286902179681/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  className={styles.icon}
                  src={fb}
                  width={30}
                  height={30}
                  alt="eurokurd tv channel"
                />
              </a>
            </div>
            <div>
              <a
                href="https://www.instagram.com/eurokurd19/?igshid=YmMyMTA2M2Y="
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  className={styles.icon}
                  src={ig}
                  width={30}
                  height={30}
                  alt="eurokurd tv channel"
                />
              </a>
            </div>
            <div>
              <a
                href="mailto: eurokurd19@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  className={styles.icon}
                  src={mail}
                  width={30}
                  height={30}
                  alt="eurokurd tv channel"
                />
              </a>
            </div>
            <div>
              <a
                href="tel:123-456-7890"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  className={styles.icon}
                  src={phone}
                  width={30}
                  height={30}
                  alt="eurokurd tv channel"
                />
                {/* 0046700182651 */}
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* 
      d
      d
      d
      section */}
      <section className={styles.section}>
        <div className={styles.video}>
          <div className="video-js-responsive-container vjs-hd">
            {" "}
            <video
              controls
              ref={videoRef}
              fluid={true}
              width="640"
              height="264"
              className={`video-js vjs-default-skin vjs-4-3
            ${styles.videoFrame}`}
            />
          </div>
        </div>

        {/* <div className={styles.grid}>
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
        </div> */}
      </section>
    </>
  );
};

export default HomepageHero;
