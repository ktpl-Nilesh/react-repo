// @flow
import CMSBlock from "../../../../../common/components/CMSBlock"
import * as React from "react"
export const PromoBanner = ({ promoBanner }) => {
  return (
    <div className="pdp-promo-banner">
      <CMSBlock
        html={promoBanner.html
          .toString()
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")}
      />
    </div>
  )
}
