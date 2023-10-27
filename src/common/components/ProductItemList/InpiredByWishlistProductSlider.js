
import * as React from "react";
import { t } from "i18next";

import get from "lodash/get";

import Slider from "react-slick";

import { GallerySlider } from "../BannerSlider/GallerySlider";
import { ProductListItem } from "../ProductListItem/ProductListItem";

import { getSeeAllLink } from "utils/utils";

// import "./product-slider.scss";
import { DISPLAY_TYPE } from "data/reducers/appState.reducer";
import { useSelector } from "react-redux";
import { getDisplayType } from "data/selectors/appState.selector";
import { reverse } from "lodash";
import { LinkWrapper } from "../LinkWrapper";
import useWishlist from "pages/WishlistPage/useWishlist";
import { useEffect } from "react";
const InpiredByWishlistProductSlider = ({
  blockContent,
  blockType,
  rating,
  config,
  beforeGallery,
  afterGallery,
  count = 5,
  type = "slider_view",
}) => {
  const { wishlist, getWishlist } = useWishlist();
  useEffect(() => {
    getWishlist();
  }, []);
  const sliderRef = React.useRef();
  const isRTL = window.isRTL;
  let products = [...wishlist];
  const sliderList = isRTL ? reverse(Array.from(products)) : products;
  const displayType = useSelector(getDisplayType);

  var settings = {
    dots: false,
    arrows: true,
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
  };
  let title = get(blockContent, "title", undefined);
  let background_image =
    blockContent.background_type === "bg_image"
      ? blockContent.background_image
      : "none";
  let background_color =
    blockContent.background_type === "bg_color"
      ? blockContent.background_color
      : "transparent";
  // set See All Button Link
  React.useEffect(() => {
    if (sliderRef.current && isRTL) {
      sliderRef.current.slickGoTo(sliderList.length - 1);
    }
  }, []);
  if (products.length === 0) return <></>;
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
        }}
      >
        <div className="container product-slider">
          <div className="row">
            {blockContent.show_title ? (
              <h3 className="slider-title">{title}</h3>
            ) : (
              ""
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
                }}
              >
                {t("common.seeAll")}
              </LinkWrapper>
            ) : (
              ""
            )}
          </div>
          {type === "grid_view" ? (
            <div className="product-grid">
              <div className="p-grid row">
                {sliderList.map(({ product: productItem }) => (
                  <div
                    className="product-grid-item col-sm-3"
                    key={productItem.uid}
                  >
                    <ProductListItem
                      product={productItem}
                      rating={rating}
                      config
                      key={productItem.uid}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Slider {...settings} ref={sliderRef}>
              {products.map(({ product: productItem }) => (
                <div className="product-slider-item" key={productItem.uid}>
                  <ProductListItem
                    product={productItem}
                    rating={rating}
                    config={config}
                    key={productItem.uid}
                  />
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
                }}
              >
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
  );
};

export default InpiredByWishlistProductSlider;
