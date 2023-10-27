import { PriceString } from "../../../../../common/components/PriceBlock/PriceString"
// import { t } from "i18next"
import React from "react"
import { formatDiscount, formatPrice } from "@utils/app.utils.js"
import { getI18n } from "@locales/server"

const ProductPriceBlock = async ({ price }) => {
  
  const t = await getI18n()
  return (
    <div className="price-wrapper">
      <span className="price">
        <PriceString
          currency={price.final_price.currency}
          value={price.final_price.value}
        />
      </span>
      {price.final_price.value !== price.regular_price.value ? (
        <span className="pdp-price-discount-block">
          <PriceString
            currency={price.regular_price.currency}
            value={price.regular_price.value}
          />
        </span>
      ) : (
        ""
      )}
      {price.discount.amount_off > 0 ? (
        <div className="pdp-price-sub-block">
          {`${t("pdp.youSave")} `}
          <span className="pdp-price-sub-highlight">
            <PriceString
              currency={price.final_price.currency}
              value={price.discount.amount_off}
            />{" "}
            ({formatDiscount(price.discount.percent_off)}%)
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default ProductPriceBlock
