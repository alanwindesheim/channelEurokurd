import styles from "./Navbar.module.css";
import Link from "next/link";
import { useContext } from "react";
import { userContext } from "../../lib/context";

const Navbar = () => {
  const { authenticated, signOut } = useContext(userContext);

  return (
    <div className={styles.section}>
      <nav className={styles.nav}>
        <ul>
          <li className={styles.home}>
            <Link href={"/"}>
              <a className={styles.link}>Home</a>
            </Link>
          </li>
          {authenticated ? (
            <>
              <li className={styles.plates}>
                <Link href="/video">
                  <a className={styles.link}> Video</a>
                </Link>
              </li>
              <button className={styles.button} onClick={signOut}>
                Sign Out
              </button>
            </>
          ) : (
            <li className={styles.profile}>
              <Link href="/login">
                <a className={styles.link}>Login</a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
