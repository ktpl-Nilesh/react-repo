import gql from "graphql-tag"

import {
  BannerSliderFragment,
  BannerSliderImagesFragment,
  BasedOnSearchFragment,
  CategorySliderFragment,
  CmsBlockFragment,
  InspiredByWishlistFragement,
  ProductSliderFragment,
  RecentOrderFragement,
  TopCategoriesFragment,
} from "../../HomePage/homePage.gql"

export const GET_CATEGORY_LANDING_PAGE_DATA = gql`
  query getCategoryLandingData(
    $category_uid: String!
    $pageSize: Int!
    $currentPage: Int!
  ) {
    categories(filters: { category_uid: { eq: $category_uid } }) {
      items {
        uid
        name
        shop_by_brand {
          items {
            brand_id
            image
            page_title
            product_quantity
            url_key
            value
          }
        }
        category_landing_page_content(
          pageSize: $pageSize
          currentPage: $currentPage
        ) {
          items {
            block_id
            block_type
            position
            __typename
            ...BannerSliderFragment
            ...BannerSliderImagesFragment
            ...BasedOnSearchFragment
            ...CategorySliderFragment
            ...CmsBlockFragment
            ...InspiredByWishlistFragement
            ...ProductSliderFragment
            ...RecentOrderFragement
            ...TopCategoriesFragment
          }
          page_info {
            current_page
            page_size
            total_pages
            has_more_pages
          }
        }
      }
    }
  }
  ${BannerSliderFragment}
  ${BannerSliderImagesFragment}
  ${BasedOnSearchFragment}
  ${CategorySliderFragment}
  ${CmsBlockFragment}
  ${InspiredByWishlistFragement}
  ${ProductSliderFragment}
  ${RecentOrderFragement}
  ${TopCategoriesFragment}
`
