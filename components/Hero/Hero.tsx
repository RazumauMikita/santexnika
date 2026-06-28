import { Header } from "../Header";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.section} aria-label="Главный баннер">
      <div className="container">
        <Header />
      </div>
    </section>
  );
}
