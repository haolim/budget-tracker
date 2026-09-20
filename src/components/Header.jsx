import styles from "./Header.module.css";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const roleStyle = {
  admin: styles.roleAdmin,
  viewer: styles.roleViewer,
};
export default function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.brand}>Budget Tracker</h1>
        <div className={styles.account}>
          <div className={styles.who}>
            <p className={styles.name}>{user?.name}</p>
            <div className={`${styles.role} ${roleStyle[user.role]}`}>
              {user.role}
            </div>
          </div>
          <button className={styles.logout} type="button" onClick={logout}>
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
}
