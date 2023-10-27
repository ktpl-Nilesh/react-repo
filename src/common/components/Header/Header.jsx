import Image from "next/image"
import HeaderTop from "./HeaderTop"
import NavBar from "@common/components/NavigationBar"
import "./header.scss"
import HeaderSearchBar from "../SearchBar"
import { getCurrentLocale, getI18n } from "@locales/server"

import Clienti18nWrapper from "../../../app/[locale]/components/Clienti18nWrapper"
import WishList from "../WishList"
import MiniCart from "../MiniCart"
import Link from "next/link"

export default async function Header() {
  const t = await getI18n()
  const currLocale = getCurrentLocale()

  const isUserLoggedIn = false
  return (
    <div
      className={`main-header header-ecom`}
      id="site_header"
      style={{ direction: currLocale === "ar-sa" ? "rtl" : "ltr" }}
      lang={currLocale}>
      <HeaderTop />
      <div className="header-secondary">
        <div className="container">
          <div className="row jcsb aic">
            <div className="site-logo">
              <div className="logo-ecom">
                <Link href={`/${currLocale === "ar-sa" ? "ar-sa" : "en-sa"}`}>
                  <Image
                    src="/assets/images/logo-main.svg"
                    alt="Site Logo"
                    height="45"
                    width="60"
                  />
                </Link>
              </div>
            </div>
            <div className="right-content aic jcsb">
              {/* <Clienti18nWrapper>                 */}
              <HeaderSearchBar />
              {/* </Clienti18nWrapper> */}
              <div className="last-block row no-shrink">
                <MiniCart />
                <WishList />
                <div className="is-loggedin row aic">
                  {/* {isUserLoggedIn ? <LoginSignup /> : null} */}
                </div>
                {isUserLoggedIn ? null : (
                  <div
                    // onClick={handleLoginClick}
                    className="not-loggedin no-shrink">
                    <div className="action h-login">
                      {t("header.loginOrSignUp")}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavBar />
    </div>
  )
}
