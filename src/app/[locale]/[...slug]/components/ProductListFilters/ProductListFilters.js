"use client"
import React ,{useMemo}from "react"

// import { useQuery } from "@apollo/client"
// import { useTranslation } from "react-i18next"

import get from "lodash/get"
import size from "lodash/size"
import { useI18n } from "@locales/client"
import { FilterOptions } from "./FilterOptions"
// import { GET_SWATCH_AVAILABLE_OPTIONS } from "components/ProductList/PLPData.gql"
// import LazyLoad from "react-lazyload"

import "./product-filter.scss";


/*
  parent component : ProductList.jsx
*/
const ProductFilters =  ({
  aggregations,
  currFilters,
  // findSelectedFilterOptions,
  // onFilterChange,
  clearAll,
  filter,
  filterExclude = [],
}) => {
  const t =  useI18n()
  const findSelectedFilterOptions = (code) => {
    let currFilters = { ...filter };
    let selectedFilter = currFilters[code] || null;
    switch (code) {
      case "price":
        if (selectedFilter !== null) {
          return [selectedFilter.to];
        }
      default:
        if (selectedFilter) {
          return [...selectedFilter.in];
        }
    }
    return [];
  };
  // let { t } = useTranslation()
  // const { data } = useQuery(GET_SWATCH_AVAILABLE_OPTIONS, {
  //   context: {
  //     fetchOptions: {
  //       method: "GET",
  //     },
  //   },
  // })

  // get swatch available options which have values
  // const swatchAvailableOptions = get(
  //   data,
  //   "swatchAvailableOptions.swatch_Options",
  //   []
  // ).filter((item) => !!item.value)

  const filteredAggregations = useMemo(() => {
    return aggregations.filter(
      (filteraggr) => !filterExclude.includes(filteraggr.attribute_code)
    )
  }, [filterExclude, aggregations])
  if (filteredAggregations.length === 0) return ""
  return (
    <div>
      <div className="filters">
        <div className="row jcsb aic">
          <h2>{t("plp.filters")}</h2>
          {size(currFilters) > 0 ? (
            <span className="clear-all-btn" onClick={clearAll}>
              {t("plp.clearAll")}
            </span>
          ) : null}
        </div>
        <div className="filter-list">
          {filteredAggregations.map((aggr) => (
            // <LazyLoad
            //   height="60px"
            //   once
            //   resize={true}
            //   key={aggr.attribute_code}>
              <div key={aggr.attribute_code}>
                <FilterOptions
                  selectedOptions={findSelectedFilterOptions(
                    aggr.attribute_code
                  )}
                  aggregation={aggr}
                  // onFilterChange={onFilterChange}
                  // swatchAvailableOptions={swatchAvailableOptions}
                />
              </div>
            // </LazyLoad>
          ))}
        </div>
      </div>
    </div>
  )
}
export default ProductFilters
