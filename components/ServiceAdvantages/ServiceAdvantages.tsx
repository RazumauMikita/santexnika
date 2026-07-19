import Image from "next/image";
import { SERVICE_ADVANTAGES } from "@/lib/serviceAdvantages";
import styles from "./ServiceAdvantages.module.css";

export function ServiceAdvantages() {
  return (
    <ul className={styles.list}>
      {SERVICE_ADVANTAGES.map((item) => (
        <li key={item.id} className={styles.item}>
          <div className={styles.iconWrap}>
            <Image
              src={item.image}
              alt=""
              width={88}
              height={88}
              className={styles.icon}
            />
          </div>
          <p className={`${styles.title} roboto_condensed_bold`}>{item.title}</p>
        </li>
      ))}
    </ul>
  );
}
