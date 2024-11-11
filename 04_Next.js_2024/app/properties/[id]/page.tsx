import React from "react";
import { Params } from "next/dist/server/request/params";

const PropertyPage = ({ params }: { params: Params }): JSX.Element => {
  return <React.Fragment>{params?.id}</React.Fragment>;
};

export default PropertyPage;
