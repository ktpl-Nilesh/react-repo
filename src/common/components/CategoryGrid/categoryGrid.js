import React from "react"

import get from "lodash/get"

import { GallerySlider } from "../../../app/[locale]/components/Sliders"
import ImageRenderer from "../Image/image"
import { PLACEHOLDER } from "@utils/constant"
import LinkWrapper from "../../../app/[locale]/components/LinkWrapper"
import { DISPLAY_TYPE } from "@utils/constant"

import { getSeeAllLink } from "@utils/app.utils"
import { t } from "next-international"
import "./category-grid.scss"

const CategoryGrid = ({
  content,
  container,
  beforeGallery,
  afterGallery,
  blockType,
}) => {
  let displayType = DISPLAY_TYPE.LARGE
  let background_image =
    content.background_type === "bg_image" ? content.background_image : "none"
  let background_color =
    content.background_type === "bg_color"
      ? content.background_color
      : "transparent"
  let gridItems = get(content, "categories", []) || []
  return (
    <>
      {beforeGallery && beforeGallery.length > 0 ? (
        <div className="container">
          <GallerySlider sliderItems={beforeGallery} arrows dots />
        </div>
      ) : (
        ""
      )}

      {gridItems ? (
        <div
          className={`category-grid ${
            background_color !== "transparent" || background_image !== "none"
              ? "has-background"
              : ""
          }`}
          style={{
            background: background_color,
            backgroundImage: `url(${background_image})`,
          }}>
          <div className={`${container ? "container" : "co-container"}`}>
            <div className="row aic jcsb">
              {content.show_title ? (
                <h3 className="grid-title">{content.title}</h3>
              ) : (
                ""
              )}
              {content.redirection_link &&
              displayType === DISPLAY_TYPE.LARGE ? (
                <LinkWrapper
                  className="action primary"
                  href={getSeeAllLink(content, blockType)}
                  blockType={blockType}
                  linkType={content.link_type}
                  style={{
                    backgroundColor: content.link_bg_color || "#213352",
                    color: content.link_text_color || "#fff",
                  }}>
                  See All
                </LinkWrapper>
              ) : null}
            </div>
            <div className={`row category-flex grid-item-${gridItems.length}`}>
              {gridItems.map((gridItem, index) => {
                let grid_img =
                  gridItem.desktop_category_image_thumbnail ||
                  gridItem.image ||
                  ""
                if (displayType !== DISPLAY_TYPE.LARGE) {
                  grid_img =
                    gridItem.mobile_category_image_thumbnail ||
                    gridItem.image ||
                    ""
                }
                return (
                  <div className="grid-item" key={index}>
                    <LinkWrapper
                      link={`/${gridItem.url_path}`}
                      blockType={blockType}
                      title={gridItem.name}
                      isDL={true}>
                      <ImageRenderer
                        url={grid_img}
                        thumb={PLACEHOLDER}
                        alt={gridItem.name}
                        className={`lazy-category-grid`}
                      />
                      {content.show_child_category_label && gridItem.name ? (
                        <div className="category-name">
                          {gridItem.category_label_for_slider || gridItem.name}
                        </div>
                      ) : (
                        ""
                      )}
                      {/* <div className="image">
                        <img src={grid_img} />
                      </div>
                      {content.show_child_category_label && gridItem.name ? (
                        <div className="category-name">{gridItem.name}</div>
                      ) : (
                        ""
                      )} */}
                    </LinkWrapper>
                  </div>
                )
              })}
            </div>

            {content.redirection_link && displayType !== DISPLAY_TYPE.LARGE ? (
              <div className="row m-see-all">
                <LinkWrapper
                  className="action"
                  link={getSeeAllLink(content, blockType)}
                  blockType={blockType}
                  linkType={content.link_type}
                  style={{
                    backgroundColor: content.link_bg_color || "#213352",
                    color: content.link_text_color || "#fff",
                  }}>
                  {/* {t("common.seeAll")} */}
                  See All
                </LinkWrapper>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <></>
      )}

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
export default CategoryGrid
