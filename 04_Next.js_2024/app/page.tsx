import React from "react";

import variableColors from "./styles/_App.module.scss";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperties from "@/components/HomeProperties";
import FeaturedProperties from "@/components/FeaturedProperties";

const { textColor } = variableColors;
console.log({ textColor });

export default function HomePage(): JSX.Element {
  return (
    <React.Fragment>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </React.Fragment>
  );
}
