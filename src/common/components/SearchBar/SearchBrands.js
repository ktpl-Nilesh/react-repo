import * as React from "react";
import { Link } from "react-router-dom";

export const SearchBrands = ({ brands, hidePopup }) => {
  return (
    <>
      {brands.map((brand, index) => (
        <div className="brand-list" key={index} onClick={hidePopup}>
          <Link to={`/${brand.url}`}>{brand.label}</Link>
        </div>
      ))}
    </>
  );
};
