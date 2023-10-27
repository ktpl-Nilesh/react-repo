import React from "react"
import { getSaleableQty } from "@utils/app.utils.js"

const getDropdownData = (disabled, qty) => {
  const dataCount = disabled || qty > 30 ? 30 : qty
  const qty_dropdown = []
  for (let i = 1; i <= dataCount; i++) {
    qty_dropdown.push({ label: `${i}`, value: i })
  }
  return qty_dropdown
}
/**
 * customer component for quantiy dropdown
 * handlers will be passed from form hook in props
 *
 * Parent
 *      ProductPage
 */
const QuantityDropdown = React.forwardRef(
  ({ onChange, onBlur, name, initialValue = false, saleableQty = 0 }, ref) => {
    const { disabled, qty } = getSaleableQty(saleableQty)
    return (
      <div className="qty-box">
        <select
          ref={ref}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          defaultValue={initialValue}
          disabled={disabled}>
          {getDropdownData(disabled, qty).map((item) => {
            const isSelected = initialValue && initialValue === item.value
            return (
              <option value={item.value} key={item.value}>
                {item.label}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
)

QuantityDropdown.displayName = "QuantityDropdown"

export default QuantityDropdown
