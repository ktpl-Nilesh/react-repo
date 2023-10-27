import React from "react";
// import { useQuery } from "@apollo/client";
// import { useLocation, Link, useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { useDispatch, useSelector } from "react-redux";
import filter from "lodash/filter";
import find from "lodash/find";
import get from "lodash/get";
import size from "lodash/size";
import { getI18n } from "@locales/server"

import { PriceString } from "../PriceBlock";

// import useWishlist from "pages/WishlistPage/useWishlist";
// import useCart from "pages/CartPage/useCart";
import { getAuthPath, getWishlistPath,getPriceDetails ,getProductPageLink,getSaleableQty,getSelectedOptions} from "@utils/app.utils";
import Link from "next/link";
// import { getWishlistId } from "data/selectors/appState.selector";
// import { getIsUserLoggedIn } from "data/selectors/users.selectors";
// import { getWishlistDetails } from "data/selectors/cart.selector";
// import { WISHLIST_FETCH } from "pages/WishlistPage/wishlist.gql";
// import { setWishlistDetails } from "data/reducers/cart.reducer";
// import { setWishlistId } from "data/reducers/appState.reducer";
// import { isOutOfStock } from "utils/findMatchingProductVariant";
// import { addNotification } from "data/reducers/notification.reducer";
// import { NOTIFICATION_TYPE } from "components/common/Notification/notificationType";
// import { POPUP_TYPE, setPopupType } from "data/reducers/storeConfig.reducer";
import "./wishlist.scss";

