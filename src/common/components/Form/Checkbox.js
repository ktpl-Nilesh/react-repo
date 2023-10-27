// eslint-disable-next-line react/display-name
import React, { forwardRef } from "react"
// import './checkbox.scss';

const Checkbox = forwardRef(({ field, label, ...rest }, ref) => {
  return (
    <div className="checkbox">
      <input ref={ref} id={field} type="checkbox" {...rest} />
      <label htmlFor={field}>{label}</label>
    </div>
  )
})

Checkbox.displayName = "checkbox"

export default Checkbox
