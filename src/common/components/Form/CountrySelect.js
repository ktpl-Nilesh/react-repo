import React, { forwardRef, useEffect, useState } from "react";
// import "./CountrySelect.scss";
import { useSelector } from "react-redux";
import { getCountries } from "data/selectors/storeConfig.selector";
import { useDropdown } from "utils/useDropdown";
import { getCountryListMap } from "country-flags-dial-code";

const Select = forwardRef(
  ({ label, error, value = "SA", containerClassName = "", ...rest }, ref) => {
    const { elementRef, expanded, setExpanded } = useDropdown();
    const [selectedValue, setSelectedValue] = useState(value);

    useEffect(() => {
      setSelectedValue(value);
    }, [value]);

    const metadata = getCountryListMap();
    const countries = useSelector(getCountries);

    const handle = (value) => {
      rest.onChange({
        target: {
          name: rest.name,
          value: value,
        },
        type: "change",
      });
      setSelectedValue(value);
      setExpanded(!expanded);
    };

    return (
      <div ref={ref} className="country-list-wrapper">
        <div
          className={` ${containerClassName} dropdown-country dropdown  ${
            expanded ? "open" : ""
          }`}
          ref={elementRef}
        >
          <button
            className="dropdown-toggle jcc row"
            type="button"
            onClick={() => setExpanded(!expanded)}
          >
            <span
              dangerouslySetInnerHTML={{
                __html: metadata[selectedValue]?.flag,
              }}
            />
            <span> {metadata[selectedValue].dialCode}</span>
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            {countries.map((opt) => {
              const _value = metadata[opt.two_letter_abbreviation].dialCode;
              return (
                <li
                  className="aic"
                  key={_value}
                  onClick={() => handle(opt.two_letter_abbreviation)}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: metadata[opt.two_letter_abbreviation].flag,
                    }}
                  />
                  <span>{`${opt.full_name_locale} (${_value})`}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      //
    );
  }
);

Select.displayName = "Select"


export default Select;
