"use client"
import React from "react"
import { useCallback, useEffect } from "react"
import classNames from "classnames"
// import { useNavigate } from "react-router"
// import { useDispatch, useSelector } from "react-redux"
import get from "lodash/get"
import size from "lodash/size"
import HTMLReactParser from "html-react-parser"
import { useI18n } from "@locales/client"
import Slider from "react-slick"
import { PriceString } from "../../../../common/components/PriceBlock"
import {
  formatDiscount,
  formatPrice,
  getPriceDetails,
  getProductPageLink,
  getSaleableQty,
} from "@utils/app.utils"

// import useWishlist from "pages/WishlistPage/useWishlist"
// import useCart from "pages/CartPage/useCart"
import { getSelectedOptions } from "@utils/app.utils"
// import { isOutOfStock } from "utils/findMatchingProductVariant"
// import { getIsUserLoggedIn } from "data/selectors/users.selectors"
import { getAuthPath } from "@utils/app.utils"
import Link from "next/link"
// import { addNotification } from "data/reducers/notification.reducer"
// import { NOTIFICATION_TYPE } from "components/common/Notification/notificationType"
// import { getWishlistId } from "data/selectors/appState.selector"
// import { POPUP_TYPE, setPopupType } from "data/reducers/storeConfig.reducer"

/**
 * Render Item from wishlist in Products from wishlist slider.
 *
 * Parent:
 *      ProductsFromWishlist
 */

