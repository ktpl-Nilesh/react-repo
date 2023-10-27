"use client"
import React from "react"

import get from "lodash/get"
import size from "lodash/size"

import { Slider3DWithContent, SimpleImageSlider } from "./"
import { ConfiguratorLoading } from "../ConfiguratorLoading"
import { getSeeAllLink } from "@utils/app.utils"
import Clienti18nWrapper from "../Clienti18nWrapper"

/**
 * Render banner slider carousel based on sub type of the slider
 *
 * Parent:
 *      ConfiguratorBlocksItem
 */
export default function CarouselSlider({ blockData }) {
  const SliderContent = React.useMemo(() => {
    const content = get(blockData, "items", {})

    if (!content) {
      return <ConfiguratorLoading type="main_slider" />
    }

    let sliderItems = content.slider_banner_images

    if (!size(sliderItems)) {
      sliderItems = []
    }

    switch (content.slider_type) {
      case "main_slider":
        return (
          <SimpleImageSlider
            sliderItems={sliderItems}
            dots
            arrows
            autoPlay
            title={content.show_title ? content.title : undefined}
            blockId={blockData.block_id}
            blockType={content.slider_type}
            blockContent={content}
            infinite
          />
        )
      case "main_slider_with_margin":
        return (
          <SimpleImageSlider
            sliderItems={sliderItems}
            arrows
            dots
            autoPlay
            title={content.show_title ? content.title : undefined}
            description={
              content.short_description ? content.short_description : null
            }
            blockId={blockData.block_id}
            blockType={content.slider_type}
            blockContent={content}
            infinite
          />
        )
      case "right_slider_left_content":
      case "left_slider_right_content":
        return (
          <Clienti18nWrapper>
            <Slider3DWithContent
              sliderItems={sliderItems}
              arrows
              autoPlay
              title={content.show_title ? content.title : undefined}
              description={
                content.short_description ? content.short_description : null
              }
              blockType={content.slider_type}
              blockContent={content}
              infinite
              link={
                content.redirection_link &&
                getSeeAllLink(content, content.slider_type)
              }
            />
          </Clienti18nWrapper>
        )
      default:
        return (
          <SimpleImageSlider
            sliderItems={sliderItems}
            blockId={blockData.block_id}
            blockType={content.slider_type}
            blockContent={content}
            infinite
            dots
            autoPlay
          />
        )
    }
  }, [blockData])

  return <>{SliderContent}</>
}
