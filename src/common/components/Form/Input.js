import React, { forwardRef } from "react"
// import "./input.scss";

const Input = forwardRef(
  ({ label, error, containerClassName = "", ...rest }, ref) => {
    return (
      <div className={`form-group ${containerClassName}`}>
        {label ? <label>{label}</label> : ""}
        <input className="input-text" ref={ref} {...rest} />
        {error ? <div className="err-msg">{error}</div> : null}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
