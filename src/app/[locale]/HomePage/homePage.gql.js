import gql from "graphql-tag"

export const BannerSliderImagesItemsFragment = gql`
  fragment BannerSliderImagesItemsFragment on BannerSliderImagesItems {
    id
    title
    show_title
    link_type
    link
    content_type
    video
    image
    mobile_image
    redirection_link
  }
`

export const BannerSliderFragment = gql`
  fragment BannerSliderFragment on BannerSlider {
    items {
      id
      show_title
      title
      slider_type
      background_type
      background_color
      background_image
      link_type
      redirection_link
      short_description
      slider_banner_images {
        ...BannerSliderImagesItemsFragment
      }
    }
  }
  ${BannerSliderImagesItemsFragment}
`

export const BannerSliderImagesFragment = gql`
  fragment BannerSliderImagesFragment on BannerSliderImages {
    items {
      ...BannerSliderImagesItemsFragment
    }
  }
`

const ProductsItemsFragment = gql`
  fragment ProductsItemsFragment on ProductInterface {
    uid
    name
    sku
    url_key
    stock_status
    review_count
    rating_summary
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
`

export const BasedOnSearchFragment = gql`
  fragment BasedOnSearchFragment on BasedOnSearch {
    items {
      id
      title
      show_title
      slider_view
      slider_view_mobile
      link_bg_color
      link_text_color
      redirection_link
      link_type
      background_type
      background_color
      background_image
      products {
        ...ProductsItemsFragment
      }
    }
  }
`

export const BrandSliderFragment = gql`
  fragment BrandSliderFragment on BrandSlider {
    items {
      brands {
        brand_id
        image
        page_title
        url_key
        value
      }
    }
  }
`
export const CategorySliderFragment = gql`
  fragment CategorySliderFragment on CategorySlider {
    items {
      id
      title
      show_title
      is_slider
      slider_view
      slider_view_mobile
      show_category_sub_title
      show_category_label
      link
      link_type
      link_bg_color
      link_text_color
      redirection_link
      background_type
      background_color
      background_image
      short_description
      gallery_images {
        url
        image
        image_type
        link
        link_type
        redirection_link
        position
        __typename
      }
      categories {
        uid
        name
        url_path
        desktop_category_image_thumbnail
        mobile_category_image_thumbnail
        image
        sub_title
      }
    }
  }
`

export const CmsBlockFragment = gql`
  fragment CmsBlockFragment on CmsBlockWidget {
    items {
      identifier
      title
      content
    }
  }
`

export const ProductSliderFragment = gql`
  ${ProductsItemsFragment}
  fragment ProductSliderFragment on ProductSlider {
    items {
      id
      title
      show_title
      slider_view
      slider_view_mobile
      link_bg_color
      link_text_color
      redirection_link
      link_type
      background_type
      background_color
      background_image
      short_description
      gallery_images {
        url
        image
        image_type
        link
        link_type
        redirection_link
        position
        __typename
      }
      products {
        ...ProductsItemsFragment
      }
    }
  }
`

export const RecentOrderFragement = gql`
  fragment RecentOrderFragement on RecentOrder {
    items {
      orders {
        items {
          number
          status
          status_code
          payment_methods {
            name
          }
          items {
            product_name
            product_sku
            product_url_key
            __typename
          }
          __typename
        }
        __typename
      }
      recent_wishlists {
        items_v2 {
          items {
            id
            __typename
          }
          __typename
        }
        __typename
      }
    }
  }
`

export const InspiredByWishlistFragement = gql`
  fragment InspiredByWishlistFragement on InspiredByWishlist {
    items {
      id
      title
      show_title
      slider_view
      slider_view_mobile
      link_bg_color
      link_text_color
      redirection_link
      background_type
      background_color
      background_image
      short_description
      inspired_wishlists {
        items_v2 {
          items {
            id
            __typename
          }
          __typename
        }
        __typename
      }
    }
  }
`

export const TopCategoriesFragment = gql`
  fragment TopCategoriesFragment on TopCategories {
    items {
      id
      title
      categories {
        uid
        name
        image
        url_path
        category_banner
        category_banner_ratio
        category_icon_desktop
        category_icon_mobile
      }
    }
  }
`

export const getHomePageQuery = (pageSize, currentPage) =>
  gql`
  query {
    dashboard1(pageSize: ${pageSize}, currentPage: ${currentPage}) {
      items {
        block_id
        block_type
        position
        __typename
        ...BannerSliderFragment
        ...BannerSliderImagesFragment
        ...BasedOnSearchFragment
        ...BrandSliderFragment
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
  ${BannerSliderFragment}
  ${BannerSliderImagesFragment}
  ${BasedOnSearchFragment}
  ${BrandSliderFragment}
  ${CategorySliderFragment}
  ${CmsBlockFragment}
  ${InspiredByWishlistFragement}
  ${ProductSliderFragment}
  ${RecentOrderFragement}
  ${TopCategoriesFragment}
`



export const getHomePageMetaDataQuery = gql`
  query getAvailableStores {
    availableStores(useCurrentGroup: true) {
      store_code
      url_store_code
      store_name
      is_default_store
      locale
      base_currency_code
      default_display_currency_code
      default_title
      default_description
      default_keywords
    }
  }
`;