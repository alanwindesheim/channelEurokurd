import Link from "next/link";
import React from "react";
import { useContext, useEffect, useCallback, useState } from "react";
import { userContext } from "../../lib/context";
import styles from "./ListVideo.module.css";

export const ListVideo = () => {
  const { plates, fetchPosts, deletePlate, user, fetchProfile } =
    useContext(userContext);

  const [plateData, setPlateData] = useState(plates);

  useEffect(() => {
    fetchPosts();
    fetchProfile();
  }, []);

  useEffect(() => {
    setPlateData(plates);
  }, [plates]);

  const onDelete = useCallback((plate) => {
    var result = confirm("Weet je zeker dat je de plate wil verwijderen?");
    if (!result) {
      return;
    }
    deletePlate(plate.id).then((data, err) => {
      if (err) return;
      fetchPosts();
    });
  });

  const filterLabelData = (event) => {
    event.preventDefault();
    const filtered = plates.filter((plate) => {
      if (!event.target.value) {
        return true;
      } else {
        return plate.labels[event.target.value];
      }
    });
    setPlateData(filtered);
  };

  return (
    <section className={styles.section}>
      <div className={styles.div1}>
        <div className={styles.div1Child}>
          <Link href="/video/add">
            <a className={styles.link}>Add plate</a>
          </Link>
        </div>
      </div>
      <div className={styles.div2}>
        {!!plateData.length &&
          plateData.map((plate) => (
            <div className={styles.div2Child} key={plate.id}>
              {plate.title ? (
                <iframe
                  src={plate.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <h3 className={styles.title}>Geen titel</h3>
              )}

              <div className={styles.buttons}>
                {user.id === plate.user_id ? (
                  <>
                    <button
                      className={styles.delete}
                      onClick={() => onDelete(plate)}
                    >
                      🗑️ Delete
                    </button>
                  </>
                ) : (
                  <button className={styles.favorite}> </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
