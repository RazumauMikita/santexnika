import { OrderConsultForm } from "./OrderConsultForm";
import styles from "./OrderSection.module.css";

export function OrderSection() {
  return (
    <section className={styles.section} aria-label="Онлайн-заявка">
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <div className={styles.titleBlock}>
            <p className={`${styles.titleLine} ${styles.titleLine1} roboto_condensed_bold`}>
              Оставьте онлайн-заявку,
            </p>
            <p className={`${styles.titleLine} ${styles.titleLine2} roboto_condensed_bold`}>
              и наша команда решит
            </p>
            <p className={`${styles.titleLine} ${styles.titleLine3} roboto_condensed_bold`}>
              ваши вопросы с сантехникой
            </p>
          </div>

          <div className={styles.formWrap}>
            <OrderConsultForm />
          </div>
        </div>
      </div>
    </section>
  );
}
