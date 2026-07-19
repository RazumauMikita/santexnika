import Image from "next/image";
import { Fragment } from "react";
import {
  HOW_WE_WORK_SEPARATOR,
  HOW_WE_WORK_STEPS,
} from "@/lib/howWeWork";
import styles from "./HowWeWork.module.css";

export function HowWeWork() {
  return (
    <section className={styles.section} aria-label="Как мы работаем">
      <div className="container">
        <div className={styles.headingContainer}>
          <h2 className={`${styles.heading} roboto_condensed_bold`}>
            Как мы работаем
          </h2>
        </div>

        <ol className={styles.steps}>
          {HOW_WE_WORK_STEPS.map((step, index) => (
            <Fragment key={step.id}>
              <li key={step.id} className={styles.stepItem}>
                <article className={styles.step}>
                  <div className={styles.iconWrap}>
                    <Image
                      src={step.image}
                      alt=""
                      width={80}
                      height={71}
                      className={styles.icon}
                    />
                  </div>
                  <h3 className={`${styles.stepTitle} roboto_condensed_bold`}>
                    {step.title}
                  </h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </article>
              </li>

              {index < HOW_WE_WORK_STEPS.length - 1 && (
                <li
                  key={`${step.id}-separator`}
                  className={styles.separatorItem}
                  aria-hidden="true"
                >
                  <Image
                    src={HOW_WE_WORK_SEPARATOR}
                    alt=""
                    width={33}
                    height={33}
                    className={styles.separatorIcon}
                  />
                </li>
              )}
            </Fragment>
          ))}
        </ol>
      </div>
    </section>
  );
}
