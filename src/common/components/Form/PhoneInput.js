import React, { forwardRef } from "react"
import "react-phone-number-input/style.css"
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form-core"

import metadata from "libphonenumber-js/metadata.min.json"

// import "./PhoneInput.scss";

const InputHidden = forwardRef(
  ({ label, error, containerClassName = "", ...rest }, ref) => {
    return (
      <>
        <input ref={ref} type="hidden" {...rest} />
        {error ? <div className="err-msg">{error}</div> : null}
      </>
    )
  }
)

InputHidden.displayName = "InputHidden"

const PhoneInput = forwardRef(
  (
    {
      label,
      error,
      containerClassName = "",
      hiddenCountry,
      countries,
      ...rest
    },
    ref
  ) => {
    const whitelisted_conutries = countries.map((item) => {
      return item.two_letter_abbreviation
    })

    return (
      <div className={`form-group ${containerClassName}`}>
        {label ? <label>{label}</label> : ""}
        <PhoneInputWithCountry
          name={rest.name}
          control={rest.control}
          countries={whitelisted_conutries}
          metadata={metadata}
          // {...rest}
          onCountryChange={(event) => {
            hiddenCountry.onChange({
              target: {
                name: hiddenCountry.name,
                value: event,
              },
              type: "change",
            })
          }}
          onChange={(event) => {
            // console.log(rest.name);
            //   rest.onChange({
            //     target:{
            //       name: rest.name,
            //       value: event
            //     },
            //     type: "change"
            //   })
          }}
        />

        <InputHidden {...hiddenCountry} />
        {/* <input className="input-text" ref={ref} {...rest} /> */}
        {error ? <div className="err-msg">{error}</div> : null}
      </div>
    )
  }
)

PhoneInput.displayName = "PhoneInput"

export default PhoneInput
