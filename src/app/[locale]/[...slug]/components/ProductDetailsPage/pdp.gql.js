// import { gql } from "@apollo/client";
import gql from "graphql-tag"
import { productListFragment } from "../../components/ProductList/ProductList.gql.js"

export const CUSTOMER_VIEWED_PRODUCT = gql`
  mutation customerViewedProduct($product_sku: String!) {
    addViewedProduct(product_sku: $product_sku)
  }
`

export const GET_ALL_PROMOTIONS = gql`
  query getAllPromotions($sku: String) {
    getRulesBasedOnProductId(sku: $sku) {
      rule_id
      title
      short_description
      description
    }
  }
`

export const NOTIFY_ME = gql`
  mutation NotifyInStock($email: String!, $productSku: String!) {
    MpProductAlertNotifyInStock(
      input: { email: $email, productSku: $productSku }
    ) {
      customer_email
      last_send_date
      product_id
      send_count
      status
    }
  }
`

export const CUSTOMER_NOTIFY_ME = gql`
  mutation CustomerNotifyInStock($productSku: String!) {
    MpProductAlertCustomerNotifyInStock(input: { productSku: $productSku }) {
      customer_email
      last_send_date
      send_count
      status
    }
  }
`

export const NOTIFY_CONFIG = gql`
  query {
    MpProductAlertsConfigs {
      stock_alert {
        button_text
        popup_setting {
          button_text
          description
          footer_content
          heading_text
          place_holder
        }
        show_listing_page
        subscribed_text
      }
    }
  }
`

export const GET_PRODUCTS_BY_SKU = gql`
  ${productListFragment}
  query getProductsBySku(
    $page_size: Int
    $filter: ProductAttributeFilterInput
  ) {
    products: products(filter: $filter, pageSize: $page_size) {
      ...productListFragment
    }
  }
`
