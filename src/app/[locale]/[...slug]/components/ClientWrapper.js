"use client"
import React from "react"
import { I18nProviderClient } from "@locales/client"

const ClientWrapper = ({ children }) => {
  return <I18nProviderClient>{children}</I18nProviderClient>
}

export default ClientWrapper
