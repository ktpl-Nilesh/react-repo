import React from "react"
import {SimpleImageSlider} from "../Sliders"

import CategoryGrid from "@common/components/CategoryGrid"
import { DISPLAY_TYPE } from "@utils/constant"
import get from "lodash/get"
import size from "lodash/size"
// import reverse from "lodash/reverse"
import { getAfterBeforeGallery } from "@utils/app.utils"
// import i18next from "i18next"

/**
 * Render Categories slider and Category Grid block on Homepage and CLP.
 *
 * Parent:
 *      ConfiguratorBlocksItem
 */

export default function CategoriesSlider({ blockData, blockType }) {
  const displayType = DISPLAY_TYPE.LARGE
  const blockContent = get(blockData, "items", {})
  const { afterGallery, beforeGallery } = getAfterBeforeGallery(
    blockContent,
    displayType
  )
  let slider_type =
    displayType === DISPLAY_TYPE.LARGE
      ? blockContent.slider_view
      : blockContent.slider_view_mobile
  if (size(slider_type) === 0) {
    slider_type = "slider_view"
  }

  if (slider_type === "slider_view") {
    let sItems = get(blockContent, "categories", []) || []
    // if (i18next.resolvedLanguage === "ar") {
    //   sItems = reverse(Array.from(sItems))
    // }
    return (
      <SimpleImageSlider
        variableWidth
        sliderItems={sItems}
        arrows
        infinite
        count={1}
        title={blockContent.show_title ? blockContent.title : undefined}
        beforeGallery={beforeGallery}
        afterGallery={afterGallery}
        blockType={blockType}
        blockContent={blockContent}
        mobileView={displayType !== DISPLAY_TYPE.LARGE}
        isNotSlider={
          displayType == DISPLAY_TYPE.LARGE
            ? sItems.length < 6
            : displayType === DISPLAY_TYPE.MEDIUM
            ? sItems.length < 4
            : sItems.length < 3
        }
      />
    )
  } else if (slider_type === "grid_view") {
    return (
      <CategoryGrid
        content={blockContent}
        container
        beforeGallery={beforeGallery}
        afterGallery={afterGallery}
        blockType={blockType}
        blockContent={blockContent}
      />
      // <>this is from the grid view of the category slider</>
    )
  } else {
    return <></>
  }
}
