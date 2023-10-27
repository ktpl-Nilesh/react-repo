"use client"

import React, { useCallback } from "react"
import ImageGallery from "react-image-gallery"
import ReactImageMagnify from "react-image-magnify"
// import ReactPlayer from "react-player/lazy"
import Loader from "../../../../../common/components/Loader"

import "./ProductImageGallery.scss"

const ProductImageGallery = ({ galleryData, selectedImage, name, locale }) => {
  const [isLoaded, setIsLoaded] = React.useState(false)

  const startIndex = galleryData.findIndex(
    (item) => item.url === selectedImage.url
  )
  let images = galleryData
    .sort(function (a, b) {
      return a["position"] - b["position"]
    })
    .filter((fitem) => !fitem.disabled)
    .map((galleryItem) => ({
      original: galleryItem.url,
      thumbnail: galleryItem.url,
      video_content: galleryItem.video_content,
      originalAlt: name,
      thumbnailAlt: name,
      originalWidth: "100%",
      originalHeight: "100%",
      thumbnailHeight: "92",
      thumbnailWidth: "90",
    }))
  const showNavButtons = images.length > 4
  const renderItem = useCallback(
    ({ original, thumbnail, video_content }) => {
      if (video_content) {
        return (
          <div className="player-wrapper">
            {/* <ReactPlayer
              className="react-player"
              url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
              controls
              width="100%"
              height="400px"
              // height="100%"
            /> */}
          </div>
        )
      } else {
        return (
          <>
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: name,
                  isFluidWidth: true,
                  src: thumbnail,
                  onLoad: function () {
                    setIsLoaded(true)
                  },
                },
                largeImage: {
                  alt: name,
                  src: original,
                  width: 1000,
                  height: 1250,
                  
                },
                enlargedImagePortalId: "pdp-image-portal",
                isEnlargedImagePortalEnabledForTouch: true,
              }}
            />
          </>
        )
      }
    },
    [galleryData, isLoaded]
  )

  return (
    <div style={{ position: "relative" }}>
      {/* {!isLoaded ? <Loader position="absolute" /> : ""} */}
      <ImageGallery
        items={images}
        startIndex={startIndex !== -1 ? startIndex : 0}
        thumbnailPosition="left"
        showPlayButton={false}
        showFullscreenButton={false}
        renderItem={renderItem}
        showBullets={true}
        render
        isRTL={locale === "en-sa" ? false : true}
        renderLeftNav={(onClick, disabled) => {
          if (showNavButtons) {
            return (
              <div className="image-gallery-custom-left-icon" onClick={onClick}>
                {" "}
                Up{" "}
              </div>
            )
          }
          return null
        }}
        renderRightNav={(onClick, disabled) => {
          if (showNavButtons) {
            return (
              <div
                className="image-gallery-custom-right-icon"
                onClick={onClick}>
                {" "}
                Down{" "}
              </div>
            )
          }
          return null
        }}
      />
    </div>
  )
}

export default ProductImageGallery
