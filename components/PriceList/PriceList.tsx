import { PRICE_LIST } from "@/lib/priceList";
import styles from "./PriceList.module.css";

export function PriceList() {
  return (
    <section className={styles.section} aria-label="Прайс-лист">
      <div className="container">
        <h2 className={`${styles.heading} roboto_condensed_bold`}>
          Прайс-лист
        </h2>

        <div className={styles.categories}>
          {PRICE_LIST.map((category) => (
            <article key={category.id} className={styles.category}>
              {category.title ? (
                <h3 className={`${styles.categoryTitle} roboto_condensed_bold`}>
                  {category.title}
                </h3>
              ) : null}

              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th scope="col">Виды работ</th>
                      <th scope="col">Цена, руб.</th>
                      <th scope="col">Ед. изм.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>
                          {item.priceFrom ? "от " : ""}
                          {item.price} руб.
                        </td>
                        <td>{item.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
