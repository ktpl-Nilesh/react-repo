"use client"
import React, { useEffect, useRef } from "react"

import Slider from "react-slick"
import reverse from "lodash/reverse"
import Link from "next/link"

import { GallerySlider } from "./"
import PLACEHOLDER from "../../../../common/components/Image/PLACEHOLDER"
import ImageRenderer from "../../../../common/components/Image/image"

import { DISPLAY_TYPE } from "@utils/constant"
import { generateBannerLink, getSeeAllLink } from "@utils/app.utils"

import CMSBlock from "../../../../common/components/CMSBlock"

import LinkWrapper from "../LinkWrapper"

import "./simple-slider.scss"

const getClassName = (type) => {
  switch (type) {
    case "main_slider":
      return "main_slider_banner"
    case "top_categories":
      return "top_categories_slider"
    case "category_slider":
      return "category_slider"
    case "main_slider_with_margin":
      return "main_slider_with_margin"
    case "brand_slider":
      return "brand_slider"

    default:
      return "none"
  }
}
const getRedirectionLink = (type, item) => {
  switch (type) {
    case "main_slider":
    case "main_slider_with_margin":
      return item.redirection_link
        ? generateBannerLink(item.link_type, item.redirection_link)
        : ""
    case "top_categories":
      return `/${item.url_path}`
    case "category_slider":
      return `/${item.url_path}`
    case "brand_slider":
      return item?.url_key ? `/brand/${item.url_key}` : ""
    default:
      return item?.redirection_link ? `/${item.redirection_link}` : ""
  }
}

