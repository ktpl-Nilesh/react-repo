// import { gql } from "@apollo/client";
import gql from "graphql-tag"

export const configurableProductFields = `
  configurable_options {
    attribute_code
    attribute_uid
    uid
    label
    values {
      uid
      default_label
      label
      store_label
      use_default_value
      swatch_data {
        ... on ImageSwatchData {
          thumbnail
        }
        value
      }
    }
  }
  variants {
    attributes {
      code
      value_index
      uid
      label
    }
    product {
      uid
      stock_status
      product_saleable_qty
      media_gallery {
        url
        label
      }
      small_image {
        url
        label
      }
      thumbnail {
        label
        url
      }
      sku
      price_range {
        minimum_price {
          final_price {
            currency
            value
          }
          regular_price {
            currency
            value
          }
          discount {
            amount_off
            percent_off
          }
        }
      }
    }
  }
`

export const sliderFields = `
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
`

export const ProductFields = `
  __typename
  id
  uid
  meta_title
  meta_description
  meta_keyword
  name
  sku
  url_key
  only_x_left_in_stock
  stock_status
  ... on SimpleProduct {
    product_saleable_qty
  }
  rating_summary
  review_count
  is_returnable
  is_warranty
  free_shipping
  promotional_banner {
    html
  }
  price_tiers {
    quantity
    final_price {
      value
      currency
    }
  }
  categories {
    id
    uid
    name
    breadcrumbs {
      category_uid
      category_name
      category_url_path
      category_uid
      is_landing_page
    }
  }
  description {
    html
  }
  short_description {
    html
  }
  price_range {
    maximum_price {
      final_price {
        currency
        value
      }
      regular_price {
        currency
        value
      }
      discount {
        amount_off
        percent_off
      }
    }
    minimum_price {
      final_price {
        currency
        value
      }
      regular_price {
        currency
        value
      }
      discount {
        amount_off
        percent_off
      }
    }
  }
  media_gallery {
    url
    label
    position
    disabled
    ... on ProductVideo {
      video_content {
          media_type
          video_provider
          video_url
          video_title
          video_description
          video_metadata
      }
  }
  }
  small_image {
    url
  }
  thumbnail {
    label
    url
  }
  image {
    label
    url
  }
  productLabel {
    items {
      labelname
      status
      priority
      label_text
    }
    totalCount
  }
`

const ProductDetailsFragment = gql`
  fragment ProductDetailsFragment on Products {
    items {
      size_chart
      ${ProductFields}
      additional_information {
        group_label
        attributes {
          code
          label
          value
          __typename
        }
        __typename
      }
      ... on ConfigurableProduct {
        configurable_options {
          attribute_code
          attribute_uid
          uid
          label
          values {
            uid
            default_label
            label
            store_label
            use_default_value
            swatch_data {
              ... on ImageSwatchData {
                thumbnail
                value
              }
              value
            }
          }
        }
        variants {
          attributes {
            code
            value_index
            uid
            label
          }
          product {
            uid
            stock_status
            product_saleable_qty
            media_gallery {
              url
              label
              position
              disabled
              ... on ProductVideo {
                video_content {
                    media_type
                    video_provider
                    video_url
                    video_title
                    video_description
                    video_metadata
                }
            }
            }
            small_image {
              url
              label
            }
            thumbnail {
              label
              url
            }
            sku
            price_range {
              minimum_price {
                discount {
                  percent_off
                  amount_off
                }
                regular_price {
                  value
                  currency
                }
                final_price {
                  value
                  currency
                }
              }
            }
          }
        }
      }
    }
  }
`

export default ProductDetailsFragment
