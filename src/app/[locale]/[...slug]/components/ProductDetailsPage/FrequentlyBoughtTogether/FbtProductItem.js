// import * as React from "react";
// import get from "lodash/get";
// // import { Controller, useFormContext } from "react-hook-form";
// import ProductConfigurableOptions from "../ProductConfigurableOptions";
// import { t } from "i18next";
// import { useState } from "react";
// import { useEffect } from "react";
// export const FbtProductItem = ({ product, pIndex }) => {
//   const {
//     control,
//     watch,
//     formState: { errors },
//   } = useFormContext();
//   const [showDetails, setShowDetails] = useState(false);
//   const selected_options = watch(`selected_options-${pIndex}`);
//   useEffect(() => {
//     if (selected_options && errors && errors[`selected_options-${pIndex}`]) {
//       setShowDetails(true);
//     }
//   }, [selected_options, errors]);

//   useEffect(() => {
//     if (watch(`fbt_products.${pIndex}`)) {
//       setShowDetails(true);
//     } else {
//       setShowDetails(false);
//     }
//   }, [watch(`fbt_products.${pIndex}`)]);

//   return (
//     <div className="fbt-product">
//       <div className="fbt-image">
//         <img
//           src={get(product, "thumbnail.url", "")}
//           alt={product.name}
//           height="250"
//           width="200"
//         ></img>
//       </div>
//       <div className="fbt-details">
//         <spna className="fbt-name">{product.name}</spna>
//       </div>
//       <div
//         className="show-details"
//         onClick={() => setShowDetails(!showDetails)}
//       >
//         {showDetails ? t("fbt.hideDetails") : t("fbt.showDetails")}
//         <div className="arrow-icon">up</div>
//       </div>
//       {!!product.configurable_options && showDetails ? (
//         <div className="pdp-content-extra-details">
//           {errors && errors[`selected_options-${pIndex}`] ? (
//             <div className="err-msg">
//               {errors[`selected_options-${pIndex}`].message}
//             </div>
//           ) : (
//             ""
//           )}
//           <Controller
//             control={control}
//             name={`selected_options-${pIndex}`}
//             defaultValue={product.configurable_options.map(() => "")}
//             rules={{
//               validate: (val) => {
//                 if (val.includes("") && watch(`fbt_products.${pIndex}`)) {
//                   return t("noti.pleaseSelectconfiguration");
//                 }

//                 return true;
//               },
//             }}
//             render={({ field }) => {
//               return (
//                 <ProductConfigurableOptions
//                   data={product.configurable_options}
//                   variants={product.variants}
//                   {...field}
//                   handleMedia={() => {}}
//                   watch={watch}
//                 />
//               );
//             }}
//           />
//         </div>
//       ) : null}
//     </div>
//   );
// };


import React from 'react'

const FbtProductItem = () => {
  return (
    <div>FbtProductItem</div>
  )
}

export default FbtProductItem