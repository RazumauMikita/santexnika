import { GuaranteeCard } from "@/components/GuaranteeCard";
import { GUARANTEES } from "@/lib/guarantees";
import { GuaranteesDesktop } from "./GuaranteesDesktop";
import styles from "./Guarantees.module.css";

export function Guarantees() {
  return (
    <section id="guarantees" className={styles.section} aria-label="Гарантии">
      <div className="container">
        <div className={styles.headingContainer}>
          <h2 className={`${styles.heading} roboto_condensed_bold`}>
            Наши гарантии
          </h2>
        </div>

        <ul className={styles.mobileList}>
          {GUARANTEES.map((guarantee) => (
            <li key={guarantee.id} className={styles.mobileItem}>
              <GuaranteeCard guarantee={guarantee} />
            </li>
          ))}
        </ul>

        <div className={styles.desktopWrap}>
          <GuaranteesDesktop />
        </div>
      </div>
    </section>
  );
}
