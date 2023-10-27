"use client"
import * as React from "react"
import { useEffect, useRef, useState } from "react"
// import { t } from "i18next";
import get from "lodash/get"
import Slider from "react-slick"
import { GallerySlider } from "../../../app/[locale]/components/Sliders"
import { ProductListItem } from "../../../app/[locale]/components/ProductListItem"
import { getSeeAllLink } from "@utils/app.utils"

// import "./product-slider.scss";
import { DISPLAY_TYPE } from "@utils/constant"
// import { useSelector } from "react-redux";
// import { getDisplayType } from "data/selectors/appState.selector";
import { isNull, reverse } from "lodash"
import LinkWrapper from "../../../app/[locale]/components/LinkWrapper"
import CMSBlock from "../../../common/components/CMSBlock/cmsBlock"
import Clienti18nWrapper from "../../../app/[locale]/components/Clienti18nWrapper"

const SWIPER_DELAY_MS = 15000

const ProductSlider = ({
  blockContent,
  blockType,
  rating,
  config,
  beforeGallery,
  afterGallery,
  count = 5,
  type = "slider_view",
}) => {
  const swiperRef = useRef()
  const [swiped, setSwiped] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setSwiped(true)
      if (
        swiperRef.current &&
        swiperRef.current?.innerSlider &&
        swiperRef.current?.slickPlay
      ) {
        swiperRef.current?.slickPlay()
      }
    }, SWIPER_DELAY_MS)
  }, [swiperRef.current])

  const sliderRef = React.useRef()
  // const isRTL = window.isRTL;
  const isRTL = false
  let products =
    get(blockContent, "items") || get(blockContent, "products") || []
  products = products.filter((p) => !isNull(p))
  const sliderList = isRTL ? reverse(Array.from(products)) : products
  // const displayType = useSelector(getDisplayType);
  const displayType = DISPLAY_TYPE.LARGE
  var settings = {
    // dots: false,
    // arrows: true,
    infinite: false,
    speed: 1200,
    slidesToShow: count,
    slidesToScroll: count,
    // rtl: window.isRTL,
    currentSlide: 0,
    centerMode: false,
    centerPadding: "0",
    swipe: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
    autoplay: swiped ? true : swiped,
    dots: swiped ? false : swiped,
    arrows: swiped ? true : swiped,
    swiped,
    ref: (swiper) => {
      swiperRef.current = swiper
    },
  }
  let title = get(blockContent, "title", undefined)
  let background_image =
    blockContent.background_type === "bg_image"
      ? blockContent.background_image
      : "none"
  let background_color =
    blockContent.background_type === "bg_color"
      ? blockContent.background_color
      : "transparent"
  // set See All Button Link
  React.useEffect(() => {
    if (sliderRef.current && isRTL) {
      sliderRef.current.slickGoTo(sliderList.length - 1)
    }
  }, [])
  if (products.length === 0) return <></>
  return (
    <>
      {beforeGallery && beforeGallery.length > 0 ? (
        <div className="container">
          <GallerySlider sliderItems={beforeGallery} arrows dots />
        </div>
      ) : (
        ""
      )}
      <div
        className={`product-slider-bg ${
          background_color !== "transparent" || background_image !== "none"
            ? "has-background"
            : ""
        }`}
        style={{
          backgroundImage: `url(${background_image})`,
          backgroundColor: background_color,
        }}>
        <div className="container product-slider">
          <div className="row">
            {blockContent.show_title ? (
              <h3 className="slider-title">{title}</h3>
            ) : (
              <>
                {blockContent.short_description ? (
                  <div className="description">
                    <CMSBlock
                      html={blockContent.short_description
                        .toString()
                        .replace(/&lt;/g, "<")
                        .replace(/&gt;/g, ">")}
                    />
                  </div>
                ) : (
                  ""
                )}
              </>
            )}

            {blockContent.redirection_link &&
            displayType === DISPLAY_TYPE.LARGE ? (
              <LinkWrapper
                className="action primary"
                link={getSeeAllLink(blockContent)}
                blockType={blockType}
                linkType={blockContent.link_type}
                style={{
                  backgroundColor: blockContent.link_bg_color || "#213352",
                  color: blockContent.link_text_color || "#fff",
                }}>
                {t("common.seeAll")}
              </LinkWrapper>
            ) : (
              ""
            )}
          </div>
          {blockContent.show_title ? (
            <>
              {blockContent.short_description ? (
                <div className="description">
                  <CMSBlock
                    html={blockContent.short_description
                      .toString()
                      .replace(/&lt;/g, "<")
                      .replace(/&gt;/g, ">")}
                  />
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
          {type === "grid_view" ? (
            <div className="product-grid">
              <div className="p-grid row">
                {sliderList.map((productItem) => (
                  <div
                    className="product-grid-item col-sm-3"
                    key={productItem.uid}>
                    <Clienti18nWrapper>
                      <ProductListItem
                        product={productItem}
                        rating={rating}
                        config
                        key={productItem.uid}
                      />
                    </Clienti18nWrapper>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Slider {...settings} ref={sliderRef}>
              {products.map((productItem) => (
                <div className="product-slider-item" key={productItem.uid}>
                  <Clienti18nWrapper>
                    <ProductListItem
                      product={productItem}
                      rating={rating}
                      config={config}
                      key={productItem.uid}
                    />
                  </Clienti18nWrapper>
                </div>
              ))}
            </Slider>
          )}

          {blockContent.redirection_link &&
          displayType !== DISPLAY_TYPE.LARGE ? (
            <div className="row m-see-all">
              <LinkWrapper
                className="action"
                link={getSeeAllLink(blockContent)}
                blockType={blockType}
                linkType={blockContent.link_type}
                style={{
                  backgroundColor: blockContent.link_bg_color || "#213352",
                  color: blockContent.link_text_color || "#fff",
                }}>
                {t("common.seeAll")}
              </LinkWrapper>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      {afterGallery && afterGallery.length > 0 ? (
        <div className="container">
          <GallerySlider sliderItems={afterGallery} arrows dots />
        </div>
      ) : (
        ""
      )}
    </>
  )
}

export default ProductSlider
