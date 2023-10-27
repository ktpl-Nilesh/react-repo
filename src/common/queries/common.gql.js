import gql from "graphql-tag"

export const GET_AVAILABLE_STORES = gql`
  query getAvailableStores {
    availableStores(useCurrentGroup: true) {
      id
      store_code
      url_store_code
      store_name
      is_default_store
      store_group_code
      is_default_store_group
      locale
      base_currency_code
      default_display_currency_code
      product_shipping_text
      product_return_text
      product_warranty_text
      image_block
      default_title
      default_description
      default_keywords
      catalog_default_sort_by
      order_cancel_general_frontend_message
      return_order_general_frontend_message
      order_cancel_general_frontend_reason
      grid_per_page
      grid_per_page_values
      list_per_page
      list_per_page_values
      otp_expiration_time
      offers_page_uid
      coupon_prefix
      faq_enabled_product
      tamara_checkout_public_key
    }
  }
`

export const GET_ROUTE_DATA = gql`
  query getRouteData($url: String!) {
    route(url: $url) {
      type
      __typename
      relative_url
      redirect_code
      ... on CmsPage {
        identifier
        __typename
      }
      ... on CategoryTree {
        id
        uid
        is_enabled
        is_landing_page
        is_enabled
        meta_title
        meta_description
        meta_keywords
        image
        url_path
        __typename
      }
      ... on CategoryInterface {
        id
        uid
        meta_title
        __typename
      }
      ... on ConfigurableProduct {
        uid
        sku
        name
        rating_summary
        review_count
        meta_title
        meta_description
        meta_keyword
        url_key
        small_image {
          url
        }
        price_range {
          minimum_price {
            final_price {
              currency
              value
            }
          }
        }
        __typename
      }
      ... on SimpleProduct {
        uid
        sku
        name
        rating_summary
        review_count
        meta_title
        meta_description
        meta_keyword
        url_key
        small_image {
          url
        }
        price_range {
          minimum_price {
            final_price {
              currency
              value
            }
          }
        }
        __typename
      }
      ... on BundleProduct {
        uid
        sku
        name
        rating_summary
        review_count
        meta_title
        meta_description
        meta_keyword
        url_key
        small_image {
          url
        }
        price_range {
          minimum_price {
            final_price {
              currency
              value
            }
          }
        }
        __typename
      }
    }
  }
`

export const GET_ROUTE_DATA_STATUS = gql`
  query getRouteDataStatus($url: String!) {
    route: urlResolver(url: $url) {
      id: entity_uid
      type
      relative_url
      redirectCode
      __typename
    }
  }
`
