"use client"

import React, { useCallback } from "react"

export default function BackToTopBtn({
  isSlick = false,
  className,
  otherStyles = {},
}) {
  const scrollTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  return (
    <div
      className={!!className ? `back-to-top ${className}` : "back-to-top"}
      style={otherStyles}
      onClick={scrollTop}
    >
      {/* <span>{t("footer.backTop")} </span> */}
      <span>{isSlick ? "" : "Back To Top"}</span>
    </div>
  )
}
