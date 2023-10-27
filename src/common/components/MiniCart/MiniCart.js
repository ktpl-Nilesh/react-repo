import * as React from "react"
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { t } from "i18next"

import get from "lodash/get"
import isNull from "lodash/isNull"
import reduce from "lodash/reduce"
import size from "lodash/size"
import find from "lodash/find"
import filter from "lodash/filter"

import { PriceString } from "../PriceBlock/PriceString"

// import {
//   getCartPath,
//   getCheckoutPath,
//   getPlaceholderSvg,
// } from "constants/url.constant";
// import useCart from "pages/CartPage/useCart";
// import {
//   getCartDetails,
//   getCartFetched,
//   getCartId,
//   getCartLoading,
// } from "data/selectors/cart.selector";
import {
  // getPriceDetails,
  getProductPageLink,
  getSaleableQty,
} from "@utils/app.utils.js"
import { getI18n } from "@locales/server"
// import { getSelectedOptions } from "components/CartPage/CartProductList/CartProductList"
// import { isOutOfStock } from "utils/findMatchingProductVariant"

import "./mini-cart.scss"
// import { POPUP_TYPE, setPopupType } from "data/reducers/storeConfig.reducer"
// import { getIsUserLoggedIn } from "data/selectors/users.selectors"
// import Loader from "../Loader";