const SimpleImageSlider = ({
  variableWidth = false,
  blockId,
  blockType,
  count = 1,
  arrows = false,
  dots = false,
  sliderItems = [],
  autoPlay = false,
  infinite = false,
  title,
  description,
  beforeGallery,
  afterGallery,
  blockContent,
  mobileView,
  isNotSlider,
  sliderInitDelay = 15000,
}) => {
  
  const sliderRef = useRef(null)

  const isRTL = false
  const sliderList = isRTL ? reverse(Array.from(sliderItems)) : sliderItems
  const displayType = DISPLAY_TYPE.LARGE
  let medium_count = count
  let mobile_count = count
  if (blockType === "brand_slider") {
    mobile_count = 2
    medium_count = 3
  }
  const settings = {
    disabled: true,
    dots: dots,
    arrows: arrows,
    infinite: infinite,
    speed: 1200,
    autoplay: false, // initially false, after delay if autoPlay true then start slider
    slidesToShow: count,
    slidesToScroll: count,
    variableWidth: variableWidth,
    rtl: isRTL,
    centerMode: false,
    currentSlide: isRTL ? sliderItems.length - 1 : 0,
    centerPadding: "0",
    swipe: true,
    responsive: [
      {
        breakpoint: 1023,
        settings: isNotSlider
          ? "unslick"
          : {
              slidesToShow: medium_count,
              slidesToScroll: medium_count,
            },
      },
      {
        breakpoint: 767,
        settings: mobileView
          ? "unslick"
          : {
              slidesToShow: mobile_count,
              slidesToScroll: mobile_count,
            },
      },
      {
        breakpoint: 10000,
        settings: isNotSlider ? "unslick" : {},
      },
    ],
  }
  // if (isNotSlider) {
  //   settings = "unslick"
  // }
  let background_image =
    blockContent.background_type === "bg_image"
      ? blockContent.background_image
      : "none"
  let background_color =
    blockContent.background_type === "bg_color"
      ? blockContent.background_color
      : "transparent"
  let wrapperClass = ""

  let isContainer = false
  if (blockType === "category_slider") {
    wrapperClass = "category_slider"
    isContainer = true
  } else if (blockType === "top_categories") {
    background_color = "#F4F5F7"
    wrapperClass = "top_categories"
    isContainer = true
  } else if (blockType === "main_slider_with_margin") {
    wrapperClass = "main_slider_with_margin"
    isContainer = true
  } else if (blockType === "brand_slider") {
    wrapperClass = "category_slider brand_slider"
    isContainer = true
  }

  let timerId
  useEffect(() => {
    if (!autoPlay || !sliderRef?.current) return

    if (timerId) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => {
      sliderRef.current?.slickPlay()
    }, sliderInitDelay)
  }, [autoPlay, sliderRef, sliderInitDelay])

  const classNameBlockType = getClassName(blockType)

  return (
    <>
      {beforeGallery && beforeGallery.length > 0 ? (
        <div className={isContainer ? "container" : "no-container"}>
          <GallerySlider sliderItems={beforeGallery} arrows dots />
        </div>
      ) : null}

      <div
        className={`outer ${wrapperClass} ${
          background_color !== "transparent" || background_image !== "none"
            ? "has-background"
            : ""
        }`}
        style={{
          backgroundImage: `url(${background_image})`,
          backgroundColor: background_color,
        }}>
        <div className={isContainer ? "container" : "no-container"}>
          <div className="row aic jcsb">
            {title && (
              <h3 className="slider-title" style={{ width: "auto" }}>
                {title}
              </h3>
            )}
            {(blockContent.redirection_link || blockType == "brand_slider") &&
              displayType === DISPLAY_TYPE.LARGE && (
                <LinkWrapper
                  className="action primary"
                  href={getSeeAllLink(blockContent, blockType)}
                  blockType={blockType}
                  linkType={blockContent.link_type}
                  style={{
                    backgroundColor: blockContent.link_bg_color || "#213352",
                    color: blockContent.link_text_color || "#fff",
                  }}>
                  <>See All</>
                </LinkWrapper>
              )}
          </div>
          {description ? (
            <div className="description">
              <CMSBlock
                html={description
                  .toString()
                  .replace(/&lt;/g, "<")
                  .replace(/&gt;/g, ">")}
              />
            </div>
          ) : null}

          <Slider {...settings} ref={sliderRef} className="banner-slider">
            {sliderList.map((item, index) => {
              let slider_img = item.image
              if (displayType !== DISPLAY_TYPE.LARGE) {
                slider_img = item.mobile_image || item.image
              }
              if (blockType === "top_categories") {
                slider_img =
                  item.category_icon_desktop ||
                  item.category_icon_mobile ||
                  item.image ||
                  ""
                if (displayType !== DISPLAY_TYPE.LARGE) {
                  slider_img =
                    item.category_icon_mobile ||
                    item.category_icon_desktop ||
                    item.image
                  ;("")
                }
              }
              if (blockType === "category_slider") {
                slider_img =
                  item.desktop_category_image_thumbnail || item.image || ""
                if (displayType !== DISPLAY_TYPE.LARGE) {
                  slider_img =
                    item.mobile_category_image_thumbnail || item.image || ""
                }
              }

              return (
                <div className={classNameBlockType} key={index}>
                  <LinkWrapper
                    link={getRedirectionLink(blockType, item)}
                    blockType={blockType}
                    linkType={item.link_type}
                    title={item.title || item.name}
                    isDL={true}>
                    {/* <Image
                      alt={item.name}
                      src={slider_img}
                      width={640}
                      height={640 * (9 / 16)}
                    /> */}
                    <ImageRenderer
                      alt={item.name}
                      url={slider_img}
                      thumb={PLACEHOLDER}
                    />
                    {blockContent.show_category_sub_title && item.sub_title ? (
                      <div className="slider-content">
                        {item.sub_title || item.name}
                      </div>
                    ) : blockContent.show_category_label && item.name ? (
                      <div className="slider-content">
                        {item.name || item.sub_title}
                      </div>
                    ) : (
                      ""
                    )}
                    {blockType === "top_categories" ? (
                      <div className="slider-content">
                        {item.category_label_for_slider || item.name}
                      </div>
                    ) : null}
                    {blockType === "brand_slider" && item.value && (
                      <div className="slider-content">{item.value}</div>
                    )}
                  </LinkWrapper>
                </div>
              )
            })}
          </Slider>

          {(blockContent.redirection_link || blockType == "brand_slider") &&
          displayType !== DISPLAY_TYPE.LARGE ? (
            <div className="row m-see-all">
              <Link
                className="action"
                href={getSeeAllLink(blockContent, blockType)}
                style={{
                  backgroundColor: blockContent.link_bg_color || "#213352",
                  color: blockContent.link_text_color || "#fff",
                }}>
                See All
              </Link>
            </div>
          ) : null}
        </div>
      </div>

      {afterGallery && afterGallery.length > 0 ? (
        <div className={isContainer ? "container" : "no-container"}>
          <GallerySlider sliderItems={afterGallery} arrows dots />
        </div>
      ) : null}
    </>
  )
}

export default SimpleImageSlider
