"use client"

import { createContext, useCallback, useState } from "react"

export const AuthContext = createContext()

const defaultState = {
  token: "",
  user: null,
  loading: "idle",
  formData: {},
  formErrorMessage: null,
  loadingType: null, // social
}

export function AuthProvider({ children, initialState = defaultState }) {
  const [token, setToken] = useState(initialState.token)
  const [user, setUser] = useState(initialState.user)
  const [loading, setLoading] = useState(initialState.loading)
  const [formData, setFormData] = useState(initialState.formData)
  const [formErrorMessage, setFormErrorMessage] = useState(
    initialState.formErrorMessage
  )
  const [loadingType, setLoadingType] = useState(initialState.loadingType)

  const login = useCallback((newToken) => {
    setToken(newToken)
    // resetting form data if exist
    setFormData({})
    setFormErrorMessage(null)
  }, [])

  const contextReturnData = {
    token,
    user,
    loading,
    formData,
    formErrorMessage,
    loadingType,
    // handlers
    login,
  }

  return (
    <AuthContext.Provider value={contextReturnData}>
      {children}
    </AuthContext.Provider>
  )
}
