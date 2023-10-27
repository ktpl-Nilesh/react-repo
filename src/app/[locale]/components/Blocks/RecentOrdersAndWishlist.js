// 'use client'
import * as React from "react"
import get from "lodash/get"
import last from "lodash/last"
import size from "lodash/size"
// import { isBrowser } from "react-device-detect"
import { ProductsFromWishlist } from "./"
import { RecentOrdersBlock } from "./";
// import useWishlist from "pages/WishlistPage/useWishlist";
// import { useEffect } from "react"

const RecentOrdersAndWishlist = ({ blockData }) => {
  // const { wishlist, getWishlist } = useWishlist();
  // useEffect(() => {
  //   getWishlist();
  // }, []);
  const recentOrder = last(get(blockData, "items.orders.items", []))
  const wishlists = get(blockData, "items.recent_wishlists.0.items_v2", [])
  return (
    <div className="container">
      <div className="recently-action">
        {size(recentOrder) > 0 ? (
          <RecentOrdersBlock
            recentOrder={recentOrder}
            // containerWidthCls={
            //   wishlist.length > 0 && recentOrder && isBrowser ? "w_50" : ""
            // }
          />
        ) : null}
        {/* {wishlist.length > 0 ? (
          <ProductsFromWishlist
            wishlists={wishlists}
            containerWidthCls={
              wishlist.length > 0 && recentOrder && isBrowser ? "w_50" : ""
            }
          />
        ) : null} */}
      </div>
    </div>
  )
}
export default RecentOrdersAndWishlist