const WishList = async() => {
  // const isLoggedIn = useSelector(getIsUserLoggedIn);
  const isLoggedIn=true;
  // const location = useLocation();
  const t = await getI18n()

  // const { removingFromWishlist, handleRemoveFromWishlist } = useWishlist();

  // const { handleAddToCart, addingToCart } = useCart();
  // const dispatch = useDispatch();
  // const { t } = useTranslation();

  // const { loading } = useQuery(WISHLIST_FETCH, {
  //   fetchPolicy: "cache-first",
  //   skip: !isLoggedIn,
  //   onCompleted: (res) => {
  //     const newList = get(res, "customer.wishlists.0.items_v2.items", []);
  //     dispatch(setWishlistDetails(newList));
  //     const wishlistId = get(res, "customer.wishlists.0.id", null);
  //     if (wishlistId) dispatch(setWishlistId(wishlistId));
  //   },
  //   onError: (err) => {
  //     dispatch(
  //       addNotification({
  //         type: NOTIFICATION_TYPE.ERROR,
  //         title: t("wishlist.title"),
  //         text: err.message,
  //       })
  //     );
  //   },
  // });

  // const wishListId = useSelector(getWishlistId);
  // const wishlist = useSelector(getWishlistDetails);

  // const itemCount = size(wishlist);
  const itemCount= 3

  // const renderWishlistItems = useMemo(() => {
  //   if (size(wishlist) === 0) return null;
  //   return wishlist.map((item) => {
  //     const name = get(item, "product.name", "");
  //     let priceDetails = getPriceDetails(get(item, "product.price_range", {}));
  //     let selectedVariant = get(item, "product.variants", []);
  //     const conf_opts = get(item, "configurable_options", []);
  //     const parentStockStatus = get(item, "product.stock_status");
  //     const parentOutOfStock = parentStockStatus === "OUT_OF_STOCK";

  //     // get all variants of already selected options and will not change
  //     for (let sOptInd = 0; sOptInd < conf_opts.length; sOptInd++) {
  //       const currOpt = conf_opts[sOptInd];
  //       selectedVariant = filter(selectedVariant, (v) => {
  //         return find(v.attributes, [
  //           "uid",
  //           currOpt?.configurable_product_option_value_uid,
  //         ]);
  //       });
  //     }
  //     const isConfigurableWishlistItem =
  //       get(item, "__typename", "") === "ConfigurableWishlistItem";
  //     let saleableQty = get(item, "product.product_saleable_qty", null);
  //     let productImage = get(item, "product.small_image.url", "");
  //     let selected_options = {};

  //     if (isConfigurableWishlistItem) {
  //       selected_options = getSelectedOptions(
  //         get(item, "configurable_options", {}),
  //         get(item, "product.configurable_options", {})
  //       );
  //       if (!!size(selectedVariant)) {
  //         saleableQty = get(
  //           selectedVariant,
  //           "0.product.product_saleable_qty",
  //           null
  //         );
  //         productImage = get(selectedVariant, "0.product.small_image.url", "");
  //         priceDetails = getPriceDetails(
  //           get(selectedVariant, "0.product.price_range", {})
  //         );
  //       }
  //     }

  //     const _isOutOfStock =
  //       isOutOfStock(item) ||
  //       getSaleableQty(saleableQty).disabled ||
  //       parentOutOfStock;

  //     return (
  //       <li className="jcsb aic" key={item.id}>
  //         <div className="left-part aic">
  //           <div className="ProductImage no-shrink">
  //             <img src={productImage} alt={name} height="100" width="94" />
  //           </div>
  //           <div className="ProductDetail">
  //             <Link to={getProductPageLink(get(item, "product.url_key", ""))}>
  //               <h3>{name}</h3>
  //             </Link>

  //             <div className="SpecialPrice fdc">
  //               <span className="normal">
  //                 <PriceString
  //                   currency={priceDetails.currency}
  //                   value={priceDetails.finalPrice}
  //                 />
  //               </span>
  //               {priceDetails.isSpecial ? (
  //                 <span className="special">
  //                   <PriceString
  //                     currency={priceDetails.currency}
  //                     value={priceDetails.price}
  //                   />
  //                 </span>
  //               ) : null}
  //             </div>
  //           </div>
  //         </div>
  //         <div className="ProductAction no-shrink fdc">
  //           {_isOutOfStock ? (
  //             <div className="AddtoCart common-btn">
  //               <div className="remove out-of-stock">
  //                 {t("wishlist.outOfStock")}
  //               </div>
  //             </div>
  //           ) : (
  //             <div
  //               className="AddtoCart common-btn"
  //               onClick={() => {
  //                 if (_isOutOfStock) return;
  //                 if (addingToCart) return;
  //                 const addToCartReq = {
  //                   sku: item && item.product && item.product.sku,
  //                   quantity: item.quantity,
  //                   url_key: getProductPageLink(
  //                     get(item, "product.url_key", "")
  //                   ),
  //                 };
  //                 // if product is configured then add selected option
  //                 if (isConfigurableWishlistItem) {
  //                   addToCartReq.selected_options = selected_options.map(
  //                     (opt) => opt.configurable_product_option_value_uid
  //                   );
  //                 }
  //                 addToCartReq.onSuccess = () => {
  //                   // remove product from the wishlist
  //                   handleRemoveFromWishlist(wishListId, [item.id]);
  //                 };
  //                 // add to cart graphql call
  //                 handleAddToCart(addToCartReq);
  //               }}
  //             >
  //               <a className="action primary" href="#">
  //                 {addingToCart
  //                   ? t("loading")
  //                   : t("pdp.addToCart").toUpperCase()}
  //               </a>
  //             </div>
  //           )}
  //           <div className="AddView common-btn">
  //             <Link to={getProductPageLink(get(item, "product.url_key", ""))}>
  //               {t("wishlist.viewProduct")}
  //             </Link>
  //           </div>
  //           <div
  //             className="remove"
  //             style={{ cursor: "pointer" }}
  //             onClick={() => {
  //               if (removingFromWishlist) return;
  //               handleRemoveFromWishlist(wishListId, [item.id]);
  //             }}
  //           >
  //             {removingFromWishlist == item.id ? t("loading") : t("remove")}
  //           </div>
  //         </div>
  //       </li>
  //     );
  //   });
  // }, [wishlist, removingFromWishlist, addingToCart]);

  // if user is logged in on then give path of wishlist else get path for login

  return (
    <div className="Wishlist">
      <Link
        href={getWishlistPath()}
        // state={{ from: location }}
        className="Wishlist-icon"
        // onClick={(e) => {
        //   if (!isLoggedIn) {
        //     e.preventDefault();
        //     dispatch(setPopupType(POPUP_TYPE.AUTH_MODAL));
        //     dispatch(
        //       addNotification({
        //         type: NOTIFICATION_TYPE.WARNING,
        //         title: t("wishlist.title"),
        //         text: t("wishlist.loginRequired"),
        //       })
        //     );
        //   }
        // }}
      >
        <span>Wishlist Icon</span>
        {isLoggedIn && itemCount ? (
          <div className="added-number">{itemCount}</div>
        ) : null}
      </Link>
      <div className="wishlist-popup common-popup">
        <div className="popup-content">
          <div className="top-title fdc">
            <h3>{t("wishlist.title")}</h3>
            <div className="ItemInCart">
              {t("wishlist.itemCountText", { itemCount })}
            </div>
          </div>
          {/* <ul className="product-lists">{renderWishlistItems}</ul> */}
        </div>
      </div>
    </div>
  );
};

export default WishList;
