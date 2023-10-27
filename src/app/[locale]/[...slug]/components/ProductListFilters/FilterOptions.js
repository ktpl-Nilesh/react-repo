"use client"
import React, { useState, useMemo } from "react"
import { useI18n } from "@locales/client"

import get from "lodash/get"
import find from "lodash/find"

import Input from "../../../../../common/components/Form/Input"
import { replaceSpecialChars } from "@utils/app.utils"

export const FilterOptions = ({
  aggregation,
  selectedOptions,
  // onFilterChange,
  swatchAvailableOptions,
}) => {
  let [show, setShow] = useState(false)
  const t = useI18n()
  const filterContent = useMemo(() => {
    return (
      <>
        {aggregation.attribute_code.includes("brand") ? (
          <div></div>
        ) : (
          // <BrandFilterOption
          //   aggregation={aggregation}
          //   selectedOptions={selectedOptions}
          //   onFilterChange={onFilterChange}
          //   swatchAvailableOptions={swatchAvailableOptions}
          // />
          <FilterOption
            aggregation={aggregation}
            selectedOptions={selectedOptions}
            // onFilterChange={onFilterChange}
            // swatchAvailableOptions={swatchAvailableOptions}
          />
        )}
      </>
    )
  }, [aggregation, selectedOptions])

  // }, [aggregation, selectedOptions, onFilterChange, swatchAvailableOptions]);

  const selectedCount = selectedOptions?.filter((sopt) => {
    if (aggregation.attribute_code === "price") {
      return aggregation.options.find(
        (aopt) => aopt.value.split("_")[1] == sopt
      )
    }
    return aggregation.options.find((aopt) => aopt.value == sopt)
  }).length

  return (
    <div className="filter-item">
      <div className="row jcsb aic">
        <div>
          <label>{t(aggregation.label)}</label>
          {selectedCount > 0 ? (
            <span className="selected-count">
              {`${selectedCount} ${t("plp.selected")}`}
            </span>
          ) : null}
        </div>
        <span
          className={`filter-toggle ${show ? "show" : "hide"}`}
          onClick={() => setShow(!show)}></span>
      </div>
      <div className={`filter-pane ${show ? "show" : "hide"}`}>
        {show ? filterContent : null}
      </div>
    </div>
  )
}

