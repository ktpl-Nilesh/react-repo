"use client"
import { I18nProviderClient } from "@locales/client"

const Clienti18nWrapper = ({ children }) => {
  return <I18nProviderClient>{children}</I18nProviderClient>
}

export default Clienti18nWrapper
