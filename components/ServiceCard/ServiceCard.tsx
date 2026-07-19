import Image from "next/image";
import type { Service } from "@/lib/services";
import styles from "./ServiceCard.module.css";

type ServiceCardProps = {
  service: Service;
  onOrder: (serviceTitle: string) => void;
};

export function ServiceCard({ service, onOrder }: ServiceCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        {service.image ? (
          <Image
            src={service.image}
            alt=""
            fill
            className={styles.image}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true" />
        )}
      </div>

      <div className={styles.titleBar}>
        <h3 className={styles.title}>{service.title}</h3>
      </div>

      <div className={styles.priceBlock}>
        <p className={styles.price}>
          {service.priceFrom ? (
            <span className={styles.priceFrom}>от </span>
          ) : null}
          <span className={styles.priceValue}>{service.price}</span>
          <span className={styles.priceCurrency}>
            {" "}
            рублей{service.priceSuffix ?? ""}
          </span>
        </p>
      </div>

      <button
        type="button"
        className={`${styles.orderBtn} junegullregular`}
        onClick={() => onOrder(service.title)}
      >
        Заказать
      </button>
    </article>
  );
}
