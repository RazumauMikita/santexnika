import Image from "next/image";
import { getGalleryImages } from "@/lib/getGalleryImages";
import styles from "./Gallery.module.css";

export function Gallery() {
  const images = getGalleryImages();

  if (images.length === 0) {
    return null;
  }

  return (
    <section id="objects" className={styles.section} aria-label="Галерея работ">
      <div className="container">
        <div className={styles.headingContainer}>
          <h2 className={`${styles.heading} roboto_condensed_bold`}>
            Галерея работ
          </h2>
        </div>
      </div>

      <ul className={styles.grid}>
        {images.map((src) => (
          <li key={src} className={styles.gridItem}>
            <Image
              src={src}
              alt=""
              width={400}
              height={300}
              className={styles.image}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
