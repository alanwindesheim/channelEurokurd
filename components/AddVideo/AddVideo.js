import styles from "./AddVideo.module.css";
import { useState, useEffect, useContext } from "react";
import { userContext } from "../../lib/context";

const AddVideo = () => {
  const { addPlate } = useContext(userContext);
  const [post, setPost] = useState({
    title: "",
  });
  const { title } = post;

  async function createPost(event) {
    event.preventDefault();

    if (!title) {
      alert("vul een titel in !");
      return;
    }

    if (title) {
      addPlate(post);
      resetState();
    }
  }

  useEffect(() => {
    if (post.avatarUrl) {
      addPlate(post);
      resetState();
    }
  }, [post.avatarUrl]);

  function resetState() {
    setPost({
      title: "",
    });
  }

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <form onSubmit={createPost} className={styles.form}>
          <h2 className={styles.h2}>
            <span>Add Plate</span>
          </h2>
          <label>
            <p className={styles.p}>Titel</p>
          </label>
          <input
            placeholder="Geef het gerecht een naam (max. 25 tekens)"
            value={title}
            id="naam"
            name="naam"
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />

          <input
            type="submit"
            value="Voeg je Plate toe!"
            className={styles.button}
          />
        </form>
      </div>
    </section>
  );
};

export default AddVideo;
