"use client"
import { useCallback, useState } from "react"

import { useChangeLocale, useCurrentLocale } from "@locales/client"
import "./language-switcher.scss"

const LanguageSwitcher = () => {
  const changeLocale = useChangeLocale()
  const currLang = useCurrentLocale()

  const [langLoading, setLangLoading] = useState(false)

  // selected Locale -> en-sa | ar-sa
  const changeLanguage =
  //  useCallback(
    (selectedLocale) => () => {
      changeLocale(selectedLocale)
      setLangLoading(true)
    }
    // [changeLocale]
  // )

  if (langLoading) {
    return (
      <div className="language-switcher">
        <div className="lang">
          <span className="active">||</span>
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div className="language-switcher">
      {currLang === "ar-sa" ? (
        <div className="lang" onClick={changeLanguage("en-sa")}>
          <span className={`active`}>EN</span>
          English
        </div>
      ) : (
        <div className="lang" onClick={changeLanguage("ar-sa")}>
          <span className={`active`}>AR</span>
          العربي‎‎
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
