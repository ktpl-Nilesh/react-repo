"use client"
import Checkbox from "../../../../../../common/components/Form/Checkbox"
// import { t } from "i18next";
import * as React from "react"
// import { useFieldArray, useForm } from "react-hook-form"
// import { FormProvider } from "react-hook-form"
import { useFbt } from "./useFbt"
import FbtProductItem from "./FbtProductItem"
import get from "lodash/get"
import filter from "lodash/filter"
import find from "lodash/find"
import { PriceString } from "../../../../../../common/components/PriceBlock/PriceString"
// import { useState } from "react"
import "./FrequentlyBoughtTogether.scss";
import { formatPrice } from "@utils/app.utils.js"
import { useI18n } from "@locales/client"
export const FrequentlyBoughtTogether = ({ products = [] }) => {
  
  const { t } = useI18n()
  // const {
  //   control,
  //   register,
  //   handleSubmit,
  //   formState,
  //   watch,
  //   getValues,
  //   ...rest
  // } = useForm()
  const { handleFbtAddtoCart, multipleAddToCartLoading, noSelected } = useFbt({
    products,
  })
  const [totalPrice, setTotalPrice] = React.useState(0)
  // const totalPrice = 0
  // const { fields } = useFieldArray({
  //   control, // control props comes from useForm (optional: if you are using FormContext)
  //   name: "fbt_products", // unique name for your Field Array
  // })
  // const selected_products = watch("fbt_products")

  React.useEffect(() => {
    const selectedProductItems = products
    const newTotalPrice = selectedProductItems.reduce(
      (total, pItem, pItemIndex) => {
        if (selected_products[pItemIndex]) {
          let selectedOptVariants = []
          const selected_options = getValues(`selected_options-${pItemIndex}`)
          if (pItem.configurable_options) {
            if (selected_options && !selected_options.includes("")) {
              // list state will update variants as user starts to select opitons
              selectedOptVariants = pItem.variants
              for (
                let sOptInd = 0;
                sOptInd < selected_options.length;
                sOptInd++
              ) {
                const currOpt = selected_options[sOptInd]
                if (!!currOpt) {
                  selectedOptVariants = filter(selectedOptVariants, (v) => {
                    return find(v.attributes, ["uid", currOpt])
                  })
                }
              }
              return (
                total +
                get(
                  selectedOptVariants,
                  "0.product.price_range.minimum_price.final_price.value",
                  0
                )
              )
            } else {
              return total + 0
            }
          } else {
            return (
              total +
              get(pItem, "price_range.minimum_price.final_price.value", 0)
            )
          }
        } else {
          return total + 0
        }
      },
      0
    )
    setTotalPrice(newTotalPrice)
  }, [])

  if (!products.length) {
    return ""
  }
  return (
    <div className="frequenty-bought">
      <h2 className="title">{t("pdp.frequentlyBought")}</h2>
      {/* <form
        className="fbt-outer-wrapper"
        onSubmit={handleSubmit(handleFbtAddtoCart)}>
        <FormProvider
          control={control}
          formState={formState}
          register={register}
          watch={watch}
          {...rest}>
          <ul className="fbt-wrapper">
            {products.map((product, pindex) => {
              return (
                <li className="fbt-item" key={product.sku}>
                  <FbtProductItem product={product} pIndex={pindex} />
                  <Checkbox
                    field={`fbt_products.${pindex}`}
                    // {...register(`fbt_products.${pindex}`)}
                  />
                </li>
              )
            })}
          </ul>
          <div className="fbt-actions">
            {noSelected ? (
              <div className="fbt-no-selected err-msg">
                {t("fbt.noSelected")}
              </div>
            ) : (
              ""
            )}
            {!!selected_products.includes(true) ? (
              <div className="fbt-total">
                <span className="total-price">{t("pdp.totalPrice")}</span>
                <span>
                  <PriceString
                    value={formatPrice(totalPrice)}
                    currency={get(
                      products,
                      "0.price_range.minimum_price.final_price.currency"
                    )}
                  />
                </span>
              </div>
            ) : (
              ""
            )}
            <button type="submit" className="action primary fbt-add-to-cart">
              {multipleAddToCartLoading ? t("loading") : t("pdp.addToCart")}
            </button>
          </div>
        </FormProvider>
      </form> */}
    </div>
  )
}
