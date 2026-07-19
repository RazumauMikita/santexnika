import styles from "./page.module.css";
import { Hero } from "@/components/Hero";
import { HomeSections } from "@/components/HomeSections";
import { ServiceAdvantagesSection } from "@/components/ServiceAdvantagesSection";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <HomeSections
        leadSection={<ServiceAdvantagesSection />}
        servicesContinued
      />
    </main>
  );
}
