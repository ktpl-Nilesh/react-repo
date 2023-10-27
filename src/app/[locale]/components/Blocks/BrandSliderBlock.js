import React from "react"

import SimpleImageSlider from "../Sliders/SimpleImageSlider"

import get from "lodash/get"

import { DISPLAY_TYPE } from "@utils/constant"
import { getI18n } from "@locales/server"

/**
 * Render Featured Brand list slider on Homepage and CLP.
 *
 * Parent:
 *      ConfiguratorBlocksItem
 */
export default async function BrandSliderBlock({ blockData, blockType }) {
  // const displayType = useSelector(getDisplayType)
  const displayType = DISPLAY_TYPE.LARGE
  const blockContent = get(blockData, "items", {})
  const brands = get(blockContent, "brands", [])

  const t = await getI18n()

  if (!brands || (brands && !brands.length)) {
    return ""
  }

  return (
    <SimpleImageSlider
      sliderItems={brands}
      arrows
      infinite
      count={6}
      title={
        blockContent.show_title
          ? blockContent.title
          : t("dashboard.shopByBrand")
      }
      blockType={blockType}
      blockContent={blockData}
      isNotSlider={
        displayType == DISPLAY_TYPE.LARGE
          ? brands.length < 6
          : displayType === DISPLAY_TYPE.MEDIUM
          ? brands.length < 4
          : brands.length < 3
      }
    />
  )
}
