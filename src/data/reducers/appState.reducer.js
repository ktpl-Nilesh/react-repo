import { createSlice } from "@reduxjs/toolkit"
// import { calculateDisplayType } from "utils/utils"
import { login, logout } from "./auth.reducer"

export const DISPLAY_TYPE = {
  SMALL: 1,
  MEDIUM: 2,
  // IPAD: 3,
  LARGE: 3,
}

const initialState = {
  isLoggedIn: false,
  lang: "en",
  dir: "ltr",
  displayType: 3,
  popType: null,
  resetPasswordEmail: "",
  // Id of cart and wishlist needs to persist through reloads
  // so keeping data in app state
  cartId: "",
  wishListId: "",
  compareListId: "",
  tamaraOrderId: "",
  wishlist_session: {},
  // remember auth state if required
  loginFormState: {
    email: "",
    customer_mobile: "",
    password: "",
    remember: false,
  },
  cancelOrder: null,
  returnOrder: { order: null, type: null, items: [], productImages: [] },
  orderInvoices: null,
}

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload
      state.dir = action.payload === "en" ? "ltr" : "rtl"
    },
    updateDisplayType: (state) => {
      // state.displayType = calculateDisplayType()
    },
    setResetPasswordEmail: (state, action) => {
      state.resetPasswordEmail = action.payload
    },
    setCartId: (state, action) => {
      state.cartId = action.payload
    },
    setWishlistId: (state, { payload }) => {
      state.wishListId = payload
    },
    setCompareListId: (state, { payload }) => {
      state.compareListId = payload
    },
    setTamaraOrderId: (state, action) => {
      state.tamaraOrderId = action.payload
    },
    setWishlistSession: (state, action) => {
      state.wishlist_session = action.payload
    },
    // payload : { email, customer_mobile, password }
    setLoginFormState: (state, { payload }) => {
      state.loginFormState = { ...payload }
    },
    setCancelOrder: (state, { payload }) => {
      state.cancelOrder = payload
    },
    setReturnOrder: (state, { payload }) => {
      state.returnOrder = payload
    },
    setOrderInvoices: (state, { payload }) => {
      state.orderInvoices = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login, (state) => {
      state.isLoggedIn = true
      state.cartId = ""
      state.compareListId = ""
    })
    builder.addCase(logout, (state) => {
      const loginFormState = { ...state.loginFormState }
      return { ...initialState, loginFormState }
    })
  },
})

export const {
  setLanguage,
  updateDisplayType,
  setResetPasswordEmail,
  setCartId,
  setWishlistId,
  setWishlistSession,
  setLoginFormState,
  setCancelOrder,
  setReturnOrder,
  setOrderInvoices,
  setCompareListId,
  setTamaraOrderId,
} = appStateSlice.actions
export default appStateSlice.reducer
