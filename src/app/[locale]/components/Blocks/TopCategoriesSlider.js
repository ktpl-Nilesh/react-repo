import React from "react"
import {SimpleImageSlider }from "../Sliders"
import get from "lodash/get"

/**
 * Render Top Categories Slider block on Homepage and CLP.
 *
 * Parent:
 *      ConfiguratorBlocksItem
 */

export default function TopCategoriesSlider({ blockData, blockType }) {
  return (
    <SimpleImageSlider
      variableWidth
      sliderItems={get(blockData, "items.categories", []) || []}
      arrows
      infinite
      count={1}
      // title={t("title.topCategories")}
      title={"Top Categories"}
      blockType={blockType}
      blockContent={get(blockData, "items", {})}
    />
  )
}
