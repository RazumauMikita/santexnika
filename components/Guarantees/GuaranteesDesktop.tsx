import Image from "next/image";
import { GuaranteeCard } from "@/components/GuaranteeCard";
import {
  GUARANTEES,
  GUARANTEE_ARROWS,
  GUARANTEE_CENTER_IMAGE,
} from "@/lib/guarantees";
import styles from "./GuaranteesDesktop.module.css";

export function GuaranteesDesktop() {
  const [topLeft, topRight, bottomLeft, bottomRight] = GUARANTEES;

  return (
    <div className={styles.layout}>
      <GuaranteeCard guarantee={topLeft} className={styles.topLeft} />
      <GuaranteeCard guarantee={topRight} className={styles.topRight} />
      <GuaranteeCard guarantee={bottomLeft} className={styles.bottomLeft} />
      <GuaranteeCard guarantee={bottomRight} className={styles.bottomRight} />

      <div className={styles.centerWrap} aria-hidden="true">
        <Image
          src={GUARANTEE_CENTER_IMAGE}
          alt=""
          width={220}
          height={220}
          className={styles.centerImage}
        />
      </div>

      <Image
        src={GUARANTEE_ARROWS.top}
        alt=""
        width={250}
        height={157}
        className={`${styles.arrow} ${styles.arrowTop}`}
        aria-hidden="true"
      />
      <Image
        src={GUARANTEE_ARROWS.right}
        alt=""
        width={145}
        height={105}
        className={`${styles.arrow} ${styles.arrowRight}`}
        aria-hidden="true"
      />
      <Image
        src={GUARANTEE_ARROWS.left}
        alt=""
        width={129}
        height={84}
        className={`${styles.arrow} ${styles.arrowLeft}`}
        aria-hidden="true"
      />
      <Image
        src={GUARANTEE_ARROWS.bottom}
        alt=""
        width={190}
        height={163}
        className={`${styles.arrow} ${styles.arrowBottom}`}
        aria-hidden="true"
      />
    </div>
  );
}
