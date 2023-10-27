"use client"
import React, { useCallback, useState } from "react"
import Link from "next/link"
import { getMegaMenuLink } from "@utils/app.utils"

const NavMenu = ({ navMenu }) => {
  let [defaultActive, setDefaultActive] = useState(true)
  const [activeL1, setActiveL1] = useState()

  const handleL1MouseOver = useCallback((uid) => {
    setActiveL1(uid)
  }, [])
  return (
    <nav className="navbar">
      <ul className="nav nav-list nav-list-evenly">
        {navMenu &&
          navMenu.map((categoryL1) => (
            <li
              className="nav-item"
              key={categoryL1.object_id}
              onMouseOver={() => handleL1MouseOver(categoryL1.object_id)}
            >
              {categoryL1.item_type === "link" ? (
                <a
                  className="level1"
                  href={getMegaMenuLink(
                    categoryL1.item_link,
                    categoryL1.item_type
                  )}
                  target="_blank"
                >
                  {categoryL1.item_name}
                </a>
              ) : (
                <Link
                  className="level1"
                  href={getMegaMenuLink(
                    categoryL1.item_link,
                    categoryL1.item_type
                  )}
                  id={categoryL1.object_id}
                >
                  {categoryL1.item_name}
                </Link>
              )}

              {categoryL1.childrens &&
                categoryL1.childrens.length > 0 &&
                activeL1 === categoryL1.object_id && (
                  <div className="mega-menu">
                    <div className="mega-menu-content row">
                      <div className="menu-left fancy-scroll">
                        <ul className="nav nav-list">
                          {categoryL1.childrens.map((categoryL2, l2Index) => (
                            <li
                              className={
                                "nav-item " +
                                (categoryL1.childrens.length > 0
                                  ? "has-children"
                                  : "no-child") +
                                (l2Index === 0 && defaultActive
                                  ? " default-active"
                                  : "")
                              }
                              onMouseEnter={() => {
                                if (l2Index > 0) {
                                  setDefaultActive(false)
                                }
                              }}
                              onMouseLeave={() => {
                                if (l2Index > 0) {
                                  setDefaultActive(true)
                                }
                              }}
                              key={categoryL2.object_id}
                            >
                              <Link
                                className="level2"
                                href={getMegaMenuLink(
                                  categoryL2.item_link,
                                  categoryL2.item_type
                                )}
                                id={categoryL2.object_id}
                              >
                                {categoryL2.item_name}
                              </Link>
                              {categoryL2.childrens &&
                                categoryL2.childrens.length > 0 && (
                                  <div className="menu-right">
                                    <ul className="nav nav-list">
                                      {categoryL2.childrens.map(
                                        (categoryL3) => (
                                          <li
                                            className="nav-item"
                                            key={categoryL3.object_id}
                                          >
                                            <Link
                                              className="level3"
                                              href={getMegaMenuLink(
                                                categoryL3.item_link,
                                                categoryL3.item_type
                                              )}
                                              id={categoryL3.object_id}
                                            >
                                              {categoryL3.item_name}
                                            </Link>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
            </li>
          ))}
      </ul>
    </nav>
  )
}

export default NavMenu
