"use client"
import React from "react"
import ImageRenderer from "../../../../common/components/Image/image"
import Slider from "react-slick"
import { generateBannerLink } from "@utils/app.utils"
import "./simple-slider.scss"
import Image from "next/image"
import LinkWrapper from "../LinkWrapper"
import { DISPLAY_TYPE } from "@utils/constant"

const GallerySlider = ({
  count = 1,
  infinite = true,
  arrows = false,
  dots = false,
  sliderItems = [],
  autoPlay = true,
}) => {
  let displayType = Dis
  var settings = {
    count: count,
    dots: dots,
    arrows: arrows,
    infinite: infinite,
    speed: 700,
    autoplay: autoPlay,
    slidesToShow: count,
    slidesToScroll: count,
    rtl: window.isRTL,
  }
  let isContainer = false
  
  return (
    <div className="gallery-slider">
      <div className={isContainer ? "container" : "no-container"}>
        <Slider {...settings} className="banner-slider">
          {sliderItems.map((item, index) => {
            let slider_img = item.image
            if (displayType !== DISPLAY_TYPE.LARGE) {
              slider_img = item.mobile_image || item.image
            }
            return (
              <LinkWrapper
                link={generateBannerLink(item.link_type, item.redirection_link)}
                linkType={item.link_type}
                blockType={"gallery_slider"}
                isDL={true}
                key={index}>
                <ImageRenderer
                  url={slider_img}
                  alt="Slider Image"
                  className={`gallery-slider-banner`}
                />
              </LinkWrapper>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}

export default GallerySlider
