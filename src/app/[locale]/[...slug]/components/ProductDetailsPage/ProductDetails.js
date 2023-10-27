import React from "react" // useState, // useRef, // useMemo, // useEffect, // useCallback,
// import { Controller, useForm } from "react-hook-form";
// import { useTranslation } from "react-i18next";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useMutation } from "@apollo/client";

import get from "lodash/get"
import size from "lodash/size"
import filter from "lodash/filter"
import find from "lodash/find"
import has from "lodash/has"
import some from "lodash/some"

// import Breadcrumbs from "components/common/Breadcrumbs";
// import Loader from "components/common/Loader";
import Loader from "../../../../../common/components/Loader"

import QuantityDropdown from "./QuantityDropdown"
import { ProductShareWrapper } from "./ProductShare"
import CMSBlock from "../../../../../common/components/CMSBlock"
// import ProductSlider from "../../../../../common/components/ProductItemList/ProductSlider"
// import ProductConfigurableOptions from "./ProductConfigurableOptions"
import ProductImageGallery from "./ProductImageGallery"
import ProductOffers from "./ProductOffers"
import ProductPriceBlock from "./ProductPriceBlock"
import { ProductFeatures } from "./ProductFeatures"
// import { NotifyMePopup } from "./NotifyMe/NotifyMePopup"
// import { FrequentlyBoughtTogether } from "./FrequentlyBoughtTogether/FrequentlyBoughtTogether"
import ClientWrapper from "../ClientWrapper"

// import useCart from "pages/CartPage/useCart";
// import useWishlist from "pages/WishlistPage/useWishlist";
// import {
//   getDisplayType,
//   getWishlistId,
// } from "data/selectors/appState.selector";
// import { getIsUserLoggedIn } from "data/selectors/users.selectors";
// import {
//   getCurrentStoreConfig,
//   getPopupType,
// } from "data/selectors/storeConfig.selector";
// import { getWishlistIds } from "data/selectors/cart.selector";

// import { addNotification } from "data/reducers/notification.reducer";
import { DISPLAY_TYPE, NOTIFICATION_TYPE } from "@utils/constant.js"
import { CUSTOMER_VIEWED_PRODUCT, GET_ALL_PROMOTIONS } from "./pdp.gql"
import { getBreadcrumbCategoryId } from "./product.utils"
import { getSaleableQty } from "@utils/app.utils.js"
import { getBaseUrl } from "@utils/app.utils"

import { PromoBanner } from "./PromoBanner"
// import { DISPLAY_TYPE } from "data/reducers/appState.reducer";
// import SizeChart from "./SizeChart"
// import { useNotifyMe } from "./NotifyMe/useNotifyMe"
// import { getI18n } from "@locales/server"
import Link from "next/link"
import { getCurrentLocale, getI18n } from "@locales/server"
import { fetchGqlServer } from "@utils/data.utils"
// import Portal from "components/Portal";
// import { POPUP_TYPE, setPopupType } from "data/reducers/storeConfig.reducer"
// import { useSenseiPDP } from "../common/sensei/useSenseiPDP"
// import { RenderSenseiProducts } from "../common/sensei/RenderSenseiProducts"

const getProductsOffers = async ({ sku }) => {
  try {
    const { data } = await fetchGqlServer({
      query: GET_ALL_PROMOTIONS.loc?.source?.body,
      variables: { sku: sku },
      nextOptions: {
        revalidate: 60,
      },
    })

    return data
  } catch (err) {}
}

