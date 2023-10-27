import React from "react"
import size from "lodash/size"
import get from "lodash/get"
// import { Navigate } from "react-router"
// import { Helmet } from "react-helmet"

import Loader from "../../../../common/components/Loader"
// import { withScrollTop } from "routes/withScrollTop"
// import { PDPSchema } from "components/ProductDetailsPage/PDPSchema"
// import { getBaseURL, getHomePath } from "constants/url.constant"
// import useProduct from "./useProduct.hook"
import "./product-page.scss"
// import { useEffect } from "react"
// import loadable from "@loadable/component"
// import Skeleton from "react-loading-skeleton"
// import { isClientSide } from "utils/misc"
import { ProductDetails } from "../components/ProductDetailsPage/ProductDetails"
import { GET_PRODUCT_DETAILS } from "./productDetailsQuery.gql"
import { fetchGqlServer } from "@utils/data.utils"
// const ProductDetails = loadable(
//   () => import("components/ProductDetailsPage/ProductDetails"),
//   {
//     resolveComponent: (module) => module.ProductDetails,
//     fallback: (
//       <>
//         <Loader />
//         <Skeleton height="1200px" />
//       </>
//     ),
//   }
// )

async function getProductData({ sku }) {
  try {
    const { data } = await fetchGqlServer({
      query: GET_PRODUCT_DETAILS.loc?.source?.body,
      variables: { filter: { sku: { eq: sku } } },
      nextOptions: {
        revalidate: 60,
      },
    })
    return get(data, "products.items.0", {})
  } catch (err) {}
}

/**
 * Prodcut Details Page
 */
const PDPPage = async ({ routeData }) => {
  let {
    sku,
    name,
    meta_description,
    meta_title,
    meta_keyword,
    url_key,
    small_image,
    price_range,
  } = routeData

  // const reqURL = getBaseURL() + "/" + url_key
  const productData = await getProductData({ sku })
  // const { getProductInfo, productData, dataLoading, dataError, pdpExtraError } =
  //   useProduct({
  //     sku,
  //   })

  // useEffect(() => {
  //   getProductInfo()
  // }, [sku])

  // if (dataError || pdpExtraError) {
  //   throw new Error()
  // }

  return (
    <>
      {/* <Helmet>
        <title>{meta_title}</title>
        <meta name="title" content={meta_title} />
        <meta name="description" content={meta_description} />
        <meta name="keywords" content={meta_keyword} />
        <meta name="og:type" content="website" />
        <meta name="og:site_name" content="Hnak.com" />
        <meta name="og:url" content={reqURL} />
        <meta property="og:locale:locale" content="en_us" />
        <meta property="og:locale:alternate" content="ar_sa" />
        <meta name="og:title" content={meta_title} />
        <meta name="og:description" content={meta_description} />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="315" />
        <meta property="og:image" content={small_image.url} />
        <meta name="twitter:site" content="@HNAK" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:widgets:new-embed-design" content="on" />
        <meta name="twitter:widgets:csp" content="on" />
        <meta property="twitter:title" content={meta_title} />
        <meta property="twitter:description" content={meta_description} />
        <meta name="twitter:url" content={reqURL} />
        <meta name="twitter:app:name:iphone" content="HNAK" />
        <meta name="twitter:app:id:iphone" content="1484943691" />
        <meta name="twitter:app:name:googleplay" content="HNAK" />
        <meta name="twitter:app:id:googleplay" content="com.hnak" />
        <meta name="twitter:creator" content="@Hnak" />
        <meta name="twitter:domain" content="Hnak.com" />
        <meta
          property="al:ios:url"
          content="https://apps.apple.com/us/app/hnak-online-shopping-in-saudi/id1484943691"
        />
        <meta property="al:ios:app_store_id" content="1484943691" />
        <meta property="al:ios:app_name" content="Hnak" />
        <meta
          property="al:android:url"
          content="https://play.google.com/store/apps/details?id=com.hnak&hl=en_IN&gl=US&pli=1"
        />
        <meta property="al:android:package" content="com.hnak" />
        <meta property="al:android:app_name" content="Hnak" />
      </Helmet>
      <PDPSchema
        name={name}
        description={meta_description}
        url={reqURL}
        image={get(small_image, "url", "")}
        price={get(price_range, "minimum_price.final_price", 0)}
        sku={sku}
      />
      {!productData ? (
        <>
          <Loader />
          <Skeleton height="1200px" />
        </>
      ) : !dataLoading && productData && !size(productData) ? (
        <Navigate to={getHomePath()} replace />
      ) : isClientSide() ? ( */}

      <ProductDetails productData={productData} />

      {/* ) : (
         ""
      )}*/}
    </>
  )
}

export default PDPPage
