import React from "react"
import get from "lodash/get"
// import { Link } from "react-router-dom"
import { getCategoryPageLink } from "@utils/app.utils"
import { reverse } from "lodash"
import { getI18n } from "@locales/server"
import Link from "next/link"


/**
 * Render Top Categories Slider block for mobile view on Homepage and CLP.
 *
 * Parent:
 *      ConfiguratorBlocks
 */

const TopCategoriesSliderMobile = ({ blockData }) => {
  let catList = get(blockData, "items.categories", []) || []
  // if (i18next.resolvedLanguage === "ar") {
  //   catList = reverse(Array.from(catList))
  // }
  return (
    <div className="top-categories mobile row">
      {catList.map((mcategory) => {
        const imgSrc = mcategory.category_icon_mobile || mcategory.image || ""
        return (
          <Link
            href={getCategoryPageLink(
              mcategory.url_path,
              mcategory.is_landing_page
            )}
            key={mcategory.id}
            id={mcategory.id}>
            <div className="cat-item">
              <img
                src={imgSrc}
                alt={mcategory.name}
                height="100%"
                width="100%"
              />
              <h3 className="text-center">{mcategory.name}</h3>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default TopCategoriesSliderMobile