const MiniCart = async () => {
  const t = await getI18n()
  // const { fetchCartDetails, handleRemoveFromCart, removingFromCart } = useCart()
  // const navigate = useNavigate()
  // const dispatch = useDispatch()
  // const iseLoggedIn = useSelector(getIsUserLoggedIn)
  // const cartId = useSelector(getCartId)
  // const cart = useSelector(getCartDetails)
  // const cartLoading = useSelector(getCartLoading)
  // const cartFetched = useSelector(getCartFetched)

  // React.useEffect(() => {
  //   if (!cartLoading && !cartFetched && !!cartId) {
  //     // fetchCartDetails(cartId)
  //   }
  // }, [cartId, cartLoading, cartFetched])

  // const cartItems = get(cart, "items", [])

  // const badgeCount = reduce(
  //   cartItems,
  //   function (result, datum) {
  //     if (!!datum) {
  //       result += get(datum, "quantity", 0)
  //     }
  //     return result
  //   },
  //   0
  // )

  //prevent checkout if not logged in
  const verifyLogin = (e) => {
    if (!iseLoggedIn) {
      e.preventDefault()
      dispatch(setPopupType(POPUP_TYPE.AUTH_MODAL))
    } else {
      if (!!size(cartItems)) navigate(getCheckoutPath())
    }
  }

  return (
    <div className="minicart">
      {/* {cartLoading && !size(cart.items) ? <Loader /> : ""} */}
      {/* <Link to={getCartPath()} className="minicart-icon"> */}
      <div className="minicart-icon">
        <span>Cart Icon</span>
      </div>
      {/* {badgeCount ? <div className="added-number">{badgeCount ? badgeCount :  0}</div> : null} */}
      {/* </Link> */}
      <div className="cart-popup common-popup">
        <div className="popup-content">
          <div className="top-title fdc">
            <h3>{t("miniCart.myCart")}</h3>
            {/* <div className="ItemInCart">
              {cartItems.length > 0
                ? t("minicart.cartItemsCount", { itemCount: cartItems.length })
                : t("minicart.noItems")}
            </div> */}
          </div>
          {/* {cartItems.length ? (
            <>
              <ul className="product-lists">
                {cartItems.map((item, i) => {
                  if (isNull(item)) {
                    return <div key={i}>{t("product.outOfStock")}</div>
                  }
                  const name = get(item, "product.name", "")
                  let priceDetails = getPriceDetails(
                    get(item, "product.price_range", {})
                  )
                  const variants = get(item, "product.variants", [])
                  let saleableQty = get(
                    item,
                    "product.product_saleable_qty",
                    null
                  )
                  let prodImage = get(item, "product.small_image.url", "")
                  const isConfigurableCartItem =
                    get(item, "__typename", "") === "ConfigurableCartItem"

                  let selected_options = []
                  if (isConfigurableCartItem) {
                    selected_options = getSelectedOptions(
                      get(item, "configurable_options", []),
                      get(item, "product.configurable_options", [])
                    )

                    let selectedVariant = variants
                    // get all variants of already selected options and will not change
                    for (
                      let sOptInd = 0;
                      sOptInd < selected_options.length;
                      sOptInd++
                    ) {
                      const currOpt = selected_options[sOptInd]
                      selectedVariant = filter(selectedVariant, (v) => {
                        return find(v.attributes, ["uid", currOpt.uid])
                      })
                    }

                    if (size(selectedVariant) === 1) {
                      priceDetails = getPriceDetails(
                        get(selectedVariant, "0.product.price_range", {})
                      )
                      prodImage = get(
                        selectedVariant,
                        "0.product.media_gallery.0.url"
                      )
                      saleableQty = get(
                        selectedVariant,
                        "0.product.product_saleable_qty",
                        null
                      )
                    }
                  }

                  const _isOutOfStock =
                    getSaleableQty(saleableQty).disabled || isOutOfStock(item)
                  const { price, isSpecial, finalPrice, currency } =
                    priceDetails
                  // final image should be variant image | product image | placeholder image
                  prodImage =
                    prodImage ||
                    get(item, "product.small_image.url", "") ||
                    getPlaceholderSvg()

                  return (
                    <li className="jcsb aic" key={item.uid}>
                      <div className="left-part aic">
                        <div className="ProductImage no-shrink">
                          <img
                            src={prodImage}
                            alt={name}
                            height="100"
                            width="94"
                          />
                        </div>
                        <div className="ProductDetail">
                          <Link
                            to={getProductPageLink(
                              get(item, "product.url_key", "")
                            )}
                            sku={get(item, "product.sku", "")}>
                            <h3>{name}</h3>
                          </Link>
                          <div className="SpecialPrice fdc">
                            <span className="normal">
                              <PriceString
                                currency={currency}
                                value={finalPrice}
                              />
                            </span>
                            {isSpecial ? (
                              <span className="special">
                                <PriceString
                                  currency={currency}
                                  value={price}
                                />
                              </span>
                            ) : null}
                          </div>
                          <div className="SpecialPrice fdc">
                            <span className="normal">
                              {`${t("fieldName.quantity")}: ${item.quantity}`}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="ProductAction no-shrink">
                        {_isOutOfStock ? (
                          <div className="AddtoCart common-btn">
                            <div className="remove out-of-stock">
                              {t("wishlist.outOfStock")}
                            </div>
                          </div>
                        ) : null}
                        {removingFromCart === item.uid ? (
                          <div className="remove">
                            <a href="#">Loading...</a>
                          </div>
                        ) : (
                          <div
                            className="remove"
                            onClick={handleRemoveFromCart(item.uid)}>
                            <a href="#">{t("minicart.removeFromCart")}</a>
                          </div>
                        )}

                        <Link
                          to={getProductPageLink(
                            get(item, "product.url_key", "")
                          )}
                          sku={get(item, "product.sku", "")}
                          className="AddView common-btn no-display">
                           <span>{t("miniCart.viewProduct")}</span> 
                        </Link>
                      </div>
                    </li>
                  )
                })}
              </ul>
              <div className="bottom-btns row">
                <Link to={getCartPath()} className="action minicart-btn">
                  {t("miniCart.viewCartBtn")}
                </Link>
                <a
                  className="action minicart-btn"
                  href=""
                  onClick={(e) => {
                    e.preventDefault()
                    verifyLogin(e)
                  }}>
                  {t("miniCart.checkoutBtn").toUpperCase()}
                </a>
              </div>
            </>
          ) : (
            ""
          )} */}
        </div>
      </div>
    </div>
  )
}

export default MiniCart
