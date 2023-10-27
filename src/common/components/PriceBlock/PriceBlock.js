import * as React from "react";
import { formatPrice } from "@utils/app.utils";

const PriceBlock = ({ currency, value, prefix }) => {
  return (
    <>
      {prefix ? <span className="prefix">{prefix}</span> : ""}
      <span className="currency">{currency + " "}</span>
      <span className="value">{formatPrice(value)}</span>
    </>
  );
};

export default PriceBlock