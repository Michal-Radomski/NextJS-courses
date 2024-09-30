import React from "react";

import scaleImg from "public/scale.jpg";
import Hero from "@/components/Hero";

export default function ScalePage(): JSX.Element {
  return (
    <React.Fragment>
      <Hero imgData={scaleImg} imgAlt="steel factory" title="Scale your app to infinity." />
    </React.Fragment>
  );
}
