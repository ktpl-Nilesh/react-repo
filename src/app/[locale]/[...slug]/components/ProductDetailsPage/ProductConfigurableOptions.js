"use  client"
import React, { forwardRef } from "react"

import get from "lodash/get"
import size from "lodash/size"
import find from "lodash/find"
import filter from "lodash/filter"
import indexOf from "lodash/indexOf"
import includes from "lodash/includes"

import ImageRenderer from "../../../../../common/components/Image"
import PLACEHOLDER from "../../../../../common/components/Image/PLACEHOLDER"

import { getSaleableQty } from "@utils/app.utils.js"
import SizeChart from "./SizeChart"

/**
 *
 * Renders Product configurable options
 * Parent
 *    ProductDetails
 */
const ProductConfigurableOptions = forwardRef(
  (
    {
      data,
      value = 5,
      name,
      watch,
      variants,
      onChange,
      handleMedia,
      sizeChartPos,
      size_chart,
    },
    ref
  ) => {
    return (
      <>
        {data.map((configOption, optionIndex) => {
          const { attribute_uid, attribute_code, label, values } = configOption
          // tried to remove double variant check but becomes decrimental to revese options states

          // handle OUT OF STOCK
          let outOfStockOptions = []
          let noVariants = []
          let selectedOptVariants = [...variants]
          // loop over each selected value, exclude current index and empty ( not selected )
          // filter variant list based on it
          for (let vInd = 0; vInd < value.length; vInd++) {
            // don't filter by current option
            if (vInd === optionIndex) continue
            const currVal = value[vInd]
            // don't filter for not selected
            if (currVal === "") continue
            selectedOptVariants = filter(selectedOptVariants, (o) => {
              return find(o.attributes, ["uid", currVal])
            })
          }
          // loop over each option to check if it is out of stock
          for (let valInd = 0; valInd < values.length; valInd++) {
            const currOptVal = values[valInd]
            // for each value check if we get a single variant
            const checkVariants = filter(selectedOptVariants, (v) => {
              return find(v.attributes, ["uid", currOptVal.uid])
            })

            // if we get single variant we can check if out of stock
            if (size(checkVariants) === 1) {
              const saleableQty = get(
                checkVariants,
                "0.product.product_saleable_qty"
              )
              if (
                get(checkVariants, "0.product.stock_status") ===
                  "OUT_OF_STOCK" ||
                getSaleableQty(saleableQty).disabled
              ) {
                outOfStockOptions.push(currOptVal.uid)
              }
            } else if (!checkVariants.length) {
              if (!!size(watch(name).filter((s) => !!s))) {
                noVariants.push(currOptVal.uid)
              }
            }
          }

          // checking attribute code as in color we need to display color code
          if (attribute_code.includes("color")) {
            return (
              <SwatchImage
                key={attribute_uid}
                options={values}
                outOfStockOptions={outOfStockOptions}
                noVariants={noVariants}
                label={label}
                attribute_code={attribute_code}
                selectedValue={value} // list of selected uids
                onOptionPress={(configValue) => {
                  handleMedia(configValue)
                  const updateValue = [...value]
                  if (updateValue[optionIndex] === configValue.uid) {
                    updateValue.splice(optionIndex, 1, "")
                  } else {
                    updateValue.splice(optionIndex, 1, configValue.uid)
                  }
                  onChange(updateValue)
                }}
              />
            )
          } else {
            return (
              <div className="has-size-chart row aic" key={attribute_uid}>
                <SizeOptions
                  key={attribute_uid}
                  options={values}
                  outOfStockOptions={outOfStockOptions}
                  noVariants={noVariants}
                  label={label}
                  attribute_code={attribute_code}
                  selectedValue={value} // list of selected uids
                  onOptionPress={(configValue) => {
                    handleMedia(configValue)
                    const updateValue = [...value]
                    if (updateValue[optionIndex] === configValue.uid) {
                      updateValue.splice(optionIndex, 1, "")
                    } else {
                      updateValue.splice(optionIndex, 1, configValue.uid)
                    }
                    onChange(updateValue)
                  }}
                />
                {!!size(size_chart) &&
                sizeChartPos !== -1 &&
                sizeChartPos === optionIndex ? (
                  <SizeChart size_chart={size_chart} />
                ) : (
                  ""
                )}
              </div>
            )
          }
        })}
      </>
    )
  }
)

/**
 * Render color options
 * handlers will be passed from the props
 *
 * Parent
 *    ProductConfigurableOptions
 *    ConfigurableOptionPopup
 */
