import styles from "./page.module.css";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Guarantees } from "@/components/Guarantees";
import { OrderSection } from "@/components/OrderSection";
import { HowWeWork } from "@/components/HowWeWork";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <Services />
      <Guarantees />
      <OrderSection />
      <HowWeWork />
    </main>
  );
}
