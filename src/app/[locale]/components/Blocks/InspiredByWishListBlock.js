import React from "react"  
import get from "lodash/get"
import  {ConfiguratorLoading}  from "../ConfiguratorLoading"
import { getAfterBeforeGallery } from "@utils/app.utils"
// import { useSelector } from "react-redux"
// import { getDisplayType } from "data/selectors/appState.selector"
// import { DISPLAY_TYPE } from "data/reducers/appState.reducer"
import {DISPLAY_TYPE} from "@utils/constant"
import {InpiredByWishlistProductSlider} from "./"

/**
 * Render Inspired by wishlist block on Homepage and CLP.
 *
 * Parent:
 *      ConfiguratorBlocksItem
 */

const InspiredByWishListBlock = ({ blockData, isCLP, blockType }) => {
  // const displayType = useSelector(getDisplayType)
  const displayType=DISPLAY_TYPE.LARGE
  const blockContent = isCLP
    ? get(blockData, "clp_block.content", null)
    : get(blockData, "items", null)

  if (!blockContent) {
    return <ConfiguratorLoading type="products" />
  }
  const { afterGallery, beforeGallery } = getAfterBeforeGallery(
    blockContent,
    displayType
  )
  return (
    <InpiredByWishlistProductSlider
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

export default InspiredByWishListBlock