export const ProductDetails = async ({ productData }) => {
  const t = await getI18n()
  // const storeConfig = useSelector(getCurrentStoreConfig)
  // const navigate = useNavigate()
  // const location = useLocation()
  // const dispatch = useDispatch()
  // const popupType = useSelector(getPopupType)
  // const configRef = useRef()
  // const disPlayType = useSelector(getDisplayType)
  // const { addingToCart, handleAddToCart } = useCart()
  // const { handleAddToWishlist, addingToWishlist, handleRemoveFromWishlist } =
  //   useWishlist()
  // const [onProductView] = useMutation(CUSTOMER_VIEWED_PRODUCT)
  const {
    configurable_options,
    description,
    short_description,
    price_range,
    media_gallery,
    image,
    name,
    rating_summary,
    review_count,
    categories,
    fbt_products,
    variants,
    sku,
    is_returnable,
    is_warranty,
    uid,
    free_shipping,
    additional_information,
    promotional_banner,
    __typename,
    size_chart,
  } = productData

  const locale = getCurrentLocale()
  const cuponData = await getProductsOffers({ sku })
  console.log(
    "🚀 ~ file: ProductDetails.js:119 ~ ProductDetails ~ cuponData:",
    cuponData
  )

  // const [configMessage, setConfigMessage] = useState("")
  // const [buyNowClicked, setBuynowClick] = useState(false)
  // const [productMediaGallery, setProductMediaGallery] = useState(
  //   media_gallery.length > 0 ? [...media_gallery] : [image]
  // )
  const productMediaGallery =
    media_gallery.length > 0 ? [...media_gallery] : [image]

  // const isLoggedIn = useSelector(getIsUserLoggedIn)
  // const { handleNotifyMe, notifyMeLoading, notifyConfig } = useNotifyMe()

  // const { units, handleSenseiAddtoCart } = useSenseiPDP({ productData })

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     onProductView({ variables: { product_sku: productData.sku } })
  //   }
  //   window.scrollTo({ top: 0 })
  // }, [])

  const isConfigurable = __typename === "ConfigurableProduct"
  // const warranty_text = get(storeConfig, "product_warranty_text", "")
  // const free_shipping_text = get(storeConfig, "product_shipping_text", "")
  // const return_text = get(storeConfig, "product_return_text", "")
  const isWarrantyOrShipping = Boolean(
    (is_warranty && warranty_text) || (free_shipping && free_shipping_text)
  )

  let productPrice = price_range?.minimum_price
  const parentStockStatus = get(productData, "stock_status")
  const parentSaleableQty = get(productData, "product_saleable_qty", null)
  let saleableQty = parentSaleableQty

  // const wishlistId = useSelector(getWishlistId)
  // const productIdsInWishlist = useSelector(getWishlistIds)

  // configurable options will only be set if configurable otions exist
  // for simple products it will pass []
  // const { register, handleSubmit, watch, control } = useForm({
  //   defaultValues: {
  //     selected_options:
  //       size(configurable_options) > 0
  //         ? configurable_options.map(() => "")
  //         : [],
  //   },
  //   mode: "all",
  //   criteriaMode: "all",
  // })

  // for simple product just check stock status and saleable qty of product
  const parentOutOfStock = parentStockStatus === "OUT_OF_STOCK"
  let productOutOfStock =
    parentOutOfStock || getSaleableQty(parentSaleableQty).disabled
  // start variant processing
  // const selected_options = watch("selected_options")
  const selected_options = []
  let selectedOptVariants = []
  if (isConfigurable) {
    // list state will update variants as user starts to select opitons
    selectedOptVariants = variants
    for (let sOptInd = 0; sOptInd < selected_options.length; sOptInd++) {
      const currOpt = selected_options[sOptInd]
      if (!!currOpt) {
        selectedOptVariants = filter(selectedOptVariants, (v) => {
          return find(v.attributes, ["uid", currOpt])
        })
      }
    }
    let variantStockStatus, variantSaleableQty
    // update stock status and product price once user selects variants
    // check logic if selected_options is exist
    if (selected_options.length && size(selectedOptVariants) === 1) {
      variantSaleableQty = get(
        selectedOptVariants,
        "0.product.product_saleable_qty",
        null
      )
      variantStockStatus = get(selectedOptVariants, "0.product.stock_status")
      productPrice = get(
        selectedOptVariants,
        "0.product.price_range.minimum_price"
      )
    } else {
      // check any variant is IN_STOCK or product_saleable_qty available
      const anyInstock = some(selectedOptVariants, (v) => {
        return get(v, "product.stock_status") === "IN_STOCK"
      })
      const anySaleableQty = some(selectedOptVariants, (v) => {
        return Number(get(v, "product.product_saleable_qty")) > 0
      })
      variantStockStatus = anyInstock ? "IN_STOCK" : "OUT_OF_STOCK"
      variantSaleableQty = anySaleableQty ? 1 : 0
    }

    // for configurable product manage productOutOfStock
    if (parentOutOfStock) {
      // everything out of stock if parentOutOfstock
      productOutOfStock = true
    } else {
      productOutOfStock =
        variantStockStatus === "OUT_OF_STOCK" ||
        getSaleableQty(variantSaleableQty).disabled
    }
    saleableQty = variantSaleableQty
  } else {
    selectedOptVariants = variants
  }

  // const added_to_wishlist = has(productIdsInWishlist, `${uid}`)

  // const onSubmit = useCallback(
  //   (data) => {
  //     if (
  //       configurable_options &&
  //       configurable_options.length > 0 &&
  //       size(selectedOptVariants) === 0
  //     ) {
  //       dispatch(
  //         addNotification({
  //           type: NOTIFICATION_TYPE.WARNING,
  //           title: t("wentWrong.title"),
  //           text: t("pdp.noVariantFound"),
  //         })
  //       )
  //       return
  //     }
  //     if (productOutOfStock) {
  //       setConfigMessage(t("pdp.noti.outofstock"))
  //       return
  //     }
  //     if (
  //       configurable_options &&
  //       configurable_options.length > 0 &&
  //       data.selected_options.includes("")
  //     ) {
  //       setConfigMessage(t("pdp.noti.addCartErrorText"))
  //       if (disPlayType !== DISPLAY_TYPE.LARGE) {
  //         configRef.current.scrollIntoView()
  //       }

  //       return
  //     }
  //     if (addingToCart) return
  //     setConfigMessage("")
  //     handleAddToCart({
  //       sku,
  //       quantity: get(data, "quantity", 0),
  //       selected_options: get(data, "selected_options", []),
  //     })
  //     handleSenseiAddtoCart({
  //       sku: size(selectedOptVariants)
  //         ? selectedOptVariants[0].product.sku
  //         : sku,
  //     })
  //   },
  //   [
  //     productOutOfStock,
  //     sku,
  //     addingToCart,
  //     handleAddToCart,
  //     handleSenseiAddtoCart,
  //   ]
  // )

  // const onBuyNow = (data) => {
  //   if (!isLoggedIn) {
  //     dispatch(setPopupType(POPUP_TYPE.AUTH_MODAL))
  //     dispatch(
  //       addNotification({
  //         type: NOTIFICATION_TYPE.ERROR,
  //         title: t("checkout.noti.loginRequiredTitle"),
  //         text: t("checkout.noti.loginRequiredText"),
  //       })
  //     )
  //     return
  //   }
  //   if (productOutOfStock) {
  //     setConfigMessage(t("pdp.noti.outofstock"))
  //     return
  //   }
  //   if (
  //     configurable_options &&
  //     configurable_options.length > 0 &&
  //     size(selectedOptVariants) === 0
  //   ) {
  //     dispatch(
  //       addNotification({
  //         type: NOTIFICATION_TYPE.WARNING,
  //         title: t("wentWrong.title"),
  //         text: t("pdp.noVariantFound"),
  //       })
  //     )
  //     return
  //   }
  //   if (
  //     configurable_options &&
  //     configurable_options.length > 0 &&
  //     data.selected_options.includes("")
  //   ) {
  //     setConfigMessage(t("pdp.noti.addCartErrorText"))
  //     return
  //   }
  //   if (addingToCart) return
  //   setBuynowClick(true)
  //   setConfigMessage("")
  //   handleAddToCart({
  //     sku,
  //     quantity: get(data, "quantity", 0),
  //     selected_options: get(data, "selected_options", []),
  //     navigateToCheckout: true,
  //   })
  // }
  // const notiFyMe = () => {
  //   if (parentOutOfStock) {
  //     handleNotifyMe(sku)
  //   } else {
  //     if (
  //       configurable_options &&
  //       configurable_options.length > 0 &&
  //       selected_options.includes("")
  //     ) {
  //       setConfigMessage(t("pdp.noti.addCartErrorText"))
  //       configRef.current.scrollIntoView()

  //       if (disPlayType !== DISPLAY_TYPE.LARGE) {
  //         configRef.current.scrollIntoView()
  //       }

  //       return
  //     }
  //     handleNotifyMe(
  //       selectedOptVariants && selectedOptVariants.length > 0
  //         ? get(selectedOptVariants, "0.product.sku", sku)
  //         : sku
  //     )
  //   }
  // }
  // const onAddToWishlistPress = (data) => {
  //   // show notification if config option not selected
  //   if (
  //     configurable_options &&
  //     configurable_options.length > 0 &&
  //     data.selected_options.includes("")
  //   ) {
  //     dispatch(
  //       addNotification({
  //         type: NOTIFICATION_TYPE.ERROR,
  //         title: t("pdp.noti.addWishlistErrorTitle"),
  //         text: t("pdp.noti.addWishlistErrorText"),
  //       })
  //     )
  //     return
  //   }

  //   if (!isLoggedIn) {
  //     dispatch(setPopupType(POPUP_TYPE.AUTH_MODAL))
  //     // notification is fire by handleAddToWishlist if not loggedin
  //   }

  //   handleAddToWishlist(wishlistId, {
  //     sku: sku,
  //     quantity: Number(get(data, "quantity", 0)),
  //     selected_options: get(data, "selected_options", []),
  //   })
  // }

  // const onRemoveWishlistPress = useCallback(() => {
  //   const itemId = get(productIdsInWishlist, `${uid}`, "")
  //   handleRemoveFromWishlist(wishlistId, [itemId], name)
  // }, [productIdsInWishlist, uid, wishlistId, name])

  // const handleConfigMedia = (configValue) => {
  //   let configVariant = variants.find((variant) =>
  //     variant.attributes.find((attr) => attr.uid === configValue.uid)
  //   )
  //   // console.log(selected_options, configValue);
  //   // if (configVariant && configVariant.product.media_gallery.length > 0) {
  //   //   setProductMediaGallery([...configVariant.product.media_gallery]);
  //   // }
  // }

  // useEffect(() => {
  //   if (selectedOptVariants && selectedOptVariants.length > 0) {
  //     let configVariant = selectedOptVariants[0]
  //     if (configVariant && configVariant.product.media_gallery.length > 0) {
  //       setProductMediaGallery([...configVariant.product.media_gallery])
  //     } else {
  //       setProductMediaGallery([...media_gallery])
  //     }
  //   }
  // }, [selected_options])

  //check and decide where size chart will be displyed based on attributes of the product
  let sizeChartPos = -1
  if (configurable_options && configurable_options.length > 0) {
    sizeChartPos = configurable_options.findLastIndex((cfg) =>
      cfg.attribute_code.includes("size")
    )
  }

  // const renderWishlistIcon = () => {
  //   if (addingToWishlist) {
  //     return (
  //       <div className="wishlist">
  //         <Loader />
  //         <span></span>
  //       </div>
  //     )
  //   } else if (added_to_wishlist) {
  //     return (
  //       <div
  //         className="wishlist active"
  //         onClick={(e) => {
  //           e.preventDefault()
  //           onRemoveWishlistPress()
  //         }}>
  //         <span></span>
  //       </div>
  //     )
  //   } else {
  //     return (
  //       <div
  //         className="wishlist"
  //         onClick={(e) => {
  //           e.preventDefault()
  //           handleSubmit(onAddToWishlistPress)()
  //         }}>
  //         <span></span>
  //       </div>
  //     )
  //   }
  // }
  //  [addingToWishlist, added_to_wishlist, onRemoveWishlistPress])

  // const mayRenderWarrantyOrShipping = useMemo(() => {
  //   return isWarrantyOrShipping ? (
  //     <div className="product-offer row aic">
  //       {free_shipping &&
  //       free_shipping_text &&
  //       free_shipping_text.length > 0 ? (
  //         <div className="offer aic">
  //           <span className="icon-wrapper">
  //             <svg viewBox="0 0 24 24" fill="none" className="swap">
  //               <path
  //                 d="M16.8407 19.6608V6.65918"
  //                 stroke="#130F26"
  //                 strokeWidth="1.5"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //               />
  //               <path
  //                 d="M20.9173 15.7637L16.8395 19.6827L12.7617 15.7637"
  //                 stroke="#130F26"
  //                 strokeWidth="1.5"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //               />
  //               <path
  //                 d="M6.91102 4.08203V17.0836"
  //                 stroke="#130F26"
  //                 strokeWidth="1.5"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //               />
  //               <path
  //                 d="M2.83398 8.00013L6.91176 4.08105L10.9895 8.00013"
  //                 stroke="#130F26"
  //                 strokeWidth="1.5"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //               />
  //             </svg>
  //           </span>
  //           <span className="label">{free_shipping_text}</span>
  //         </div>
  //       ) : null}
  //       {is_warranty && warranty_text && warranty_text.length > 0 ? (
  //         <div className="offer aic">
  //           <span className="icon-wrapper">
  //             <svg viewBox="0 0 23 24" fill="none" className="swap">
  //               <path
  //                 fillRule="evenodd"
  //                 clipRule="evenodd"
  //                 d="M11.4846 21.038C11.4846 21.038 18.8369 18.8201 18.8369 12.7058C18.8369 6.59065 19.1033 6.11328 18.5139 5.52515C17.9236 4.93702 12.4486 3.03516 11.4846 3.03516C10.5205 3.03516 5.04552 4.93702 4.45614 5.52515C3.86581 6.11328 4.13222 6.59065 4.13222 12.7058C4.13222 18.8201 11.4846 21.038 11.4846 21.038Z"
  //                 stroke="#130F26"
  //                 strokeWidth="1.5"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //               />
  //               <path
  //                 d="M8.99414 11.7444L10.8073 13.5536L14.5429 9.83008"
  //                 stroke="#130F26"
  //                 strokeWidth="1.5"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //               />
  //             </svg>
  //           </span>
  //           <span className="label">{warranty_text}</span>
  //         </div>
  //       ) : null}
  //     </div>
  //   ) : null
  // }, [
  //   isWarrantyOrShipping,
  //   free_shipping,
  //   free_shipping_text,
  //   is_warranty,
  //   warranty_text,
  // ])

  // const mayRenderAdditionalInformation = useMemo(() => {
  //   return size(additional_information) ? (
  //     <ProductFeatures
  //       features={additional_information}
  //       selected_options={selected_options}
  //       configurable_options={configurable_options}
  //       selectedOptVariants={selectedOptVariants}
  //     />
  //   ) : null
  // }, [
  //   additional_information,
  //   selected_options,
  //   selectedOptVariants,
  //   configurable_options,
  // ])

  // const mayRenderAdditionalInformation = () => {
  //   return size(additional_information) ? (
  //     <ProductFeatures
  //       features={additional_information}
  //       selected_options={selected_options}
  //       configurable_options={configurable_options}
  //       selectedOptVariants={selectedOptVariants}
  //     />
  //   ) : null
  // }

  return (
    <div>
      <div id="product-page">
        <div className="container">
          {false ? (
            <></>
          ) : (
            // <Breadcrumbs
            //   categoryId={getBreadcrumbCategoryId(categories)}
            //   currentProduct={name}
            // />
            ""
          )}

          <div className="pdp-delivery-block" style={{ display: "none" }}>
            <span>Please enter your city for an estimate delivery time</span>
            <span>Deliver to: </span>
          </div>

          <div className="pdp-main-content row">
            <div className="pdp-main-content-col pdp-image-gallery">
              <div className="pdp-image-zoom-gallery">
                <ClientWrapper>
                  <ProductImageGallery
                    name={name}
                    galleryData={productMediaGallery}
                    selectedImage={image}
                    key={selected_options ? selected_options.join() : 1}
                    locale={locale}
                  />
                </ClientWrapper>
                <div
                  id="pdp-image-portal"
                  style={{ position: "absolute", top: 0 }}></div>
              </div>
            </div>
            {
              // disPlayType !== DISPLAY_TYPE.LARGE
              false ? (
                <></>
              ) : (
                // <Breadcrumbs
                //   categoryId={getBreadcrumbCategoryId(categories)}
                //   currentProduct={name}
                // />
                ""
              )
            }
            <div className="pdp-main-content-col right-content-part">
              <h1 className="pdp-content-header">{name}</h1>
              <div className="share-option">
                <ProductShareWrapper
                  thumbnail={image.url}
                  title={name}
                  shareUrl={`${getBaseUrl()}/${productData.url_key}?sku=${sku}`}
                />
                {/* {renderWishlistIcon} */}
                <div
                  className="wishlist active"
                  // onClick={(e) => {
                  //   e.preventDefault()
                  //   onRemoveWishlistPress()
                  // }}
                >
                  <span></span>
                </div>
              </div>
              <div
                className="pdp-header-sub-content"
                style={{ display: "none" }}>
                <div className="pdp-hsc-block">
                  <Link href={"#"}>Explore Store</Link>
                </div>
                <div className="pdp-hsc-block">
                  <div className="rating-summary">
                    Ratings : {rating_summary}
                  </div>
                  <div className="rating-review">{review_count} Reviews</div>
                </div>
              </div>

              <ProductPriceBlock price={productPrice} />

              <div className="taxes-text">({t("pdp.incTextLabel")})</div>
              <form
              // ref={configRef}
              >
                {/* {configMessage ? (
                  <div className="config-message text-error">
                    {configMessage}
                  </div>
                ) : (
                  ""
                )} */}
                {/* {!!configurable_options ? (
                  <div className="pdp-content-extra-details">
                    <Controller
                      control={control}
                      name="selected_options"
                      render={({ field }) => {
                        return (
                          <ProductConfigurableOptions
                            data={configurable_options}
                            variants={variants}
                            {...field}
                            handleMedia={handleConfigMedia}
                            sizeChartPos={sizeChartPos}
                            size_chart={size_chart}
                            watch={watch}
                          />
                        )
                      }}
                    />
                  </div>
                ) : null} */}
                {/* <ProductConfigurableOptions
                            data={configurable_options}
                            variants={variants}
                            // {...field}
                            // handleMedia={handleConfigMedia}
                            sizeChartPos={sizeChartPos}
                            size_chart={size_chart}
                            // watch={watch}
                          /> */}
                {!!size(size_chart) && sizeChartPos === -1 ? (
                  <></>
                ) : (
                  // <SizeChart size_chart={size_chart} />
                  ""
                )}

                <div className="qty-wrapper row aic">
                  <div className="page-result row aic">
                    <span className="title">{t("pdp.quantityLabel")}</span>
                    <QuantityDropdown
                      // {...register("quantity")}
                      saleableQty={getSaleableQty(saleableQty).qty}
                    />
                  </div>
                </div>

                <div className="product-options-bottom row aic">
                  {productOutOfStock ? (
                    <button
                      className="add-to-cart notify-me"
                      type="button"
                      // onClick={(e) => {
                      //   e.preventDefault()
                      //   if (notifyMeLoading) {
                      //     return
                      //   }
                      //   notiFyMe()
                      // }}
                    >
                      {false
                        ? `${t("loading")}`
                        : // get(notifyConfig, "button_text") ||
                          t("pdp.notifyMe")}
                    </button>
                  ) : (
                    <>
                      <button
                        className="buy-now"
                        // onClick={(e) => {
                        //   e.preventDefault()
                        //   handleSubmit(onBuyNow)()
                        //   }}
                      >
                        {
                          // addingToCart && buyNowClicked &&
                          false ? `${t("loading")}` : `${t("pdp.buynow")}`
                        }
                      </button>
                      <button
                        className="add-to-cart"
                        type="submit"
                        // onClick={(e) => {
                        //   e.preventDefault()
                        //   handleSubmit(onSubmit)()
                        //   }}
                      >
                        {
                          // addingToCart && !buyNowClicked
                          false
                            ? `${t("loading")}`
                            : t("pdp.addToCart").toUpperCase()
                        }
                      </button>
                    </>
                  )}
                </div>
              </form>

              {/* {mayRenderWarrantyOrShipping} */}

              <div className="pickup-store" style={{ display: "none" }}>
                <a href="#">{t("pdp.pickUpStore")}</a>
              </div>
              <PromoBanner promoBanner={promotional_banner} />
              <ProductOffers cuponData={cuponData} />
              {is_returnable === "0" ? (
                <div
                  className="eligible-text eligible"
                  style={{ marginTop: "15px" }}>
                  {return_text}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* <ClientWrapper>
              <FrequentlyBoughtTogether products={fbt_products} />
          </ClientWrapper> */}
          <div className="pdp-description">
            {short_description.html ? (
              <>
                <h2>{t("pdp.shortDesc")}</h2>
                <CMSBlock
                  html={short_description.html
                    .toString()
                    .replace(/&lt;/g, "<")
                    .replace(/&gt;/g, ">")}
                />
              </>
            ) : null}
          </div>
          <div className="pdp-description">
            {description.html ? (
              <>
                <h2>{t("pdp.description")}</h2>
                <div dangerouslySetInnerHTML={{ __html: description.html }} />
                <CMSBlock
                  html={description.html
                    .toString()
                    .replace(/&lt;/g, "<")
                    .replace(/&gt;/g, ">")}
                />
              </>
            ) : null}
          </div>

          {/* {mayRenderAdditionalInformation} */}
          <ProductFeatures
            features={additional_information}
            selected_options={selected_options}
            configurable_options={configurable_options}
            selectedOptVariants={selectedOptVariants}
          />
        </div>
        {/* place for the recomended products */}
      </div>
      {
        // popupType === POPUP_TYPE.NOTIFY_ME
        false ? (
          <></>
        ) : (
          // <Portal className="notify-me-popup">
          //   <NotifyMePopup
          //     sku={
          //       selectedOptVariants && selectedOptVariants.length > 0
          //         ? get(selectedOptVariants, "0.product.sku", sku)
          //         : sku
          //     }
          //   />
          // </Portal>
          ""
        )
      }
    </div>
  )
}
