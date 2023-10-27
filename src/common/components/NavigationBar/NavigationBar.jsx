import React from "react"

import Skeleton from "react-loading-skeleton"
import get from "lodash/get"

import NavMenu from "./NavMenu"
import AllCategories from "./AllCategories"

import { GET_NAVIGATION, GET_ALL_CATEGORY } from "../Header/header.gql"

import "./navbar.scss"
import { getStoreHeaderValue } from "@utils/data.utils"
import { getCurrentLocale } from "@locales/server"
import { getBaseUrl } from "@utils/app.utils"

async function getNavData() {
  try {
    const currLocale = getCurrentLocale()
    const headerPromise = fetch(getBaseUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        store: getStoreHeaderValue(currLocale),
      },
      body: JSON.stringify({
        query: GET_NAVIGATION.loc?.source?.body,
        variables: {
          mobileMenuBlock: "side-menu",
          mobileMenuBottomCMSBlock: "hnak-footer-block-5",
        },
      }),
    })

    const allCategoryPromise = fetch(getBaseUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        store: getStoreHeaderValue(currLocale),
      },
      body: JSON.stringify({
        query: GET_ALL_CATEGORY.loc?.source?.body,
      }),
    })

    const res = await Promise.all([headerPromise, allCategoryPromise])

    const { data: menuData } = await res[0].json()
    const { data: categoriesData } = await res[1].json()
    return {
      navMenu: get(menuData, "navMenu.menu", []),
      allCategories: get(categoriesData, "allCategories", []),
    }
    // return get(data, "cmsBlocks.items.0", {})
  } catch (err) {
  }
}

export default async function NavigationBar() {
  const data = await getNavData()

  const navMenu = get(data, "navMenu", [])
  const allCategories = get(data, "allCategories", [])

  return (
    <div className="header-navigation">
      <div className="container row">
        <AllCategories
          allCategories={get(allCategories, "items.0.children", [])}
          show={true}
          isMobile={false}
        />
        <NavMenu navMenu={get(navMenu, "menu_items", [])} />
        {/* {displayType !== DISPLAY_TYPE.LARGE || windowWidth < 1025 ? (
          <>
            <div className={`mobile-menu-offcanvas fancy-scroll show`}>
              <MobileMenuOffCanvas
                menuList={navMenu.filter((item, idx) => idx < 7)}
                show={showMobileMenu}
                setShow={setShowMobileMenu}
                setShowCategories={setShowCategories}
                mobileMenuCMSBlock={mobileMenuCMSBlock}
                mobileMenuBottomCMSBlock={mobileMenuBottomCMSBlock}
              />
            </div>
            <div className="black-layer" style={{ display: "none" }}></div>
          </>
        ) : (
          ""
        )} */}
      </div>
    </div>
  )
}
