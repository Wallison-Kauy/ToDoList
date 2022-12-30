import styles from "./Header.module.css";
import "../global.css"

import Logo from "../assets/rocket.png";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={Logo} alt="logotipo do ingnite"></img>
      <h1>To</h1>
      <h2>Do</h2>
    </header>
  );
}
