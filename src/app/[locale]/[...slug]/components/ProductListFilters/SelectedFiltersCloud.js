import { isEqual, size } from "lodash";
import * as React from "react";
import { useTranslation } from "react-i18next";

const SelectedFiltersCloud = ({
  availableFilters,
  findSelectedFilterOptions,
  handleFilter,
  currFilters,
  filterExclude = [],
  filter,
  clearAllFilters,
}) => {
  let { t } = useTranslation();

  function formatOptionText(label_text) {
    if (label_text == "0") {
      return t("filterOption.no");
    }
    if (label_text == "1") {
      return t("filterOption.yes");
    }
    return label_text;
  }

  return (
    <div className="selected-filters-mobile">
      {availableFilters
        .filter((fltrItem) => !filterExclude.includes(fltrItem.attribute_code))
        .map((filter, index) => {
          let selectedFilterOptions = findSelectedFilterOptions(
            filter.attribute_code
          );
          return (
            <React.Fragment key={index}>
              {filter.options
                .filter((fltr) => {
                  if (filter.attribute_code === "price") {
                    return selectedFilterOptions.includes(
                      Number(fltr.value.split("_")[1])
                    );
                  }
                  return selectedFilterOptions.includes(fltr.value);
                })
                .map((filterOption, index) => (
                  <span key={index}>
                    {filter.attribute_code === "price" ? (
                      <span className="fltr-label">
                        {`${t("filterOption.underPrice")} ${
                          filterOption.label.split("-")[1]
                        }`}
                        <span
                          onClick={() =>
                            handleFilter(
                              filter.attribute_code,
                              filterOption,
                              false
                            )
                          }
                          className="remove-icon"
                        ></span>
                      </span>
                    ) : (
                      <span key={index}>
                        {`${filter.label} ${formatOptionText(
                          filterOption.label
                        )}`}
                        <span
                          onClick={() =>
                            handleFilter(
                              filter.attribute_code,
                              filterOption,
                              false
                            )
                          }
                          className="remove-icon"
                        ></span>
                      </span>
                    )}
                  </span>
                ))}
            </React.Fragment>
          );
        })}
      {size(currFilters) > 0 ? (
        <span className="clr-btn" onClick={clearAllFilters}>
          {t("plp.clearAll")}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default SelectedFiltersCloud;
