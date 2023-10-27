"use client"
import React, { useState, useRef, useEffect, memo } from "react"
import classnames from "classnames"
import Skeleton from "react-loading-skeleton"
import Image from "next/image"
import "./image.scss"

const ImageRenderer = ({
  className,
  url,
  alt = "Hnak",
  height = "100%",
  width = "100%",
  minHeight = "200px",

  https: style = {},
  shouldPreload = false,
  priority, // high, low, auto
  shouldLazyload = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(true)
  const imgRef = useRef()
  const srcRef = useRef()
  const [imageHeight, setImageHeight] = useState(0)
  const handleOnLoad = () => {
    setIsLoaded(true)
  }
  useEffect(() => {
    if (srcRef.current) {
      setImageHeight(srcRef.current.height)
    }
  }, [])

  return (
    <div
      className={`image-container-lazy ${className} ${
        isLoaded ? "isLoadedContainer" : ""
      }`}
      ref={imgRef}>
      <>
        {/* {shouldPreload ? <link rel="preload" as="image" href={url} /> : null} */}
        {/* <Image
          src={url}
          onLoad={handleOnLoad}
          alt={alt}
          {...(width === "100%" ? { fill: true } : { width, height })}
          ref={srcRef}
          className={classnames("image-lazy", {
            ["isLoaded"]: !!isLoaded,
          })}
          style={{ ...style, backgroundImage: `url(${url})` }}
          {...(shouldLazyload ? { loading: "lazy" } : {})}
          priority={true}
        /> */}
        <img
          className={classnames("image-lazy", {
            ["isLoaded"]: !!isLoaded,
          })}
          src={url}
          onLoad={handleOnLoad}
          alt={alt}
          height={height}
          width={width}
          ref={srcRef}
          {...(priority ? { fetchpriority: priority } : {})}
          style={{ ...style, backgroundImage: `url(${url})` }}
          // {...(shouldLazyload ? { loading: "lazy" } : {})}
        />
        <div
          className="img-loading"
          style={{ display: isLoaded ? "none" : "block" }}>
          <Skeleton
            width="100%"
            height={imageHeight ? imageHeight : minHeight}
            borderRadius={0}
          />
        </div>
      </>
    </div>
  )
}

export default memo(ImageRenderer)
