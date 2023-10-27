// import { gql } from "@apollo/client";

// export const GET_SEARCH_RESULTS = gql`
//   query getSearchResults($searchText: String!) {
//     search(query: $searchText) {
//       catalogsearch_fulltext {
//         misspells
//         identifier
//         items(pageSize: 5, currentPage: 1, sort: {}, filter: {}) {
//           uid
//           name
//           sku
//           review_count
//           rating_summary
//           url_key
//           price_range {
//             minimum_price {
//               discount {
//                 percent_off
//                 amount_off
//               }
//               regular_price {
//                 value
//                 currency
//               }
//               final_price {
//                 value
//                 currency
//               }
//             }
//             maximum_price {
//               discount {
//                 percent_off
//                 amount_off
//               }
//               regular_price {
//                 value
//                 currency
//               }
//             }
//           }
//           small_image {
//             label
//             url
//           }
//           thumbnail {
//             label
//             url
//           }
//           ... on ConfigurableProduct {
//             configurable_options {
//               attribute_uid
//               attribute_code
//               label
//               uid
//               values {
//                 label
//                 uid
//                 swatch_data {
//                   ... on ImageSwatchData {
//                     thumbnail
//                   }
//                   value
//                 }
//               }
//             }
//           }
//         }
//         position
//         size
//         title
//       }
//       magento_catalog_attribute {
//         identifier
//         items(pageSize: 20, currentPage: 1) {
//           label
//           value
//           url
//         }
//         position
//         size
//         title
//       }
//       magento_catalog_attribute_2 {
//         identifier
//         items(pageSize: 20, currentPage: 1) {
//           label
//           value
//         }
//         position
//         size
//         title
//       }
//       magento_catalog_attribute_3 {
//         identifier
//         items(pageSize: 20, currentPage: 1) {
//           label
//           value
//         }
//         position
//         size
//         title
//       }
//       magento_catalog_attribute_4 {
//         identifier
//         items(pageSize: 20, currentPage: 1) {
//           label
//           value
//         }
//         position
//         size
//         title
//       }
//       magento_catalog_attribute_5 {
//         identifier
//         items(pageSize: 20, currentPage: 1) {
//           label
//           value
//         }
//         position
//         size
//         title
//       }
//       magento_catalog_category {
//         identifier
//         items(pageSize: 20, currentPage: 1) {
//           id
//           uid
//           name
//           image
//           url_key
//           url_path
//           url_suffix
//           pwa_category_image
//           children_count
//           parent_category {
//             uid
//             name
//             custom_parent_category_name_path
//           }
//         }
//         position
//         size
//         title
//       }
//       magento_cms_page {
//         identifier
//         items(pageSize: 20, currentPage: 1) {
//           identifier
//           title
//           url_key
//         }
//         position
//         size
//         title
//       }
//     }
//   }
// `;
