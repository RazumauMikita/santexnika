import { ServiceAdvantages } from "@/components/ServiceAdvantages";
import styles from "./ServiceAdvantagesSection.module.css";

export function ServiceAdvantagesSection() {
  return (
    <section className={styles.section} aria-label="Преимущества">
      <div className="container">
        <ServiceAdvantages />
      </div>
    </section>
  );
}
