import { HeroContactForm } from "@/components/HeroContactForm";
import styles from "./PriceHero.module.css";

export function PriceHero() {
  return (
    <section className={styles.section} aria-label="Прайс-лист">
      <div className={`container ${styles.rowContainer}`}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            Прайс-лист на услуги сантехника в Витебске
          </h1>
          <p className={styles.description}>
            10 лет опыт работы мастеров.
            <br />
            Гарантия на работы до 5 лет.
          </p>
        </div>
        <div className={styles.contactFormContainer}>
          <HeroContactForm />
        </div>
      </div>
    </section>
  );
}
