import Image from "next/image";
import type { Guarantee } from "@/lib/guarantees";
import styles from "./GuaranteeCard.module.css";

type GuaranteeCardProps = {
  guarantee: Guarantee;
  className?: string;
};

export function GuaranteeCard({ guarantee, className }: GuaranteeCardProps) {
  return (
    <article className={`${styles.card} ${className ?? ""}`}>
      <div className={styles.iconWrap}>
        <Image
          src={guarantee.image}
          alt=""
          width={120}
          height={120}
          className={styles.icon}
        />
      </div>
      <h3 className={`${styles.title} roboto_condensed_bold`}>
        {guarantee.title}
      </h3>
      <p className={styles.description}>{guarantee.description}</p>
    </article>
  );
}
