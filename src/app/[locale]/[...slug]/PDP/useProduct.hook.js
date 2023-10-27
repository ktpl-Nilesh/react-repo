import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import size from "lodash/size";
import get from "lodash/get";
import {
  GET_FBT_PRODUCTS,
  GET_PRODUCT_DETAILS,
} from "./productDetailsQuery.gql";
import {isClientSide} from "utils/misc";

/**
 * PDP Hook
 *
 * User to fetch and set product detail an product extra detail
 */
const useProduct = ({ sku }) => {
  const [productData, setProductData] = useState();

  const [getProductExtra, { error: pdpExtraError }] = useLazyQuery(
    GET_FBT_PRODUCTS,
    {
      skip: !isClientSide(),
      variables: { filter: { sku: { eq: sku } } },
      // context: { fetchOptions: { method: "GET" } },
      onCompleted: (data) => {
        setProductData(
          Object.assign({}, productData, get(data, "products.items.0", []))
        );
      },
    }
  );

  const [getProductInfo, { loading: dataLoading, error: dataError }] =
    useLazyQuery(GET_PRODUCT_DETAILS, {
      skip: !isClientSide() || !!size(productData),
      variables: { filter: { sku: { eq: sku } } },
      context: { fetchOptions: { method: "GET" } },
      onCompleted: (data) => {
        setProductData(
          Object.assign({}, productData, get(data, "products.items.0", []))
        );
        getProductExtra();
      },
    });

  return {
    dataLoading,
    dataError,
    productData,
    pdpExtraError,
    getProductInfo,
  };
};

export default useProduct;
