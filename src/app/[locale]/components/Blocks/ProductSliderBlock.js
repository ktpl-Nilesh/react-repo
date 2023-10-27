import React, { memo } from "react"
// import { useSelector } from "react-redux"
import get from "lodash/get"

// import { getAfterBeforeGallery } from "./getAfterBeforeGallery";
// import { getDisplayType } from "data/selectors/appState.selector";
import ProductSlider from "../../../../common/components/ProductItemList/ProductSlider"
import { ConfiguratorLoading } from "../ConfiguratorLoading"
// import { DISPLAY_TYPE } from "data/reducers/appState.reducer";
import { getAfterBeforeGallery } from "@utils/app.utils"
import { DISPLAY_TYPE } from "@utils/constant"

/**
 * Render Product Slider block on Homepage and CLP.
 *
 * Parent:
 *      ConfiguratorBlocksItem
 */

const ProductSliderBlock = ({ blockData, blockType }) => {
  // const displayType = useSelector(getDisplayType);
  const displayType = DISPLAY_TYPE.LARGE

  const blockContent = get(blockData, "items", null)

  if (!blockContent) {
    return <ConfiguratorLoading type="products" />
  }

  const { afterGallery, beforeGallery } = getAfterBeforeGallery(
    blockContent,
    displayType
  )

  return (
    <ProductSlider
      beforeGallery={beforeGallery}
      afterGallery={afterGallery}
      blockType={blockType}
      blockContent={blockContent}
      type={
        displayType === DISPLAY_TYPE.LARGE
          ? blockContent.slider_view
          : blockContent.slider_view_mobile
      }
      rating
      config
    />
  )
}

export default memo(ProductSliderBlock)
