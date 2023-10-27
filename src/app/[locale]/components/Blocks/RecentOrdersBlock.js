import React from "react"
import get from "lodash/get"
import size from "lodash/size"
// import { Link } from "react-router-dom"
// import { t } from "i18next"
import { getI18n } from "@locales/server"

import classNames from "classnames"
// import { useOrders } from "components/Account/Orders/AllOrders/useOrders"
import {
  getOrderDetailsPath,
  getPlaceholderJpg,
  getTrackReturnLink,getProductPageLink
} from "@utils/app.utils"
import HTMLReactParser from "html-react-parser"
import Link from "next/link"

/**
 * Render Recent Order block on Homepage.
 *
 * Parent:
 *      RecentOrdersAndWishlist
 */

const RecentOrdersBlock = async({ recentOrder, containerWidthCls }) => {
  const { fetchThumbnailsBySku } = useOrders()
  const [productImage, setProductImage] = React.useState(null)
  const orderItem = get(recentOrder, "items.0", {})
  const itemCount = recentOrder.items ? recentOrder.items.length : 0
  const t = await getI18n()

  React.useEffect(() => {
    if (size(orderItem) > 0) {
      // fetch order thumbnails by sku
      fetchThumbnailsBySku([].concat.apply([], [orderItem.product_sku])).then(
        (imgList) => {
          setProductImage(get(imgList, "0.thumbnail_image", {}))
        }
      )
    }
  }, [orderItem])

  return (
    <div className={classNames("recently-prod-box", containerWidthCls)}>
      <h3>{t("home.yourRecentOrder")}</h3>
      <div className="recently-prod-inn">
        <div className="recen-thumbnail">
          <Link
            className="link"
            href={getProductPageLink(orderItem.product_url_key)}>
            <img
              src={productImage || getPlaceholderJpg()}
              alt="order item Image"
            />
          </Link>
        </div>
        <div className="recen-product-info">
          <div className="recen-product-info-inn">
            <div className="product-name">
              <Link
                className="link"
                href={getProductPageLink(orderItem.product_url_key)}>
                {HTMLReactParser(orderItem.product_name)}
              </Link>
              {itemCount > 1 ? (
                <span className="has-more">{`+ ${itemCount - 1} ${t(
                  "fbt.more"
                )}`}</span>
              ) : (
                ""
              )}
            </div>
            <div className="order-status-text">
              <span>{t("home.orderStatus")}:</span>{" "}
              <strong className="status-color">{recentOrder.status}</strong>
            </div>
            <div className="order-id-text">
              <span>{t("home.orderId")}:</span>{" "}
              <strong>{recentOrder.number}</strong>
            </div>
          </div>
          <div className="recen-action-bottom">
            <Link
              className="add-to-cart"
              href={getOrderDetailsPath(recentOrder.number)}>
              {t("home.viewDetails")}
            </Link>
            {/* <Link
              className="add-to-cart"
              to={getTrackReturnLink(recentOrder.number)}
            >
              {t("home.trackOrder")}
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecentOrdersBlock
