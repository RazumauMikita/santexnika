"use client";

import { useState } from "react";
import { CallbackModal } from "@/components/CallbackModal";
import { ServiceAdvantages } from "@/components/ServiceAdvantages";
import { ServiceCard } from "@/components/ServiceCard";
import { SERVICES } from "@/lib/services";
import styles from "./Services.module.css";

export function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleOrder = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService("");
  };

  return (
    <>
      <section id="services" className={styles.section} aria-label="Услуги">
        <div className="container">
          <ServiceAdvantages />

          <div className={styles.headingContainer}>
            <h2 className={`${styles.heading} roboto_condensed_bold`}>
              <span className={styles.headingAccent}>Типовые</span>{" "}
              <span className={styles.headingDark}>решения</span>
            </h2>
          </div>

          <ul className={styles.grid}>
            {SERVICES.map((service) => (
              <li key={service.id} className={styles.gridItem}>
                <ServiceCard service={service} onOrder={handleOrder} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CallbackModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        serviceName={selectedService}
      />
    </>
  );
}
