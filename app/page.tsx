import styles from "./page.module.css";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Guarantees } from "@/components/Guarantees";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <Services />
      <Guarantees />
    </main>
  );
}
