// import { gql } from "@apollo/client";
import gql from "graphql-tag"
// import { productListFragment } from "components/ProductList/productListFragment"
import ProductDetailsFragment, {
  sliderFields,
} from "./productDetailsFragment.gql"
export const GET_PRODUCT_DETAILS = gql`
  ${ProductDetailsFragment}
  query getProductDetails($filter: ProductAttributeFilterInput) {
    products(filter: $filter, pageSize: 1) {
      ...ProductDetailsFragment
    }
  }
`

export const GET_FBT_PRODUCTS = gql`
  
  query getProductSliders($filter: ProductAttributeFilterInput) {
    products(filter: $filter, pageSize: 1) {
      items {
        fbt_products {
          ${sliderFields}
        }
      }
    }
  }
`
