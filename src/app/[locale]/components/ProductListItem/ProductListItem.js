"use client"
import React, { useState, useCallback, useMemo } from "react"

// import { useDispatch, useSelector } from "react-redux"

import HTMLReactParser from "html-react-parser"
import get from "lodash/get"
import sortBy from "lodash/sortBy"
import has from "lodash/has"
import map from "lodash/map"
import size from "lodash/size"
import some from "lodash/some"

import {ConfigurableOptions} from "../ConfigurableOptions"
// import Loader from
import { PriceBlock } from "../../../../common/components/PriceBlock"
import { PriceString } from "../../../../common/components/PriceBlock"
import ImageRenderer from "../../../../common/components/Image/image"

// import { getWishlistId, getDisplayType } from "data/selectors/appState.selector"
// import { getIsUserLoggedIn } from "data/selectors/users.selectors"
import { DISPLAY_TYPE } from "@utils/constant"
// import useCart from "pages/CartPage/useCart"
// import useWishlist from "pages/WishlistPage/useWishlist"
// import { getWishlistIds } from "data/selectors/cart.selector"

import { formatDiscount, getProductPageLink, getSaleableQty } from "@utils/app.utils"
// import { POPUP_TYPE, setPopupType } from "data/reducers/storeConfig.reducer"

import "./product-item.scss"
import Link from "next/link"
// import { useLazyQuery } from "@apollo/client"
// import { GET_PRODUCT_FILTERS } from "components/ProductList/PLPData.gql"
// import { GET_PRODUCT_CATEGORIES } from "./productListItem.gql"
// import { dlAddToWishlist } from "data/dataLayer/dataLayerEvents"
// import { useBreadcrumbs } from "../Breadcrumbs/useBreadcrumbs"
// import { getBreadcrumbCategory } from "components/ProductDetailsPage/product.utils"
// import { getCurrentStoreConfig } from "data/selectors/storeConfig.selector"
import { useI18n } from "@locales/client"


/**
 * Renders Product list item
 *
 * Parent
 *    ProductListGrid
 *    ProductSlider
 */
 const ProductListItem = async({ product, rating = false, config }) => {
  const t =  useI18n()

  // const dispatch = useDispatch()
  // const storeConfig = useSelector(getCurrentStoreConfig)
  // let { addingToCart, handleAddToCart, dlAddToCart } = useCart()
  // const { generateBreadcrumbs } = useBreadcrumbs({ categoryId: null })
  // const [getFilters] = useLazyQuery(GET_PRODUCT_FILTERS, {
  //   variables: {
  //     filter: { sku: { eq: product.sku } },
  //   },
  // })
  // const [getCategories] = useLazyQuery(GET_PRODUCT_CATEGORIES, {
  //   variables: { sku: product.sku },
  // })
  const firstVariant = get(product, "variants.0", null)
  const variants = get(product, "variants", [])

  const [productMediaGallery, setProductMediaGallery] = useState(
    product.thumbnail
  )
  const [selected_option_uid, setSelectedOptionUid] = useState(null)
  // const displayType = useSelector(getDisplayType)
  const displayType=DISPLAY_TYPE.LARGE
  // let {
  //   addingToWishlist,
  //   handleAddToWishlist,
  //   handleRemoveFromWishlist,
  //   removingFromWishlist,
  //   wishlist,
  // } = useWishlist()
  // const wishlistId = useSelector(getWishlistId)
  // const isLoggedIn = useSelector(getIsUserLoggedIn)
  // const productIdsInWishlist = useSelector(getWishlistIds)
  // product data
  let productPrice = get(product, "price_range.minimum_price.final_price", {})
  let originalPrice = get(
    product,
    "price_range.minimum_price.regular_price",
    {}
  )
  let productDiscount = get(product, "price_range.minimum_price.discount", null)
  // const addedToWishlist = has(productIdsInWishlist, product.uid)
  const isConfigurable = get(product, "__typename") === "ConfigurableProduct"
  const parentStockStatus = get(product, "stock_status")
  const parentSaleableQty = get(product, "product_saleable_qty", null)
  // for simple product just check stock status and saleable qty of product
  const parentOutOfStock = parentStockStatus === "OUT_OF_STOCK"
  let productOutOfStock =
    parentOutOfStock || getSaleableQty(parentSaleableQty).disabled
  if (isConfigurable) {
    let variantStockStatus, variantSaleableQty

    if (size(firstVariant)) {
      variantStockStatus = get(firstVariant, "product.stock_status")
      variantSaleableQty = get(firstVariant, "product.product_saleable_qty")
    } else {
      // check any variant is IN_STOCK or product_saleable_qty available
      const anyInstock = some(variants, (v) => {
        return get(v, "product.stock_status") === "IN_STOCK"
      })
      const anySaleableQty = some(variants, (v) => {
        return Number(get(v, "product.product_saleable_qty")) > 0
      })
      variantStockStatus = anyInstock ? "IN_STOCK" : "OUT_OF_STOCK"
      variantSaleableQty = anySaleableQty ? 1 : 0
    }

    // for configurable product manage productOutOfStock
    if (parentOutOfStock) {
      // everything out of stock if parentOutOfstock
      productOutOfStock = true
    }
  }

  let productLabel = get(product, "name", [])
  productLabel = sortBy(productLabel, [
    function (p) {
      return p.priority
    },
  ])

  // const addProductToCart = useCallback(() => {
  //   if (addingToCart) return
  //   if (productOutOfStock || !!size(firstVariant)) {
  //     window.open(`${storeConfig.url_store_code}/${product.url_key}`, "_blank")
  //     return
  //   }

  //   const selected_options = map(get(firstVariant, "attributes"), "uid")
  //   handleAddToCart({
  //     sku: product.sku,
  //     quantity: 1,
  //     selected_options,
  //   })
  //   dlAddToCart(
  //     product.uid,
  //     product.sku,
  //     firstVariant ? firstVariant.product : product,
  //     1,
  //     get(firstVariant, "attributes", [])
  //   )
  // }, [product, firstVariant])

  // let addProductToWishList = useCallback(async () => {
  //   if (addingToWishlist) return
  //   if (!!size(firstVariant)) {
  //     window.open(`${storeConfig.url_store_code}/${product.url_key}`, "_blank")
  //     return
  //   }
  //   if (!isLoggedIn) {
  //     dispatch(setPopupType(POPUP_TYPE.AUTH_MODAL))
  //   }

  //   const selected_options = map(get(firstVariant, "attributes"), "uid")
  //   handleAddToWishlist(wishlistId, {
  //     sku: product.sku,
  //     quantity: 1,
  //     selected_options,
  //   })

  //   // data layer add to wishlist
  //   let filterList = []
  //   let categories = []
  //   try {
  //     const filtersRes = await getFilters()
  //     filterList = get(filtersRes, "data.products.aggregations", [])
  //   } catch (e) {
  //     filterList = []
  //   }
  //   try {
  //     const categoryRes = await getCategories()
  //     categories = get(categoryRes, "data.products.items.0.categories", [])
  //   } catch {
  //     categories = []
  //   }
  //   let item_brand = ""
  //   let pbrand = filterList.find(
  //     (fltr) => fltr.attribute_code == "global_brand"
  //   )
  //   if (pbrand && pbrand.options.length > 0) {
  //     item_brand = pbrand.options[0].label
  //   }

  //   const selectedOptions = get(firstVariant, "attributes", [])
  //   let dlData = {
  //     item_name: product.name,
  //     item_id: product.sku,
  //     price: get(product, "price_range.minimum_price.final_price.value", 0),
  //     item_brand: item_brand,
  //     item_variant: "",
  //     discount: get(
  //       product,
  //       "price_range.minimum_price.discount.amount_off",
  //       0
  //     ),
  //     discounted_price: get(
  //       product,
  //       "price_range.minimum_price.final_price.value",
  //       0
  //     ),
  //     image_url: get(product, "thumbnail.url", 0),
  //   }
  //   const brList = generateBreadcrumbs(
  //     getBreadcrumbCategory(categories)?.breadcrumbs,
  //     getBreadcrumbCategory(categories)
  //   )

  //   brList.forEach((cat, cidx) => {
  //     if (cidx === 0) {
  //       dlData["item_category"] = cat.name
  //     } else {
  //       dlData[`item_category${cidx + 1}`] = cat.name
  //     }
  //   })
  //   if (!!size(selectedOptions)) {
  //     selectedOptions.forEach((opt, oidx) => {
  //       if (oidx === 0) {
  //         dlData["item_variant"] = opt.label || opt.value_label
  //       } else {
  //         dlData[`item_variant${oidx + 1}`] = opt.label || opt.value_label
  //       }
  //     })
  //   }
  //   dlAddToWishlist(dlData)
  // }, [product, firstVariant])

  // const onRemoveFromWishlistPress = useCallback(() => {
  //   if (removingFromWishlist) return
  //   const itemId = get(productIdsInWishlist, `${product.uid}`, "")
  //   const item = wishlist.find((it) => it.id, itemId)
  //   handleRemoveFromWishlist(wishlistId, [itemId], item)
  // }, [
  //   removingFromWishlist,
  //   handleRemoveFromWishlist,
  //   productIdsInWishlist,
  //   wishlistId,
  //   product.uid,
  // ])

  // const handleConfigMedia = (configValue) => {
  //   const { variants } = product
  //   let configVariant = variants.find((variant) =>
  //     variant.attributes.find((attr) => attr.uid === configValue.uid)
  //   )
  //   if (configVariant && configVariant.product.thumbnail) {
  //     setSelectedOptionUid(configValue.uid)
  //     setProductMediaGallery(configVariant.product.thumbnail)
  //   }
  // }

  // const renderWishlistIcon = useMemo(() => {
  //   if (addedToWishlist) {
  //     return (
  //       <div
  //         className="wishlist-btn active"
  //         onClick={(e) => {
  //           e.preventDefault
  //           onRemoveFromWishlistPress()
  //         }}>
  //         {removingFromWishlist ? <Loader position="absolute" /> : ""}
  //         <span></span>
  //       </div>
  //     )
  //   } else {
  //     return (
  //       <div
  //         className="wishlist-btn"
  //         onClick={(e) => {
  //           e.preventDefault()
  //           addProductToWishList()
  //         }}>
  //         {addingToWishlist ? <Loader position="absolute" /> : ""}
  //         <span></span>
  //       </div>
  //     )
  //   }
  // }, [
  //   addedToWishlist,
  //   addingToWishlist,
  //   addProductToWishList,
  //   onRemoveFromWishlistPress,
  //   removingFromWishlist,
  // ])

  let labelToDisplay = productLabel[0]
  return (
    <div className="product-list-item fdc jcsb">
      <div className="product-info">
        <div className="product-thumbnail">
          {labelToDisplay && labelToDisplay.label_text ? (
            <div className="product-label">
              <span className="label-text">{labelToDisplay.label_text}</span>
            </div>
          ) : (
            ""
          )}
          <Link
            className="link"
            href={getProductPageLink(product.url_key)}
            target="_blank">
            <ImageRenderer
              url={productMediaGallery && productMediaGallery.url}
              alt={product.name}
              height={205}
              width={195}
              minHeight="205px"
              className="product-thumb"
            />
          </Link>
          {/* <img
              src={product.small_image.url}
              height={270}
              width={255}
              alt="product image"
            /> */}
        </div>
        <div className="product-name-price">
          <div className="product-name">
            <Link
              className="link"
              href={getProductPageLink(product.url_key)}
              target="_blank">
              {product.name ? HTMLReactParser(product.name) : ""}
            </Link>
          </div>
          <div className="product-price">
            <span className="product-final">
              <PriceBlock
                currency={productPrice?.currency || ""}
                value={productPrice?.value || 0}
              />
            </span>
          </div>

          {/* hidden as per mentioned in [AMITCL-530] */}
          {productDiscount && productDiscount.amount_off > 0 ? (
            <del className="product-discount">
              {originalPrice.value !== productPrice.value ? (
                <span className="product-original">
                  <PriceString
                    currency={originalPrice?.currency || ""}
                    value={originalPrice?.value || 0}
                  />
                </span>
              ) : (
                ""
              )}
              <span className="percent">{` (${formatDiscount(
                productDiscount.percent_off
              )}%)`}</span>
            </del>
          ) : (
            ""
          )}
        </div>
        {product.review_count > 0 ? (
          <div className="product-reviews-summary">
            <div className="star-ratings">
              <div
                className="fill-ratings"
                style={{ width: product.rating_summary + "%" }}></div>
            </div>
            <div className="reviews-actions">
              <span>{product.review_count}</span>&nbsp;
              {/* <span>{t("product.reviews")}</span> */}
            </div>
          </div>
        ) : null}
      </div>
      {config &&
      product.configurable_options &&
      displayType != DISPLAY_TYPE.LARGE ? (
        <div className="product-item-config">
          {product.configurable_options
            .filter((configOption) =>
              configOption.attribute_code.includes("color")
            )
            .map((configOption) => (
              <div key={configOption.attribute_uid}>
                <ConfigurableOptions
                  option={configOption}
                  selected_option_uid={selected_option_uid}
                  onOptionPress={(configValue) => {
                    handleConfigMedia(configValue)
                  }}
                />
              </div>
            ))}
        </div>
      ) : (
        ""
      )}
      <div className={"product-actions row aic " + (rating ? "jcsb" : "")}>
        {/* {productOutOfStock ? (
          <div className="text-center out-of-stock">{t("plp.outOfStock")}</div>
        ) : (
          ""
        )} */}
        <div className="product-btns">
          {/* {renderWishlistIcon} */}
          <div
            className="cart-btn"
            // onClick={(e) => {
            //   e.stopPropagation()
            //   addProductToCart()
            // }}
            >
            {/* {addingToCart ? <Loader position="absolute" /> : ""} */}
            <span className="no-display">Add to Cart</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default React.memo(ProductListItem)