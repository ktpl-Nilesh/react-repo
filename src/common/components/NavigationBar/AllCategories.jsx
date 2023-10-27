"use client"
import React, { useMemo, useState } from "react"

import Link from "next/link"
// import Clienti18nWrapper from "@app/[locale]/components/Clienti18nWrapper"
import { DISPLAY_TYPE } from "@utils/constant"
import { getCategoryPageLink } from "@utils/app.utils"
import CMSBlock from "../CMSBlock"

/**
 * Render menu part in navigation
 *
 * Parent
 *    NavBar
 */
const AllCategories = ({
  allCategories,
  showMobileMenu = false,
  setShowMobileMenu = () => {},
  isMobile = false,
  show,
}) => {
  // console.log("🚀 ~ file: AllCategories.jsx:23 ~ allCategories:", allCategories)
  let displayType = DISPLAY_TYPE.LARGE

  const [activeL1, setActiveL1] = useState(false)
  const [activeMenu, setAtctiveMenu] = useState(false)

  const handleL1MouseOver = (uid) => {
    setActiveL1(uid)
  }
  const handleMenuMouseOver = () => {
    setAtctiveMenu(true)
  }
  let toggleMobileMenu = (e) => {
    if (isMobile) {
      e.stopPropagation()
      setShowMobileMenu(!showMobileMenu)
    }
  }

  const renderExtraMenuItems = useMemo(() => {
    if (displayType !== DISPLAY_TYPE.LARGE || !activeMenu) return null

    return (
      <div className={`row all-cat-menu ${isMobile && show ? "show" : ""}`}>
        <ul className="nav nav-list">
          {allCategories
            .filter((cat) => cat.include_in_menu)
            .map((categoryL1) => (
              <li
                className={
                  "nav-item " +
                  (categoryL1.children.length > 0 ? "has-children" : "no-child")
                }
                key={categoryL1.uid}
                onMouseOver={() => handleL1MouseOver(categoryL1.uid)}>
                <Link
                  href={getCategoryPageLink(
                    categoryL1.url_path,
                    categoryL1.is_landing_page
                  )}>
                  {categoryL1.name}
                </Link>
                {categoryL1.children.length > 0 &&
                  activeL1 === categoryL1.uid && (
                    <div className="menu-level-2">
                      <ul className="nav nav-list">
                        {categoryL1.children
                          .filter((cat) => cat.include_in_menu)
                          .map((categoryL2) => (
                            <li
                              className={
                                "nav-item " +
                                (categoryL2.children.length > 0
                                  ? "has-children"
                                  : "no-child")
                              }
                              key={categoryL2.uid}>
                              <Link
                                href={getCategoryPageLink(
                                  categoryL2.url_path,
                                  categoryL2.is_landing_page
                                )}
                                id={categoryL2.id}>
                                {categoryL2.name}
                              </Link>
                              <span
                                className="toggle"
                                style={{ display: "none" }}></span>
                              {categoryL2.children.length > 0 && (
                                <div className="menu-level-3">
                                  <ul className="nav nav-list">
                                    {categoryL2.children
                                      .filter((cat) => cat.include_in_menu)
                                      .map((categoryL3) => (
                                        <li
                                          className="nav-item "
                                          key={categoryL3.uid}>
                                          <Link
                                            href={getCategoryPageLink(
                                              categoryL3.url_path,
                                              categoryL3.is_landing_page
                                            )}
                                            id={categoryL3.id}>
                                            <img
                                              src="/assets/dummydata/images/menu-dummy.jpg"
                                              style={{ display: "none" }}
                                              alt="all categories"
                                            />
                                            <span>{categoryL3.name}</span>
                                          </Link>

                                          {categoryL3.cms_block && (
                                            <div className="ct-banners">
                                              <CMSBlock
                                                html={categoryL3.cms_block.content
                                                  .toString()
                                                  .replace(/&lt;/g, "<")
                                                  .replace(/&gt;/g, ">")}
                                              />
                                            </div>
                                          )}
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              )}
                              {categoryL2.cms_block && (
                                <div className="ct-banners">
                                  <CMSBlock
                                    html={categoryL2.cms_block.content
                                      .toString()
                                      .replace(/&lt;/g, "<")
                                      .replace(/&gt;/g, ">")}
                                  />
                                </div>
                              )}
                            </li>
                          ))}
                      </ul>
                      {categoryL1.cms_block && (
                        <div className="ct-banners mobile">
                          <CMSBlock
                            html={categoryL1.cms_block.content
                              .toString()
                              .replace(/&lt;/g, "<")
                              .replace(/&gt;/g, ">")}
                          />
                        </div>
                      )}
                    </div>
                  )}
                {categoryL1.cms_block && (
                  <div className="ct-banners">
                    <CMSBlock
                      html={categoryL1.cms_block.content
                        .toString()
                        .replace(/&lt;/g, "<")
                        .replace(/&gt;/g, ">")}
                    />
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>
    )
  }, [displayType, activeMenu, allCategories, isMobile, activeL1])

  return (
    <div className="all-ctegories no-shrink">
      <div
        className="all-cat-title"
        onClick={toggleMobileMenu}
        onMouseOver={handleMenuMouseOver}>
        <span>All Categories</span>
      </div>
      {renderExtraMenuItems}
    </div>
  )
}

export default AllCategories