const BrandFilterOption = ({
  aggregation,
  selectedOptions,
  onFilterChange,
  swatchAvailableOptions,
}) => {
  const [options, setOptions] = useState(get(aggregation, "options", []))

  const getClassName = (attrCode) => {
    if (attrCode.includes("color")) {
      return "color-filter"
    }
    if (attrCode.includes("size")) {
      return "size-filter"
    }
    return `${aggregation.attribute_code}-filter`
  }

  //handle otpions search
  const handleOptionSearch = (e) => {
    if (e.target.value == "") {
      setOptions(get(aggregation, "options", []))
    } else {
      setOptions(
        get(aggregation, "options", []).filter(
          (option) =>
            option.label.toLowerCase().search(e.target.value.toLowerCase()) !==
            -1
        )
      )
    }
  }
  const showBrands = aggregation.options.filter((option) =>
    selectedOptions.includes(option.value)
  )

  return (
    <div className="option-search">
      <div className="input-box">
        <div className="icon">Icon</div>
        <Input
          type="text"
          onChange={handleOptionSearch}
          placeholder={t("plp.searchForBrands")}
        />
      </div>
      {showBrands ? (
        <div className="selected-options">
          {showBrands.map((soption, index) => (
            <div className="selected-option" key={index}>
              <span>{soption.label}</span>
              <span
                className="remove-icon"
                onClick={() =>
                  onFilterChange(aggregation.attribute_code, soption, false)
                }></span>
            </div>
          ))}
        </div>
      ) : null}
      <div
        className={`${getClassName(
          aggregation.attribute_code
        )} filter fancy-scroll`}>
        {options.map((option) => {
          if (aggregation.attribute_code === "price") {
            return (
              <div key={option.value} className="option">
                <input
                  type="checkbox"
                  id={`${aggregation.attribute_code}${option.value}`}
                  onChange={(e) =>
                    onFilterChange(
                      aggregation.attribute_code,
                      option,
                      e.target.checked
                    )
                  }
                  checked={selectedOptions.includes(
                    Number(option.value.split("_")[1])
                  )}
                />

                <label htmlFor={`${aggregation.attribute_code}${option.value}`}>
                  {aggregation.attribute_code.includes("color") ? (
                    <span
                      className="color-badge"
                      style={{ backgroundColor: option.label }}></span>
                  ) : null}
                  {t("plp.underAmount")}
                  <b>
                    {t("plp.sar")} {option.label.split("-")[1]}
                  </b>
                </label>
              </div>
            )
          }
          return (
            <div key={option.value} className="option">
              <input
                type="checkbox"
                id={`${aggregation.attribute_code}${option.value}`}
                onChange={(e) =>
                  onFilterChange(
                    aggregation.attribute_code,
                    option,
                    e.target.checked
                  )
                }
                checked={selectedOptions.includes(option.value)}
              />

              <label htmlFor={`${aggregation.attribute_code}${option.value}`}>
                {aggregation.attribute_code.includes("color") ? (
                  <ColorSwatch
                    option={option}
                    swatchAvailableOptions={swatchAvailableOptions}
                  />
                ) : null}
                {option.label === "0"
                  ? t("plp.no")
                  : option.label === "1"
                  ? t("plp.yes")
                  : replaceSpecialChars(option.label)}
                <span className="pcount">({option.count})</span>
              </label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const FilterOption = ({
  aggregation,
  selectedOptions,
  onFilterChange,
  swatchAvailableOptions,
}) => {
  let options = get(aggregation, "options", [])
  const getClassName = (attrCode) => {
    if (attrCode.includes("color")) {
      return "color-filter"
    }
    if (attrCode.includes("size")) {
      return "size-filter"
    }
    return `${aggregation.attribute_code}-filter`
  }
  // if (aggregation.attribute_code.includes("size")) {
  //   options = Array.from(options).sort((a, b) =>
  //     a.label.localeCompare(b.label)
  //   );
  // }

  return (
    <div
      className={`${getClassName(
        aggregation.attribute_code
      )} filter fancy-scroll`}>
      {options.map((option) => {
        if (aggregation.attribute_code === "price") {
          return (
            <div key={option.value} className="option">
              <input
                type="checkbox"
                id={`${aggregation.attribute_code}${option.value}`}
                onChange={(e) =>
                  onFilterChange(
                    aggregation.attribute_code,
                    option,
                    e.target.checked
                  )
                }
                checked={selectedOptions.includes(
                  Number(option.value.split("_")[1])
                )}
              />

              <label htmlFor={`${aggregation.attribute_code}${option.value}`}>
                {aggregation.attribute_code.includes("color") ? (
                  <span
                    className="color-badge"
                    style={{ backgroundColor: option.label }}></span>
                ) : null}
                {t("plp.underAmount")}
                <b>
                  {t("plp.sar")} {option.label.split("-")[1]}
                </b>
              </label>
            </div>
          )
        }
        return (
          <div key={option.value} className="option">
            <input
              type="checkbox"
              id={`${aggregation.attribute_code}${option.value}`}
              onChange={(e) =>
                onFilterChange(
                  aggregation.attribute_code,
                  option,
                  e.target.checked
                )
              }
              checked={selectedOptions.includes(option.value)}
            />

            <label htmlFor={`${aggregation.attribute_code}${option.value}`}>
              {aggregation.attribute_code.includes("color") ? (
                <ColorSwatch
                  option={option}
                  swatchAvailableOptions={swatchAvailableOptions}
                />
              ) : null}
              {option.label === "0"
                ? t("plp.no")
                : option.label === "1"
                ? t("plp.yes")
                : replaceSpecialChars(option.label)}
              <span className="pcount">({option.count})</span>
            </label>
          </div>
        )
      })}
    </div>
  )
}

const ColorSwatch = ({ option, swatchAvailableOptions }) => {
  const swatchImage = get(
    find(swatchAvailableOptions, ["option_id", option.value]),
    "value"
  )
  return (
    <span
      className={`color-badge ${swatchImage ? "image" : ""}`}
      style={{
        background: swatchImage ? `url(${swatchImage})` : option.label,
      }}
    />
  )
}
