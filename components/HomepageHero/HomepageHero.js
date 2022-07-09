import styles from "./Homepage.module.css";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../lib/context";

const HomepageHero = () => {
  const { plates, fetchPosts } = useContext(userContext);
  const [plateData, setPlateData] = useState(plates);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    setPlateData(plates);
  }, [plates]);

  return (
    <section className={styles.section}>
      <p>
        <p>
          Check out{" "}
          <a
            href="http://eurokurd.mymediapc.net:40/live/Eurokurd/playlist.m3u8"
            target="_blank"
            rel="noopener noreferrer"
          >
            radio
          </a>
          .
        </p>
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
