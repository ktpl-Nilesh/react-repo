import { DISPLAY_TYPE } from "@utils/constant"
import get from "lodash/get"
import size from "lodash/size"
import find from "lodash/find"
import unescape from "lodash/unescape"


import round from "lodash/round"
export function getBaseUrl() {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`
}

export const getProductPageLink = (url_key = "") => {
  return `/${url_key}`
}

export const getCategoryPageLink = (url_path = "") => {
  return `/${url_path}`
}

export const getMegaMenuLink = (url_path, linkType) => {
  switch (linkType) {
    case "link":
      return url_path
    case "category":
      return getCategoryPageLink(url_path)
    case "product":
      return getProductPageLink(url_path)
    default:
      return `/${url_path}`
  }
}

export function getAfterBeforeGallery(blockContent, displayType) {
  let galleryImages = []
  if (blockContent.gallery_images) {
    galleryImages = get(blockContent, "gallery_images", [])
  }
  let afterGallery = []
  let beforeGallery = []
  if (displayType === DISPLAY_TYPE.LARGE) {
    afterGallery = galleryImages.filter(
      (gitem) => gitem.image_type === "after_gallery"
    )
    beforeGallery = galleryImages.filter(
      (gitem) => gitem.image_type === "before_gallery"
    )
  } else {
    afterGallery = galleryImages.filter(
      (gitem) => gitem.image_type === "after_gallery_mobile"
    )
    beforeGallery = galleryImages.filter(
      (gitem) => gitem.image_type === "before_gallery_mobile"
    )
  }
  return { afterGallery, beforeGallery, galleryImages }
}

export const generateBannerLink = (linkType, link) => {
  switch (linkType) {
    case "brand":
    case "brand_id":
      return `/brand/${link}`
    case "custom_url":
    case "static_link":
      return link
    default:
      return `/${link}`
  }
}
// generate See All or Explore button link for Configurator blocks
export function getSeeAllLink(blockContent, blockType) {
  let seeAllLink
  if (blockType && blockType === "brand_slider") {
    seeAllLink = "/brands"
  } else {
    seeAllLink = generateBannerLink(
      blockContent.link_type,
      blockContent.redirection_link
    )
  }
  return seeAllLink
}
export const formatPrice = (price) => {
  return Number(price).toFixed(2)
}
export const getSaleableQty = (qty) => {
  const disabled = qty == 0
  return { disabled, qty: disabled ? 1 : Number(qty) }
}
export const formatDiscount = (discount) => discount

export const getHomePath = () => "/";

export const getPriceDetails = (priceRange) => {
  const finalPrice = get(priceRange, "minimum_price.final_price.value", 0)
  const finalPriceCurrency = get(
    priceRange,
    "minimum_price.final_price.currency",
    ""
  )
  const regularPrice = get(priceRange, "minimum_price.regular_price.value", 0)
  const regularCurrency = get(
    priceRange,
    "minimum_price.regular_price.currency",
    ""
  )
  const specialPriceDiff = Math.abs(finalPrice - regularPrice)
  const isSpecial = !!specialPriceDiff
  let discount = get(priceRange, "minimum_price.discount", null)
  return {
    finalPrice,
    price: regularPrice,
    isSpecial,
    currency: regularCurrency,
    discount,
  }
}

export const getAuthPath = (authType = "login") =>
  `/customer/account/${authType}`

export const getSelectedOptions = (
  selected_configuration_options,
  original_configuration_options
) => {
  if (
    size(selected_configuration_options) === 0 ||
    size(original_configuration_options) === 0
  ) {
    return []
  }
  const updated_config_options = selected_configuration_options.map(
    (option, index) => {
      // this condiition aded bcz it has [null, null] option
      if (size(option) === 0) {
        return {}
      }
      const selected_confguration = find(original_configuration_options, [
        "uid",
        option.configurable_product_option_uid,
      ])
      const selected_config_value = find(selected_confguration.values, [
        "uid",
        option.configurable_product_option_value_uid,
      ])
      return {
        ...option,
        ...selected_config_value,
        attribute_code: get(selected_confguration, "attribute_code", ""),
      }
    }
  )
  return updated_config_options
}
export const getOrderDetailsPath = (order_number = ":order_number") =>
  `/order/${order_number}`
export const getPlaceholderJpg = () => "/assets/images/placeholder_2.jpeg"
export const getTrackReturnLink = (order_number) =>
  `/track-returns/${order_number}`
export const getWishlistPath = () => "/wishlist"

export const disableBodyScroll = (status) => {
  if (status) {
    document.getElementsByTagName("html")[0].setAttribute("class", "no-scroll")
  } else {
    document.getElementsByTagName("html")[0].setAttribute("class", "html")
  }
}

export const replaceSpecialChars = (name) => {
  let newStr = unescape(name);
  newStr = newStr.replace(/&reg;|&amp;|&copy;|&trade;|&quot;/gi, (matched) => {
    return keyMap[matched];
  });
  return newStr;
};



export const setHeaderSticky = (status) => {
  if (!status) {
    const headerElem = document.getElementById("site_header");
    if (headerElem) {
      headerElem.setAttribute("class", "main-header header-ecom no-sticky");
    }
  } else {
    const headerElem = document.getElementById("site_header");
    if (headerElem) {
      headerElem.setAttribute("class", "main-header header-ecom");
    }
  }
};
