import gql from "graphql-tag";

export const GET_PRODUCT_CATEGORIES = gql`
  query getProductCategories($sku: String) {
    products(filter: { sku: { eq: $sku } }) {
      items {
        sku
        categories {
          id
          uid
          name
          include_in_menu
          breadcrumbs {
            category_uid
            category_name
            category_url_path
            category_uid
            is_landing_page
          }
        }
      }
    }
  }
`;
