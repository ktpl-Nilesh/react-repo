"use client"

import React from "react"

// import { RenderCMSBlock } from "@components/shared/cmsBlock/RenderCMSBlock"
import CMSBlock from "../../../../common/components/CMSBlock"
import Link from "next/link"
import ImageRenderer from "../../../../common/components/Image/image"
import PLACEHOLDER from "../../../../common/components/Image/PLACEHOLDER"
import dynamic from "next/dynamic"

const Carousel = dynamic(() => import("3d-react-carousal"))
import { generateBannerLink } from "@utils/app.utils"
import { makeStyles } from "@mui/styles"
import reverse from "lodash/reverse"
import { DISPLAY_TYPE } from "@utils/constant"
import {useI18n} from "@locales/client"
import "./slider-3d.scss"

const useStyles = makeStyles({
  "react-3d-carousel": {
    "& .slider-single.preactive .slider-single-content div::before": {
      background: (props) => props.backgroundPrev,
    },
    "& .slider-single.proactive .slider-single-content div::before": {
      background: (props) => props.backgroundNext,
    },
  },
})

const Slider3DWithContent = ({
  blockType = "",
  blockContent,
  sliderItems = [],
  title,
  description,
  link,
}) => {
  let sliderRef = React.useRef()
  let t = useI18n()
  let displayType = DISPLAY_TYPE.LARGE
  let background_image =
    blockContent.background_type === "bg_image"
      ? blockContent.background_image
      : "none"
  let background_color =
    blockContent.background_type === "bg_color"
      ? blockContent.background_color
      : "transparent"
  const classes = useStyles({
    backgroundPrev: `linear-gradient(-270deg, ${background_color} 2.26%, rgba(33, 51, 82, 0) 80.31%);`,
    backgroundNext: `linear-gradient(270deg, ${background_color} 2.26%, rgba(33, 51, 82, 0) 80.31%);`,
  })

  React.useEffect(() => {
    setTimeout(() => {
      if (sliderRef.current) {
        const domNode = sliderRef.current.getBoundingClientRect()
        const height =
          domNode.getElementsByClassName("slider-single")[0].offsetHeight
        domNode.getElementsByClassName("react-3d-carousel")[0].style.height =
          height + "px"
        // setTimeout(() => {
        //   if (window.isRTL) {
        //     domNode.querySelectorAll(".slider-left")[0].click();
        //   }
        // }, 1000);
        // setSlideInterval(
        //   setInterval(() => {
        //     if (window.isRTL) {
        //       domNode.querySelectorAll(".slider-left")[0].click();
        //     } else {
        //       domNode.querySelectorAll(".slider-right")[0].click();
        //     }
        //   }, 3000)
        // );
      }
    }, 1800)
  }, [])
  const callback = (index) => {
    const domNode = sliderRef.current.getBoundingClientRect()
    domNode.querySelectorAll(".slider-dots li").forEach((it, index) => {
      it.className = ""
    })

    domNode.querySelectorAll(`#dot-${index}`)[0].className = "slick-active"
  }

  // React.useEffect(() => {
  //   if (!slideInterval) {
  //     setTimeout(() => {
  //       const domNode = findDOMNode(sliderRef.current);
  //       setSlideInterval(
  //         setInterval(() => {
  //           if (window.isRTL) {
  //             domNode.querySelectorAll(".slider-left")[0].click();
  //           } else {
  //             domNode.querySelectorAll(".slider-right")[0].click();
  //           }
  //         }, 3000)
  //       );
  //     }, 3000);
  //   }
  // }, [slideInterval]);

  const changeCallback = (index) => {
    const domNode = sliderRef.current.getBoundingClientRect()
    domNode.querySelectorAll(".slider-dots li").forEach((it, index) => {
      it.className = ""
    })
    if (window.isRTL) {
      domNode.querySelectorAll(
        `#dot-${domNode.querySelectorAll(".slider-dots li").length - index - 1}`
      )[0].className = "slick-active"
    } else {
      domNode.querySelectorAll(`#dot-${index}`)[0].className = "slick-active"
    }
  }

  function dotClick(index) {
    // clearInterval(slideInterval);
    // setSlideInterval(null);
    const domNode = sliderRef.current.getBoundingClientRect()
    domNode.querySelectorAll(".slider-single").forEach((it, idx) => {
      // if (index === 0) {
      //   it.className = "slider-single active";
      //   domNode
      //     .querySelectorAll(".slider-single.active ~ div")
      //     .forEach((cit, cidx) => {
      //       cit.className = "slider-single proactive";
      //     });
      // }
      if (idx === index) {
        it.className = "slider-single active"
        domNode.querySelectorAll(".slider-single").forEach((cit, cidx) => {
          // if (window.isRTL) {
          //   if (cidx === index - 1) {
          //     cit.className = "slider-single proactive";
          //   } else if (cidx === index + 1) {
          //     cit.className = "slider-single preactive";
          //   } else if (index === slides.length - 1 && cidx === 0) {
          //     cit.className = "slider-single preactive";
          //   } else if (index === 0 && cidx === slides.length - 1) {
          //     cit.className = "slider-single proactive";
          //   }
          // } else {
          if (cidx === index - 1) {
            cit.className = "slider-single preactive"
          } else if (cidx === index + 1) {
            cit.className = "slider-single proactive"
          } else if (index === slides.length - 1 && cidx === 0) {
            cit.className = "slider-single proactive"
          } else if (index === 0 && cidx === slides.length - 1) {
            cit.className = "slider-single preactive"
          }
          // }
        })
      }
    })
    callback(index)
  }

  const getRedirectionLink = (type, item) => {
    switch (type) {
      case "right_slider_left_content":
      case "left_slider_right_content":
        return item.redirection_link
          ? generateBannerLink(item.link_type, item.redirection_link)
          : null
      default:
        return `/${item.redirection_link}`
    }
  }

  let defaultDots = false
  if (displayType && displayType !== DISPLAY_TYPE.LARGE) {
    defaultDots = true
  }

  let wrapperClass = ""
  if (blockType === "right_slider_left_content") {
    wrapperClass = "slider-3d right_slider_left_content"
  } else if (blockType === "left_slider_right_content") {
    wrapperClass = "slider-3d left_slider_right_content"
  }

  const slideObjList = window.isRTL
    ? reverse(Array.from(sliderItems))
    : sliderItems

  const slides = slideObjList.map((item, index) => {
    let slider_img = item.image
    if (displayType !== DISPLAY_TYPE.LARGE) {
      slider_img = item.mobile_image || item.image
    }
    return (
      <div key={index}>
        <Link
          href={getRedirectionLink(blockType, item)}
          linkType={item.link_type}
          blockType={blockType}
          title={item.title}
          isDL={true}>
          <ImageRenderer
            url={slider_img}
            thumb={PLACEHOLDER}
            // width={1837}
            // height={469}
            className={`lazyload-3d-banner`}
          />
        </Link>
      </div>
    )
  })

  return (
    <div
      className={`${wrapperClass} ${
        background_color !== "transparent" || background_image !== "none"
          ? "has-background"
          : ""
      }`}
      style={{
        backgroundImage: `url(${background_image})`,
        backgroundColor: background_color,
      }}>
      <div className="container">
        <div className="simple-with-title">
          <div className="section-1 fdc no-shrink">
            <>
              {title ? <h3 className="slider-title">{title}</h3> : ""}
              {description && (
                <CMSBlock
                  html={description
                    .toString()
                    .replace(/&lt;/g, "<")
                    .replace(/&gt;/g, ">")}
                />
              )}
              {link && (
                <Link
                  href={link}
                  className="slider_btn"
                  blockType={blockType}
                  linkType={blockContent.link_type}
                  style={{
                    backgroundColor: blockContent.link_bg_color || "#fe4a49",
                    color: blockContent.link_text_color || "#fff",
                  }}>
                  {t("common.exploreMore")}
                </Link>
              )}
            </>
          </div>
          <div
            className={`section-2 ${classes["react-3d-carousel"]}`}
            ref={sliderRef}>
            {process.browser && (
              <Carousel
                slides={slides}
                autoplay={false}
                interval={3000}
                dots={true}
                arrows={sliderItems.length > 1}
                onSlideChange={(idx) =>
                  changeCallback(
                    window.isRTL ? sliderItems.length - idx - 1 : idx
                  )
                }
              />
            )}
            <div className="slick-slider">
              {sliderItems.length > 1 ? (
                <div className="slider-dots">
                  <ul
                    className="slick-dots"
                    style={{ display: defaultDots ? "block" : "none" }}>
                    {Array.from(Array(slides.length).keys()).map(
                      (it, sindex) => {
                        return (
                          <li
                            className={`${sindex === 0 ? "slick-active" : ""}`}
                            id={`dot-${sindex}`}
                            key={sindex}
                            onClick={() => dotClick(sindex)}>
                            <button>{sindex}</button>
                          </li>
                        )
                      }
                    )}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slider3DWithContent
