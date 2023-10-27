import gql from "graphql-tag";


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
    }
  }
`;

export const GET_CMS_BLOCK = gql`
  query getCMSBlock($identifiers: [String]) {
    cmsBlocks(identifiers: $identifiers) {
      items {
        identifier
        title
        content
      }
    }
  }
`;
