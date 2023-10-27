// "use client"
import React from "react"
import get from "lodash/get"
// import last from "lodash/last"
// import size from "lodash/size"
import { DISPLAY_TYPE } from "@utils/constant"
// import LazyLoad from "react-lazyload"

// import TopCategoriesSlider from "./blocks/TopCategoriesSlider"
import {
  CategoriesSlider,
  ProductSliderBlock,
  InspiredByWishListBlock,
  ProductRecommendationsBlock,
  TopCategoriesSlider,
  HomePageCMSBlock,
  RecentOrdersAndWishlist,
  BrandSliderBlock,
} from "./Blocks"
import { CarouselSlider } from "./Sliders"
// import { TopCategoriesSliderMobile } from "components/HomePage/DashBoardBlocks/TopCategoriesSliderMobile";

// import { ProductRecommendationsBlock } from "components/HomePage/DashBoardBlocks/ProductRecommendationsBlock";

// const RecentOrdersAndWishlist = loadable(
//   () => import("components/HomePage/RecentOrdersAndWishlist"),
//   {
//     resolveComponent: (components) => components.RecentOrdersAndWishlist,
//   }
// )

// const TopCategoriesSlider = loadable(
//   () => import("components/HomePage/DashBoardBlocks/TopCategoriesSlider"),
//   {
//     resolveComponent: (components) => components.TopCategoriesSlider,
//   }
// )

// const CategoriesSlider = loadable(
//   () => import("components/HomePage/DashBoardBlocks/CategoriesSlider"),
//   {
//     resolveComponent: (components) => components.CategoriesSlider,
//   }
// )

// const CMSBlock = loadable(
//   () => import("components/HomePage/DashBoardBlocks/CMSBlock"),
//   {
//     resolveComponent: (components) => components.CMSBlock,
//   }
// )

// const ProductSliderBlock = loadable(() =>
//   import("components/HomePage/DashBoardBlocks/ProductSliderBlock")
// )

// const BrandSliderBlock = loadable(
//   () => import("components/HomePage/DashBoardBlocks/BrandSliderBlock"),
//   {
//     resolveComponent: (components) => components.BrandSliderBlock,
//   }
// )

// const TopCategoriesSliderMobile = loadable(
//   () => import("components/HomePage/DashBoardBlocks/TopCategoriesSliderMobile"),
//   {
//     resolveComponent: (components) => components.TopCategoriesSliderMobile,
//   }
// )

// const InspiredByWishListBlock = loadable(
//   () => import("components/HomePage/DashBoardBlocks/InspiredByWishListBlock"),
//   {
//     resolveComponent: (components) => components.InspiredByWishListBlock,
//   }
// )

// const ProductRecommendationsBlock = loadable(
//   () =>
//     import("components/HomePage/DashBoardBlocks/ProductRecommendationsBlock"),
//   {import { LazyLoad } from 'react-lazyload';

//     resolveComponent: (components) => components.ProductRecommendationsBlock,
//   }
// )

/**
 * Render Single Homepage block based on block types.
 *
 * Parent:
 *      HomeSections
 *      CategoryLanding
 */

const ConfiguratorBlocksItem = ({ configBlock, senseiList }) => {
  const displayType = DISPLAY_TYPE.LARGE
  const isLoggedIn = false
  const blockType = get(configBlock, "block_type", "")

  if (blockType === "carousel_slider" || blockType === "banner_slider") {
    return (
      <div key={configBlock.block_id} className="carousel-slider">
        <CarouselSlider blockData={configBlock} blockType={blockType} />
      </div>
    )
  } else if (
    blockType === "top_categories" &&
    displayType === DISPLAY_TYPE.LARGE
  ) {
    return (
      <div key={configBlock.block_id}>
        <TopCategoriesSlider blockData={configBlock} blockType={blockType} />
      </div>
    )
  } else if (blockType === "category_slider") {
    return (
      <div key={configBlock.block_id}>
        <CategoriesSlider blockData={configBlock} blockType={blockType} />
      </div>
    )
  } else if (blockType === "brand_slider") {
    return (
      <div key={configBlock.block_id}>
        <BrandSliderBlock blockData={configBlock} blockType={blockType} />
      </div>
    )
  } else if (blockType === "cms_block") {
    return (
      <div key={configBlock.block_id}>
        <HomePageCMSBlock blockData={configBlock} blockType={blockType} />
      </div>
    )
  } else if (
    blockType === "product_slider" ||
    blockType === "based_on_search"
  ) {
    return (
      <div className={configBlock.block_id} key={configBlock.block_id}>
        <ProductSliderBlock blockData={configBlock} blockType={blockType} />
      </div>
    )
  } else if (blockType === "product_recommendations") {
    return (
      <div className={configBlock.block_id} key={configBlock.block_id}>
        <ProductRecommendationsBlock
          blockData={configBlock}
          senseiList={senseiList}
          blockType={blockType}
        />
      </div>
    )
  } else if (blockType === "recent_order") {
    const recentOrder = last(get(configBlock, "items.orders.items", []))
    const wishlists = last(
      get(configBlock, "items.wishlists.0.items_v2.items", [])
    )
    if ((!!size(recentOrder) || !!size(wishlists)) && isLoggedIn) {
      return (
        <div key={configBlock.block_id}>
          <RecentOrdersAndWishlist blockData={configBlock} />
        </div>
      )
    }
    return ""
  } else if (blockType === "product_slider") {
    // const wishlist = get(configBlock, "items.wishlists.0.items_v2", []);
    if (isLoggedIn) {
      return (
        <div key={configBlock.block_id}>
          <InspiredByWishListBlock
            blockData={configBlock}
            blockType={configBlock.block_type}
          />
        </div>
      )
    }
    return ""
  } else {
    return null
  }
}

export default function ConfiguratorBlocks({ blockList, senseiList }) {
  const displayType = DISPLAY_TYPE.LARGE
  // const topeCategoriesBlock = blockList.find(
  //   (bitem) => bitem.block_type === "top_categories"
  // )
  return (
    <>
      {/* {topeCategoriesBlock && displayType !== DISPLAY_TYPE.LARGE ? (
        <TopCategoriesSliderMobile blockData={topeCategoriesBlock} />
      ) : null} */}

      {blockList.map((configBlock, index) => (
        <div
          key={configBlock.block_id}
          data-block-id={configBlock?.block_id}
          data-block-type={configBlock?.block_type}>
          <ConfiguratorBlocksItem
            configBlock={configBlock}
            blockId={configBlock.block_id}
            index={index}
            blockList={blockList}
            senseiList={senseiList}
          />
        </div>
      ))}
    </>
  )
}
