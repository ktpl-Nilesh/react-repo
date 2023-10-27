import CMSBlock from "../../../../../common/components/CMSBlock"
// import { t } from "i18next";
import { get } from "lodash"
import * as React from "react"
// import { getI18n } from "@locales/server"
import { getI18n } from "@locales/server"

export const ProductFeatures = async({
  features,
  configurable_options,
  selectedOptVariants,
  selected_options,
}) => {
  // t;
  const t =await getI18n() 
  let selectedAttributes = selected_options
    .map((sopt) =>
      get(selectedOptVariants, "0.attributes", []).find(
        (vopt) => vopt.uid === sopt
      )
    )
    .filter((s) => !!s)
  selectedAttributes = selectedAttributes
    .map((aopt) => {
      return configurable_options.find(
        (copt) => copt.attribute_code === aopt.code
      )
    })
    .filter((s) => !!s)

  return (
    <div className="feature-pdp">
      <h2>{t("pdp.featuresTitle")}</h2>
      <div className="feature-data-content wrap">
        <table>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index}>
                <th>
                  <strong>{feature.group_label}</strong>
                </th>
                <td>
                  {feature.attributes.map((attr) => (
                    <span key={attr.code}>
                      <b>{`${attr.label}: `}</b>
                      <CMSBlock
                        html={attr.value
                          .toString()
                          .replace(/&lt;/g, "<")
                          .replace(/&gt;/g, ">")}
                      />
                    </span>
                  ))}
                </td>
              </tr>
            ))}
            {selectedAttributes.length > 0 ? (
              <tr>
                <th>
                  <strong>Product Variant</strong>
                </th>
                <td>
                  {selectedAttributes.map((sAttr) => (
                    <span key={sAttr.attribute_code}>
                      <b>{`${sAttr.label}: `}</b>
                      {
                        sAttr.values.find((v) =>
                          selected_options.includes(v.uid)
                        ).label
                      }
                    </span>
                  ))}
                </td>
              </tr>
            ) : (
              ""
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
