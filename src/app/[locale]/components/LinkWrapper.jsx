"use client"

// import { dlOnBannerClick } from "data/dataLayer/dataLayerEvents";
import Link from "next/link"

const dlTypes = [
  "main_slider",
  "main_slider_with_margin",
  "right_slider_left_content",
  "left_slider_right_content",
  "category_slider",
  "gallery_slider",
]

export default function LinkWrapper({
  children,
  link,
  linkType,
  style = {},
  className = "",
  title,
  isDL,
  blockType,
}) {
  const bannerClick = () => {
    if (isDL && !!dlTypes.includes(blockType)) {
      // dlOnBannerClick({ bannerName: title || "" });
    }
  }
  if (link) {
    return (linkType === "custom_url" && link.includes("http")) ||
      (linkType === "static_link" && link.includes("http")) ? (
      <a
        href={link}
        target="_blank"
        className={className}
        style={style}
        onClick={bannerClick}
      >
        {children}
      </a>
    ) : (
      <Link
        href={link}
        className={className}
        style={style}
        onClick={bannerClick}
      >
        {children}
      </Link>
    )
  }
  return children
}
