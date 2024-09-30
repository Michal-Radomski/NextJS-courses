import React from "react";

import Hero from "@/components/Hero";
import homeImg from "public/home.jpg";
// console.log("homeImg:", homeImg);

export default function HomePage(): JSX.Element {
  return (
    <React.Fragment>
      <Hero imgData={homeImg} imgAlt="car factory" title="Professional Cloud Hosting" />
    </React.Fragment>
  );
}
