import type { ReactNode } from "react";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { Guarantees } from "@/components/Guarantees";
import { OrderSection } from "@/components/OrderSection";
import { HowWeWork } from "@/components/HowWeWork";

type HomeSectionsProps = {
  leadSection?: ReactNode;
  servicesContinued?: boolean;
};

export function HomeSections({
  leadSection,
  servicesContinued = false,
}: HomeSectionsProps) {
  return (
    <>
      {leadSection}
      <Services continued={servicesContinued} />
      <Gallery />
      <Guarantees />
      <OrderSection />
      <HowWeWork />
    </>
  );
}
