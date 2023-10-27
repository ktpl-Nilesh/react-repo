"use client"
import { I18nProviderClient, useI18n } from "@locales/client"
import React, { useState } from "react"
import {
  EmailIcon,
  FacebookIcon,
  PinterestIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailShareButton,
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share"
// import { getEmailShareTemplate } from "utils/getEmailShareTemplate";

export const ProductShare = ({
  shareUrl,
  show,
  thumbnail,
  title,
  description,
}) => {
  const t = useI18n()
  return (
    <div className={`share-options ${show ? "show" : ""}`}>
      <div className="share-btn">
        <EmailShareButton
          subject={t("emailShare.subject")}
          body={t("emailShare.body")}
          url={shareUrl}>
          <EmailIcon round size={56} />
        </EmailShareButton>
      </div>
      <div className="share-btn">
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon round size={56} />
        </FacebookShareButton>
      </div>
      <div className="share-btn">
        <PinterestShareButton
          url={shareUrl}
          media={thumbnail}
          title={title}
          description={description}>
          <PinterestIcon round size={56} />
        </PinterestShareButton>
      </div>
      <div className="share-btn">
        <TwitterShareButton url={shareUrl}>
          <TwitterIcon round size={56} />
        </TwitterShareButton>
      </div>
      <div className="share-btn">
        <WhatsappShareButton url={shareUrl}>
          <WhatsappIcon round size={56} />
        </WhatsappShareButton>
      </div>
    </div>
  )
}

export const ProductShareWrapper = ({
  shareUrl,
  thumbnail,
  title,
  description,
}) => {
  const [toggleSocialShare, setToggleSocialShare] = useState(false)

  return (
    <div
      href="#"
      className="share"
      onClick={() => setToggleSocialShare(!toggleSocialShare)}
    >
      <img
        src="/assets/images/share-outline.png"
        alt="share product"
        width="22"
        height="22"
      />
      <I18nProviderClient>
        <ProductShare
          shareUrl={shareUrl}
          show={toggleSocialShare}
          thumbnail={thumbnail}
          title={title}
          description={description}
        />
      </I18nProviderClient>
    </div>
  )
}
