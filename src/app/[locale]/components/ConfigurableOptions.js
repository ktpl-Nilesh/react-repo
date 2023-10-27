import * as React from "react"
// import ImageRenderer from "./ImageRenderer";
import { PLACEHOLDER } from "@utils/constant"
// import "./config-options.scss";
// import { getColorAttributeCode } from "constants/url.constant";
// import { get } from "react-hook-form";
import ImageRenderer from "../../../common/components/Image/index"
import { size, get } from "lodash"

const emptyFunction = () => {}

export const ConfigurableOptions = ({
  option,
  label = false,
  selected_option_uid = null,
  onOptionPress = emptyFunction,
}) => {
  if (option.attribute_code.includes("color")) {
    return (
      <div className="color-config">
        <div className="option-list row">
          {option.values
            .filter((ci) => size(ci.swatch_data) > 0)
            .map((citem) => (
              <div
                key={citem.uid}
                onClick={(e) => {
                  e.preventDefault()
                  onOptionPress(citem)
                }}>
                <span
                  className={`color-swatch ${
                    selected_option_uid == citem.uid ? "active" : ""
                  }`}
                  style={{
                    backgroundColor: get(citem, "swatch_data.value", ""),
                  }}>
                  {citem.swatch_data && citem.swatch_data.thumbnail ? (
                    <ImageRenderer
                      url={citem.swatch_data.thumbnail}
                      thumb={PLACEHOLDER}
                      minHeight={50}
                      className={`swatch-image `}
                    />
                  ) : (
                    ""
                  )}
                </span>

                {label ? <span className="label">{citem.label}</span> : ""}
              </div>
            ))}
        </div>
      </div>
    )
  }
  return <></>
}
