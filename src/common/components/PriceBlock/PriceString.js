import * as React from "react";
import { formatPrice } from "@utils/app.utils";
export const PriceString = ({ currency, value, prefix }) => {
  return (
    <React.Fragment>{`${prefix ? prefix + " " : ""}${currency} ${formatPrice(
      value
    )}`}</React.Fragment>
  );
};
