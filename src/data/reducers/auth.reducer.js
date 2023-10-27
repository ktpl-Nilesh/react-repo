import { createSlice } from "@reduxjs/toolkit"
// import { GET_CUSTOMER_PROFILE } from "components/Account/Profile/profile.gql"
// import { dlOnLogin } from "data/dataLayer/dataLayerEvents"
// import { gqclient } from "data/graphql.client"
// import { store } from "data/store"
// import { get } from "lodash"
// const sha256 = require("sha256")

export const AUTH_LOADING_TYPE = {
  SOCIAL: "social",
}

const initialState = {
  token: "",
  user: null,
  loading: "idle",
  formData: {},
  formErrorMessage: null,
  loadingType: null, // social
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload
      // resetting form data if exist
      state.formData = {}
      state.formErrorMessage = null
      //   gqclient.query({ query: GET_CUSTOMER_PROFILE }).then((res) => {
      //     store.dispatch(setUserInfo(get(res, "data.customer", null)))
      //     dlOnLogin({
      //       email: get(res, "data.customer.email", ""),
      //       customer_mobile:
      //         get(res, "data.customer.countryreg", "") +
      //         get(res, "data.customer.customer_mobile", ""),
      //     })
      //     // set webengage attributes
      //     if (window && window.webengage) {
      //       window.webengage.user.login(
      //         sha256(
      //           get(res, "data.customer.countryreg", "") +
      //             get(res, "data.customer.customer_mobile", "")
      //         )
      //       )
      //       window.webengage.user.setAttribute(
      //         "we_email",
      //         get(res, "data.customer.email", "")
      //       )
      //       window.webengage.user.setAttribute(
      //         "we_phone",
      //         get(res, "data.customer.countryreg", "") +
      //           get(res, "data.customer.customer_mobile", "")
      //       )
      //       window.webengage.user.setAttribute(
      //         "we_first_name",
      //         get(res, "data.customer.firstname", "")
      //       )
      //     }
      //   })
    },
    logout: (state) => {
      state.token = null
      state.user = null
      //   if (window && window.webengage) {
      //     webengage.user.logout()
      //   }
      //   gqclient.cache.reset()
    },
    setFormData: (state, { payload }) => {
      state.formData = { ...payload }
    },
    setMobileVerified: (state, { payload }) => {
      state.formData.isMobileVerified = payload
    },
    setFormErrorMessage: (state, { payload }) => {
      state.formErrorMessage = payload
    },
    setLoadingType: (state, { payload }) => {
      state.loadingType = payload
    },
    setUserInfo: (state, action) => {
      state.user = action.payload
    },
  },
})

export const {
  login,
  logout,
  setFormData,
  setMobileVerified,
  setFormErrorMessage,
  setLoadingType,
  setUserInfo,
} = authSlice.actions
export default authSlice.reducer
