import gql from "graphql-tag";

export const GET_SORT_FIELDS = gql`
  query availableSortFields(
    $filter: ProductAttributeFilterInput
    $search: String
  ) {
    products(filter: $filter, search: $search) {
      total_count
      sort_fields {
        default
        options {
          label
          value
        }
      }
    }
  }
`;

export const GET_PRODUCT_FILTERS = gql`
  query availableProductFilters(
    $filter: ProductAttributeFilterInput
    $search: String
  ) {
    products(filter: $filter, search: $search) {
      total_count
      sort_fields {
        options {
          label
          value
        }
      }
      aggregations {
        attribute_code
        label
        count
        options {
          count
          label
          value
        }
      }
    }
  }
`;
export const GET_CATEGORY_TREE = gql`
query getCategoryTree($category_uid: String!) {
  categories: categories(filters: { category_uid: { eq: $category_uid } }) {
    items {
      uid
      id
      name
      url_key
      url_path
      is_landing_page
      children {
        id
        uid
        name
        is_landing_page
        url_key
        url_path
        children {
          id
          uid
          name
          is_landing_page
          url_key
          url_path
        }
      }
    }
  }
}
`;

