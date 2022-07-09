import { useState, useContext } from "react";
import styles from "./Loginpage.module.css";
import { userContext } from "../../lib/context";

export default function SignIn() {
  const { authenticated, signOut, handleLogin } = useContext(userContext);
  const [email, setEmail] = useState("");

  return (
    <section className={styles.section}>
      {!authenticated ? (
        <div className={styles.login}>
          <h1>Login</h1>
          <p>Meld je aan met je mail, en ontvang een loginlink in je mailbox</p>
          <input onChange={(e) => setEmail(e.target.value)} />
          <button onClick={() => handleLogin(email)}>login</button>
        </div>
      ) : (
        <div className={styles.logout}>
          <h1>Your are already logged in</h1>
          <button onClick={signOut}>logout</button>
        </div>
      )}
    </section>
  );
}
