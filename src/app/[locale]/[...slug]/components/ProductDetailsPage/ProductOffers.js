// import { useQuery } from "@apollo/client";
import CMSBlock from "../../../../../common/components/CMSBlock"
// import { t } from "i18next"
import React from "react"

// import { get } from "react-hook-form";
import Skeleton from "react-loading-skeleton"
// import { useSelector } from "react-redux";
// import { getDisplayType } from "data/selectors/appState.selector";

import "./product-offers.scss"
// import { DISPLAY_TYPE } from "data/reducers/appState.reducer";
import { size } from "lodash"
import get from "lodash/get"
// import { GET_ALL_PROMOTIONS } from "./pdp.gql"
import { getI18n } from "@locales/server"
import { DISPLAY_TYPE } from "@utils/constant"

const ProductOffers = async ({ cuponData }) => {
  const t = await getI18n()
  // const displayType = useSelector(getDisplayType)
  const defaultCount = DISPLAY_TYPE.LARGE ? 2 : 0
  // const [offersFilter, setOffersFilter] = useState(defaultCount)
  // const [selectedOffers, setSelectedOffers] = useState(new Set([]))
  const offersFilter = 1
  const selectedOffers = []
  // const {
  //   data: couponData,
  //   loading: couponLoading,
  //   error: couponError,
  // } = useQuery(GET_ALL_PROMOTIONS, {
  //   variables: { sku: sku },
  //   context: { fetchOptions: { method: "GET" } },
  // })

  let couponList = get(cuponData, "getRulesBasedOnProductId", [])
  couponList = couponList.filter(
    (citem) =>
      size(citem.title) > 0 || size(get(citem, "short_description", "")) > 0
  )
  

  // const handleSeeAll = (count) => {
  //   setOffersFilter(count)
  // }
  //  handle offer description collapse and expand
  // const handleOfferHeaderClick = useCallback(
  //   (offerId) => () => {
  //     const newOffers = new Set(selectedOffers)
  //     if (selectedOffers.has(offerId)) {
  //       newOffers.delete(offerId)
  //     } else {
  //       newOffers.add(offerId)
  //     }
  //     setSelectedOffers(newOffers)
  //   },
  //   [selectedOffers, setSelectedOffers]
  // )
  return (
    <>
      {/* {couponLoading ? (
        <div className="offer-box">
          <Skeleton height="40px" borderRadius={0} />
          <Skeleton height="100px" borderRadius={0} />
        </div>
      ) : (
        ""
      )} */}
      {couponList.length > 0 ? (
        <div className="offer-box">
          <div
            className="clickable"
            // onClick={() => handleSeeAll(couponList.length)}
          >
            <div className={`box-text-content ${offersFilter ? "show" : ""}`}>
              <strong>{t("pdp.offers.saveExtra")}</strong> &nbsp;
              {t("pdp.offers.offersCount", { count: 1 })}
            </div>
          </div>
          <div className="toggle-data">
            {couponList
              .filter((citem, cindex) => cindex < offersFilter)
              .map((coupon, index) => (
                <React.Fragment key={index}>
                  <div
                    className="offer-header"
                    // onClick={handleOfferHeaderClick(index + 1)}
                  >
                    <strong>
                      {coupon.title ? `${get(coupon, "title")}:` : " "}
                    </strong>
                    {` ${get(coupon, "short_description", "")}`}
                  </div>
                  {size(get(coupon, "description", "")) > 0 ? (
                    <div
                      className={`collapse-content ${
                        selectedOffers.has(index + 1) ? "active" : ""
                      }`}>
                      <CMSBlock
                        html={
                          get(coupon, "description", "")
                            ? get(coupon, "description", "")
                                .toString()
                                .replace(/&lt;/g, "<")
                                .replace(/&gt;/g, ">")
                            : ""
                        }
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </React.Fragment>
              ))}
          </div>
          {couponList.length > 2 ? (
            <>
              {defaultCount !== offersFilter ? (
                <div
                  className="view-more"
                  // onClick={() => handleSeeAll(defaultCount)}
                >
                  <span>{t("pdp.offers.seeLess")}</span>
                </div>
              ) : (
                <div
                  className="view-more"
                  // onClick={() => handleSeeAll(couponList.length)}
                >
                  <span>{t("pdp.offers.seeAll")}</span>
                </div>
              )}
            </>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  )
}

export default ProductOffers