const Wishlistitem = async ({ wishlistItem }) => {
  const t = useI18n()

  // const navigate = useNavigate()
  // const dispatch = useDispatch()
  // const wishlistId = useSelector(getWishlistId)
  // const isLoggedIn = useSelector(getIsUserLoggedIn)

  // const { handleRemoveFromWishlist } = useWishlist()
  // const { handleAddToCart, addingToCart } = useCart()
  const { product } = wishlistItem

  const productPrice = get(product, "price_range.minimum_price.final_price")
  const originalPrice = get(product, "price_range.minimum_price.regular_price")
  const productDiscount = get(
    product,
    "price_range.minimum_price.discount",
    null
  )

  let priceDetails = getPriceDetails(get(product, "price_range", {}))
  let selectedVariant = get(product, "variants", [])
  const parentStockStatus = get(product, "stock_status")
  const parentOutOfStock = parentStockStatus === "OUT_OF_STOCK"

  const isConfigurableWishlistItem =
    get(product, "__typename", "") === "ConfigurableWishlistItem"
  let saleableQty = get(product, "product_saleable_qty", null)
  const productImage = get(product, "small_image.url", "")
  let selected_options = {}

  if (isConfigurableWishlistItem) {
    selected_options = getSelectedOptions(
      get(wishlistItem, "configurable_options", {}),
      get(product, "configurable_options", {})
    )
    if (!!size(selectedVariant)) {
      saleableQty = get(selectedVariant, "0.product.product_saleable_qty", null)
      priceDetails = getPriceDetails(
        get(selectedVariant, "0.product.price_range", {})
      )
    }
  }

  // const _isOutOfStock =
  //   isOutOfStock(wishlistItem) ||
  //   getSaleableQty(saleableQty).disabled ||
  //   parentOutOfStock

  const moveToCart = useCallback(
    (e, btn_type) => {
      e.preventDefault()
      if (!size(wishlistId)) {
        return
      }
      if (_isOutOfStock) return
      if (addingToCart) return
      if (!isLoggedIn && btn_type === "buyNow") {
        // dispatch(setPopupType(POPUP_TYPE.AUTH_MODAL))
        // dispatch(
        //   addNotification({
        //     type: NOTIFICATION_TYPE.ERROR,
        //     title: t("checkout.noti.loginRequiredTitle"),
        //     text: t("checkout.noti.loginRequiredText"),
          // })
        // )
        return
      }
      const addToCartReq = {
        sku: product.sku,
        quantity: Number(wishlistItem.quantity),
        url_key: getProductPageLink(product.url_key),
        navigateToCheckout: btn_type === "buyNow",
      }
      // if product is configured then add selected option
      if (isConfigurableWishlistItem) {
        addToCartReq.selected_options = selected_options.map(
          (opt) => opt.configurable_product_option_value_uid
        )
      }
      addToCartReq.onSuccess = () => {
        // remove product from the wishlist
        handleRemoveFromWishlist(wishlistId, [wishlistItem.id])
      }
      // add to cart graphql call
      handleAddToCart(addToCartReq)
    },
    [wishlistItem, wishlistId]
  )

  return (
    <div className="recently-prod-inn">
      <div className="recen-thumbnail">
        <Link
          className="link"
          href={getProductPageLink(product.url_key)}
          target="_blank">
          <img src={productImage} />
        </Link>
      </div>
      <div className="recen-product-info">
        <div className="full-width-design">
          <div className="product-name">
            <Link
              className="link"
              href={getProductPageLink(product.url_key)}
              target="_blank">
              {HTMLReactParser(product.name)}
            </Link>
          </div>
          <div className="product-price">
            <span className="product-final">
              <span className="currency">{productPrice.currency} </span>
              <span className="value">{formatPrice(productPrice.value)}</span>
            </span>
          </div>
          {productDiscount && productDiscount.amount_off > 0 ? (
            <del className="product-discount">
              {originalPrice.value !== productPrice.value ? (
                <span className="product-original">
                  <PriceString
                    currency={originalPrice.currency}
                    value={formatPrice(originalPrice.value)}
                  />
                </span>
              ) : (
                ""
              )}
              <span className="percent">
                {` (${formatDiscount(productDiscount.percent_off)}% ${t(
                  "discount.off"
                )})`}{" "}
              </span>
            </del>
          ) : (
            ""
          )}
        </div>
        <div className="recen-action-bottom">
          <button className="buy-now" 
          // onClick={(e) => moveToCart(e, "buyNow")}
          >
            {/* {t("pdp.buynow")} */}
          </button>
          <button
            className="add-to-cart"
            type="button"
            // onClick={moveToCart}
            disabled={addingToCart}
            >
            {addingToCart ? t("loading") : t("pdp.addToCart")}
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * Render Products from wishlist block on Homepage and CLP.
 *
 * Parent:
 *      RecentOrderAndWishList
 */

const ProductsFromWishlist = ({ containerWidthCls }) => {
  // const { wishlist, getWishlist } = useWishlist()
  // const slicedWishlist = [...wishlist].reverse().slice(0, 4)
  // useEffect(() => {
  //   getWishlist()
  // }, [])

  // const sliderRef = React.useRef()
  // const isRTL = window.isRTL

  var settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    currentSlide: 0,
    centerMode: false,
    centerPadding: "0",
    swipe: true,
    // isRTL: !!window.isRTL,
    isRTL: false,

  }
  // set See All Button Link
  // React.useEffect(() => {
  //   if (sliderRef.current && isRTL) {
  //     sliderRef.current.slickGoTo(slicedWishlist.length - 1)
  //   }
  // }, [slicedWishlist])
  return (
    <div className={classNames("recently-prod-box", containerWidthCls)}>
      {/* <h3>{t("home.yourWishlist")}</h3> */}
      {size(slicedWishlist) > 1 ? (
        <Slider {...settings} ref={sliderRef}>
          {slicedWishlist.map((item) => (
            <React.Fragment key={item.id}>
              <Wishlistitem wishlistItem={item} />
            </React.Fragment>
          ))}
        </Slider>
      ) : size(slicedWishlist) > 0 ? (
        <Wishlistitem wishlistItem={get(slicedWishlist, "0", {})} />
      ) : (
        ""
      )}
    </div>
  )
}
export default ProductsFromWishlist
