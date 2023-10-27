"use client"
import React, { useEffect, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
import { getCategoryPageLink } from "@utils/app.utils";

import "./category-left-menu.scss";
import Link from "next/link";

const CategoryNavMenu = ({ navMenu, activeKey, curr_uid, type }) => {
  let [showLevels, setShowLevels] = useState([]);
  useEffect(() => {
    if (activeKey !== null) {
      setShowLevels([activeKey]);
    }
  }, [activeKey]);
  const handleShowLevel = (uid) => {
    if (showLevels.includes(uid)) {
      let uidIndex = showLevels.findIndex((e) => {
        return e === uid;
      });
      let levels = [...showLevels];
      levels.splice(uidIndex, 1);
      setShowLevels([...levels]);
    } else {
      setShowLevels([...showLevels, uid]);
    }
  };

  return (
    <nav className="cat-navbar">
      <ul className="cat-nav cat-nav-list">
        {type === "category"
          ? navMenu.map((categoryL1, index1) => (
              <li
                className={`nav-item ${
                  categoryL1.uid === curr_uid ? "active" : ""
                }`}
                key={categoryL1.uid}
              >
                <Link
                  className={`level1 ${
                    categoryL1.uid === curr_uid ? "active" : ""
                  }`}
                  href={getCategoryPageLink(
                    categoryL1.url_path,
                    categoryL1.is_landing_page
                  )}
                  id={categoryL1.id}
                >
                  {categoryL1.name}
                </Link>
                {categoryL1.children.length > 0 && (
                  <div className="sub-menu">
                    <div className="sub-menu-content">
                      <div className="menu-1">
                        <ul className="nav cat-nav-list">
                          {categoryL1.children.map((categoryL2) => (
                            <li
                              className={
                                "nav-item " +
                                (categoryL2.children.length > 0
                                  ? "has-children"
                                  : "no-child") +
                                (categoryL2.uid === curr_uid ? " active" : "")
                              }
                              key={categoryL2.uid}
                            >
                              {categoryL2.children.length > 0 ? (
                                <span
                                  className={`toggle-level ${
                                    showLevels.includes(categoryL2.uid)
                                      ? "down"
                                      : "up"
                                  }`}
                                  onClick={() =>
                                    handleShowLevel(categoryL2.uid)
                                  }
                                >
                                  +
                                </span>
                              ) : (
                                ""
                              )}

                              <Link
                                className={`level2 ${
                                  categoryL2.uid === curr_uid ? "active" : ""
                                }`}
                                href={getCategoryPageLink(
                                  categoryL2.url_path,
                                  categoryL2.is_landing_page
                                )}
                                id={categoryL2.id}
                              >
                                {categoryL2.name}
                              </Link>

                              {categoryL2.children.length > 0 && (
                                <div
                                  className={`menu-2 ${
                                    showLevels.includes(categoryL2.uid)
                                      ? "show"
                                      : ""
                                  }`}
                                >
                                  <ul className="nav cat-nav-list">
                                    {categoryL2.children.map((categoryL3) => (
                                      <li
                                        className={`nav-item ${
                                          categoryL3.uid === curr_uid
                                            ? "active"
                                            : ""
                                        }`}
                                        key={categoryL3.uid}
                                      >
                                        <Link
                                          className={`level3 ${
                                            categoryL3.uid === curr_uid
                                              ? "active"
                                              : ""
                                          }`}
                                          href={getCategoryPageLink(
                                            categoryL3.url_path,
                                            categoryL3.is_landing_page
                                          )}
                                          id={categoryL3.id}
                                        >
                                          {categoryL3.name}
                                        </Link>
                                      </li>
                                    ))}
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
            ))
          : ""}
        {type === "brand" ? (
          <li className={`nav-item active`}>
            <Link className="active" href={`/brand/${navMenu.url_key}`}>
              {navMenu.value}
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    </nav>
  );
};

export default CategoryNavMenu;
