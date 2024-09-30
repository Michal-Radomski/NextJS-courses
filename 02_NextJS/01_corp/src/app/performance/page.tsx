import React from "react";

import performanceImg from "public/performance.jpg";
import Hero from "@/components/Hero";

export default function PerformancePage(): JSX.Element {
  return (
    <React.Fragment>
      <Hero imgData={performanceImg} imgAlt="welding" title="We serve high performance applications" />
    </React.Fragment>
  );
}
