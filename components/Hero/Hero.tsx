import { HeroContactForm } from "@/components/HeroContactForm";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.section} aria-label="Главный баннер">
      <div className={`container ${styles.rowContainer}`}>
        <div className={styles.titleContainer}>
          <div></div>
          <h1 className={styles.title}>
            Ремонт и монтаж <br /> сантехники <br /> в Витебске
          </h1>
          <p className={styles.description}>
            Только профессионалы! Только максимальное качество монтажа! Сроки и
            гарантия работ!
          </p>
        </div>
        <div className={styles.contactFormContainer}>
          <HeroContactForm />
        </div>
      </div>
    </section>
  );
}
