import gql from "graphql-tag";

export const productListFragment = gql`
  fragment productListFragment on Products {
    total_count
    sort_fields {
      default
      options {
        label
        value
      }
    }
    page_info {
      current_page
      page_size
      total_pages
    }
    items {
      uid
      name
      sku
      url_key
      stock_status
      ... on SimpleProduct {
        product_saleable_qty
      }
      short_description {
        html
      }
      price_range {
        minimum_price {
          final_price {
            value
            currency
          }
          regular_price {
            value
            currency
          }
          discount {
            percent_off
            amount_off
          }
        }
      }
      productLabel {
        items {
          label_text
          labelname
          label_text_data
          productlabel_id
          priority
        }
        totalCount
      }
      thumbnail {
        label
        url
      }
      ... on ConfigurableProduct {
        configurable_options {
          attribute_uid
          attribute_code
          label
          uid
          values {
            label
            uid
            swatch_data {
              ... on ImageSwatchData {
                thumbnail
              }
              value
            }
          }
        }
        variants {
          product {
            sku
            stock_status
            product_saleable_qty
            price_range {
              minimum_price {
                discount {
                  amount_off
                  percent_off
                }
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
            }
            thumbnail {
              label
              url
            }
          }
          attributes {
            code
            label
            uid
            value_index
          }
        }
      }
    }
  }
`;
export const GET_CATEGORY_PLP_DATA = gql`
  ${productListFragment}
  query getCategoryPLPData(
    $page: Int!
    $page_size: Int
    $filter: ProductAttributeFilterInput
    $search: String
    $sort: ProductAttributeSortInput
  ) {
    products: products(
      search: $search
      filter: $filter
      sort: $sort
      pageSize: $page_size
      currentPage: $page
    ) {
      ...productListFragment
    }
  }
`;

export const GET_CATEGORY_DATA = gql`
  query getCategoryData($category_uid: String!) {
    categories: categories(filters: { category_uid: { eq: $category_uid } }) {
      items {
        breadcrumbs {
          category_uid
          category_level
          category_name
          category_url_key
          category_url_path
          is_landing_page
        }
        id
        uid
        name
        url_key
        url_path
        is_landing_page
        meta_description
        meta_title
        meta_keywords
        image
        pwa_category_banner
        promotion_block_below_filters
        promotion_block
      }
    }
  }
`;
