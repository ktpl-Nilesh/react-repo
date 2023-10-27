import Image from "next/image"

import get from "lodash/get"

import CMSBlock from "../CMSBlock"
import BackToTopBtn from "./BackToTopBtn"

import { getI18n } from "@locales/server"
import { fetchGqlServer } from "@utils/data.utils"
import { GET_FOOTER_DATA } from "./footer.gql"
import { DISPLAY_TYPE } from "@utils/constant"

import "./footer.scss"

async function getFooterData() {
  try {
    const { data } = await fetchGqlServer({
      query: GET_FOOTER_DATA.loc?.source?.body,
      nextOptions: { revalidate: 60 },
    })

    const footerBlock1 = get(data, "footer.items.0.content", "")
    const footerBlock2 = get(data, "footer.items.1.content", "")
    const footerBlock3 = get(data, "footer.items.2.content", "")
    const footerBlock4 = get(data, "footer.items.3.content", "")
    const footerBlock5 = get(data, "footer.items.4.content", "")
    const footerBlock6 = get(data, "footer.items.5.content", "")
    return {
      footerBlock1,
      footerBlock2,
      footerBlock3,
      footerBlock4,
      footerBlock5,
      footerBlock6,
    }
  } catch (err) {
    return {}
  }
}

export default async function Footer() {
  const {
    footerBlock1,
    footerBlock2,
    footerBlock3,
    footerBlock4,
    footerBlock5,
    footerBlock6,
  } = await getFooterData()

  const t = await getI18n()

  // TODO separate once we have responsive ui setup
  const displayType = DISPLAY_TYPE.LARGE
  // don't show bottom bars on cart and checkout pages
  const showBottomBars = true

  return (
    <footer className="main-footer">
      <div className="footer-row-1">
        <CMSBlock
          html={footerBlock1
            ?.toString()
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")}
        />
      </div>

      {showBottomBars ? <BackToTopBtn /> : null}

      <div className="footer-row-2 footer-block">
        <div className="container row">
          {displayType === DISPLAY_TYPE.LARGE ? (
            <CMSBlock
              html={footerBlock2
                ?.toString()
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")}
            />
          ) : (
            ""
          )}

          <CMSBlock
            html={footerBlock3
              ?.toString()
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")}
          />
          {displayType === DISPLAY_TYPE.LARGE ? (
            <CMSBlock
              html={footerBlock4
                ?.toString()
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")}
            />
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="footer-row-3 mid-footer">
        <div className="container">
          <div className="footer-content">
            {displayType === DISPLAY_TYPE.LARGE ? (
              <div className="logo-white">
                <Image
                  src="/assets/images/logo-white.svg"
                  height="80"
                  width="112"
                  alt="logo white"
                />
              </div>
            ) : (
              ""
            )}
            {/* <NewsLetterForm /> */}
            <div className="social-icon">
              <label>{t("footer.findUs")}: </label>
              <ul>
                <li className="yt">
                  <a
                    href="https://www.youtube.com/channel/UClk1D8nB_ZJdPK3PbIdh7uA"
                    target="_blank"
                    rel="noreferrer">
                    <Image
                      src="/assets/images/social/Icons/youtube.png"
                      alt="youtube"
                      width="30"
                      height="30"
                    />
                  </a>
                </li>
                <li className="sc">
                  <a
                    href="https://www.snapchat.com/add/hnak.com"
                    target="_blank"
                    rel="noreferrer">
                    <Image
                      src="/assets/images/social/Icons/snapchat.png"
                      alt="snapchat"
                      width="30"
                      height="30"
                    />
                  </a>
                </li>
                <li className="tw">
                  <a
                    href="https://twitter.com/HNAKKSA"
                    target="_blank"
                    rel="noreferrer">
                    <Image
                      src="/assets/images/social/Icons/twitter.png"
                      alt="twitter"
                      width="30"
                      height="30"
                    />
                  </a>
                </li>
                <li className="fb">
                  <a
                    href="https://www.facebook.com/meethnak"
                    target="_blank"
                    rel="noreferrer">
                    <Image
                      src="/assets/images/social/Icons/facebook.png"
                      alt="facebook"
                      width="30"
                      height="30"
                    />
                  </a>
                </li>
                <li className="ins">
                  <a
                    href="https://www.instagram.com/hnak.sa"
                    target="_blank"
                    rel="noreferrer">
                    <Image
                      src="/assets/images/social/Icons/insta.png"
                      alt="insta"
                      width="30"
                      height="30"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-mobileonly">
        {displayType !== DISPLAY_TYPE.LARGE ? (
          <CMSBlock
            html={footerBlock6
              ?.toString()
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")}
          />
        ) : (
          ""
        )}
      </div>
      <div className="footer-row-4">
        <CMSBlock
          html={footerBlock5
            ?.toString()
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")}
        />
      </div>
      {/* {showBottomBars ? (
        <BackToTopBtn
          isSlick
          className=""
          otherStyles={{ display: "inline-block" }}
        />
      ) : null} */}
    </footer>
  )
}
