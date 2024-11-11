import React from "react";

import variableColors from "./styles/_App.module.scss";

const { textColor } = variableColors;

export default function HomePage(): JSX.Element {
  return (
    <React.Fragment>
      <h1 style={{ color: textColor, textAlign: "center" }} className="text-3xl font-bold underline">
        HomePage
      </h1>
    </React.Fragment>
  );
}
