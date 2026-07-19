import type { Metadata } from "next";
import styles from "../page.module.css";
import { HomeSections } from "@/components/HomeSections";
import { PriceHero } from "@/components/PriceHero";
import { PriceList } from "@/components/PriceList";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Прайс-лист — ${SITE.name}`,
  description: "Прайс-лист на услуги сантехника в Витебске",
};

export default function PricePage() {
  return (
    <main className={styles.main}>
      <PriceHero />
      <HomeSections leadSection={<PriceList />} />
    </main>
  );
}
