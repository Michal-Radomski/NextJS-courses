import React from "react";

import reliabilityImg from "public/reliability.jpg";
import Hero from "@/components/Hero";

export default function ReliabilityPage(): JSX.Element {
  return (
    <React.Fragment>
      <Hero imgData={reliabilityImg} imgAlt="welding" title="Super high reliability hosting" />
    </React.Fragment>
  );
}
