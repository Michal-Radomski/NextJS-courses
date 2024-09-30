import React from "react";
import Image from "next/image";

import homeImg from "public/home.jpg";

export default function HomePage(): JSX.Element {
  return (
    <React.Fragment>
      <div>HomePage</div>
      <div className="absolute -z-10 inset-0">
        <Image src={homeImg} alt={"Car Factory"} fill={true} style={{ objectFit: "cover" }} />
      </div>
    </React.Fragment>
  );
}