export const SwatchImage = ({
  options,
  outOfStockOptions,
  noVariants,
  label,
  onOptionPress,
  selectedValue,
}) => {
  return (
    <div className={`config-option-wrapper color`}>
      <strong>{label}</strong>
      <div className="config-opt-values fancy-scroll">
        {options.map((configValue) => {
          const isActive = includes(selectedValue, configValue.uid)
          const isOutOfStock =
            indexOf(outOfStockOptions, configValue.uid) !== -1
          const isNovariant = indexOf(noVariants, configValue.uid) !== -1
          const hasSwatch = get(configValue, "swatch_data")
          const thumbnail = get(configValue, "swatch_data.thumbnail")

          if (hasSwatch) {
            return (
              <div
                key={configValue.uid}
                className={`config-opt-value-block ${
                  thumbnail ? "has-image" : ""
                } ${isOutOfStock || isNovariant ? "disabled" : ""} ${
                  isActive ? "active" : ""
                } ${isNovariant ? "not-available" : ""} ${
                  isNovariant ? "not-available" : ""
                }`}
                style={{
                  // cursor: "pointer",
                  backgroundColor: get(configValue, "swatch_data.value", ""),
                  // border: isActive ? "5px solid #337ab7" : 0,
                }}
                onClick={(e) => {
                  if (isNovariant) {
                    return
                  }
                  e.preventDefault()
                  onOptionPress(configValue)
                }}>
                {thumbnail ? (
                  <ImageRenderer
                    url={thumbnail}
                    thumb={PLACEHOLDER}
                    minHeight={50}
                    className={`swatch-image`}
                  />
                ) : (
                  configValue.label
                )}
              </div>
            )
          } else {
            return (
              <SimpleOptionBlock
                key={configValue.uid}
                configValue={configValue}
                isOutOfStock={isOutOfStock}
                isActive={isActive}
                isNovariant={isNovariant}
                onOptionPress={onOptionPress}
              />
            )
          }
        })}
      </div>
    </div>
  )
}

export const ColorOptions = ({
  options,
  outOfStockOptions,
  noVariants,
  label,
  selected_option_uid,
  onOptionPress,
}) => {
  return (
    <div className={`config-option-wrapper color`}>
      <strong>{label}</strong>
      <div className="config-opt-values fancy-scroll">
        {options.map((configValue) => {
          const isActive = configValue.uid === selected_option_uid
          const isOutOfStock =
            indexOf(outOfStockOptions, configValue.uid) !== -1
          const isNovariant = indexOf(noVariants, configValue.uid) !== -1
          const hasSwatch = get(configValue, "swatch_data")
          const colorImage = get(configValue, "swatch_data.thumbnail")
          const colorData = get(configValue, "swatch_data.value", "red")
          const background = colorImage ? `url(${colorImage})` : colorData
          const colorStyle = colorImage
            ? {
                width: "100%",
                // height: "55px",
                backgroundColor: "#F5FFFC",
                backgroundImage: background,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center top",
                backgroundPosition: "center",
                backgroundSize: "contain",
                borderRadius: "0px",
              }
            : {
                background: background,
              }
          if (hasSwatch) {
            return (
              <div
                key={configValue.uid}
                className={`config-opt-value-block 
                ${isOutOfStock || isNovariant ? "disabled" : ""} ${
                  isActive ? "active" : ""
                } ${isNovariant ? "not-available" : ""}`}
                style={{
                  ...colorStyle,
                }}
                onClick={(e) => {
                  if (isNovariant) {
                    return
                  }
                  e.preventDefault()
                  onOptionPress(configValue)
                }}>
                {configValue.label}
              </div>
            )
          } else {
            return (
              <SimpleOptionBlock
                configValue={configValue}
                isOutOfStock={isOutOfStock}
                isActive={isActive}
                isNovariant={isNovariant}
                onOptionPress={onOptionPress}
                key={configValue.uid}
              />
            )
          }
        })}
      </div>
    </div>
  )
}

/**
 * Render Size options
 * handlers and selected values will be passed in props
 *
 * Parent
 *    ProductConfigurableOptions
 *    ConfigurableOptionPopup
 */
export const SizeOptions = ({
  options,
  outOfStockOptions,
  noVariants,
  label,
  onOptionPress,
  selectedValue,
  selected_option_uid,
}) => {
  return (
    <div className={`config-option-wrapper size`}>
      <strong>{label}</strong>
      <div className="config-opt-values fancy-scroll">
        {options.map((configValue) => {
          const isActive =
            includes(selectedValue, configValue.uid) ||
            selected_option_uid === configValue.uid
          const isOutOfStock =
            indexOf(outOfStockOptions, configValue.uid) !== -1
          const isNovariant = indexOf(noVariants, configValue.uid) !== -1
          return (
            <SimpleOptionBlock
              configValue={configValue}
              isOutOfStock={isOutOfStock}
              isActive={isActive}
              onOptionPress={onOptionPress}
              key={configValue.uid}
              isNovariant={isNovariant}
            />
          )
        })}
      </div>
    </div>
  )
}

// return simple label value block for config option
const SimpleOptionBlock = ({
  configValue,
  isOutOfStock,
  isActive,
  onOptionPress,
  isNovariant,
}) => {
  return (
    <div
      key={configValue.uid}
      className={`config-opt-value-default-block ${
        isOutOfStock || isNovariant ? "disabled" : ""
      } ${isNovariant ? "not-available" : ""}`}
      onClick={(e) => {
        if (isNovariant) {
          return
        }
        e.preventDefault()
        onOptionPress(configValue)
      }}
      style={{
        backgroundColor: isActive ? "#000" : "white",
        color: isActive ? "white" : "black",
      }}>
      {configValue.label}
    </div>
  )
}

ProductConfigurableOptions.displayName = "ProductConfigurableOptions"

export default ProductConfigurableOptions
