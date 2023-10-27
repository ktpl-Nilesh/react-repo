import * as React from "react";
import { useSelector } from "react-redux";
import { getCurrentStoreConfig } from "data/selectors/storeConfig.selector";
import { Helmet } from "react-helmet";
import { helmetJsonLdProp } from "react-schemaorg";

export const PDPSchema = ({ name, image, description, url, price, sku }) => {
  const storeConfig = useSelector(getCurrentStoreConfig);
  return (
    <Helmet
      script={[
        helmetJsonLdProp({
          "@context": "https://schema.org/",
          "@type": "Product",
          name: name,
          image: image,
          description: description,
          sku: sku,
          offers: {
            "@type": "Offer",
            url: url,
            priceCurrency: price.currency,
            price: price.value,
            availability: "https://schema.org/InStock",
          },
        }),
      ]}
    ></Helmet>
  );
};
