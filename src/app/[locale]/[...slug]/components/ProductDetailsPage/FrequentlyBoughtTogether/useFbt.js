import get from "lodash/get"
import map from "lodash/map"
import size from "lodash/size"
// import useCart from "pages/CartPage/useCart";
// import { useState } from "react"
import { getSaleableQty } from "@utils/app.utils.js"

export const useFbt = ({ products }) => {
  // const { handleMultiAddToCart, multipleAddToCartLoading } = useCart();
  // const [noSelected, setNoSelected] = useState(false)
  const noSelected = false
  const setNoSelected = () => {}
  const handleFbtAddtoCart = (data) => {
    let cartItems = []
    cartItems = data.fbt_products.map((fbt, fbtIndex) => {
      if (fbt) {
        const product = products[fbtIndex]
        const selected_options = get(data, `selected_options-${fbtIndex}`)
        return {
          sku: product.sku,
          quantity: 1,
          selected_options,
        }
      }
      return null
    })
    cartItems = cartItems.filter((c) => !!c)
    if (!cartItems.length) {
      setNoSelected(true)
      return
    } else {
      setNoSelected(false)
    }
    handleMultiAddToCart({ cartItems })
  }
  return {
    handleFbtAddtoCart,
    // multipleAddToCartLoading
     noSelected
  }
}
