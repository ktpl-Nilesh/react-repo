import Loader from "../../../../common/components/Loader"
import * as React from "react"
// import { Helmet } from "react-helmet";
import get from "lodash/get"
import ConfiguratorBlocks from "../../components/ConfiguratorBlocks"
// import { helmetJsonLdProp } from "react-schemaorg";
// import { getBaseURL } from "constants/url.constant"
// import { useBreadcrumbs } from "components/common/Breadcrumbs/useBreadcrumbs"
// import { getRequestUrl } from "data/selectors/storeConfig.selector";
// import { useSelector } from "react-redux";
// import { useCategoryLanding } from "./useCategoryLanding"
import { fetchGqlServer } from "@utils/data.utils"
import { GET_CATEGORY_LANDING_PAGE_DATA } from "./categoryLanding.gql"
// import LoadmoreLoader from "components/common/LoadmoreLoader"
// import { getIsUserLoggedIn } from "data/selectors/users.selectors";
// import {isClientSide} from "utils/misc";

async function fetchCategoryBlocks({ category_uid }) {
  const { data } = await fetchGqlServer({
    query: GET_CATEGORY_LANDING_PAGE_DATA.loc?.source?.body,
    variables: {
      category_uid,
      pageSize: 50,
      currentPage: 1,
    },
  })
  let clpBlocks = get(
    data,
    "categories.items.0.category_landing_page_content.items",
    []
  )
  const shopByBrands = get(data, "categories.items.0.shop_by_brand.items", [])
  clpBlocks = clpBlocks.map((item) => {
    if (item.block_type === "brand_slider") {
      return {
        ...item,
        items: {
          brands: shopByBrands,
        },
      }
    }
    return item
  })

  return [...clpBlocks]
}

const CategoryLanding = async ({ routeData }) => {
  // const reqURL = useSelector(getRequestUrl);
  // const isLoggedIn = useSelector(getIsUserLoggedIn);
  // const talonProps = useBreadcrumbs({ categoryId: routeData.id })

  // const { hasError, isLoading, normalizedData } = talonProps
  const { uid, meta_title, meta_description, meta_keywords, url_path, image } =
    routeData

  const blockList = await fetchCategoryBlocks({ category_uid: uid })

  // const {
  //   categoryLandingData,
  //   blockList,
  //   loading,
  //   blockLoading,
  //   loadingMore,
  //   loadMoreRef,
  //   error,
  // } = useCategoryLanding({ category_uid: uid })

  // if (error) {
  //   return new Error(error)
  // }

  // const sectionList = React.useMemo(() => {
  // const pageInfo = get(
  //   categoryLandingData,
  //   "categories.items.0.category_landing_page_content.page_info",
  //   {}
  // )
  // const has_more_pages = get(pageInfo, "has_more_pages", false)
  return (
    <>
      {/* hello from the category landing page */}
      <ConfiguratorBlocks blockList={blockList} />
      {/* {!loadingMore && has_more_pages ? (
          <div
          // ref={loadMoreRef}
          >
            loader
            { <LoadmoreLoader position="relative" /> }
          </div>
        ) : blockLoading ? (
          <div
          // ref={loadMoreRef}
          >
            loader
            { <LoadmoreLoader position="relative" /> }
          </div>
        ) : (
          ""
        )} */}
    </>
  )
  // }, [categoryLandingData, blockList, isLoggedIn, loadingMore, loadMoreRef])
  // if (loading || (!blockList.length && blockLoading)) return <Loader />
  // return (
  //   <div className="category-landing page">
  //     {isLoading || hasError ? (
  //       ""
  //     ) : isClientSide() ? (
  //       <Helmet
  //         script={[
  //           helmetJsonLdProp({
  //             "@context": "https://schema.org/",
  //             "@type": "BreadcrumbList",
  //             itemListElement: [
  //               {
  //                 "@type": "ListItem",
  //                 position: 1,
  //                 name: "Home",
  //                 item: getBaseURL(),
  //               },
  //             ].concat(
  //               normalizedData.map(({ text, path }, idx) => {
  //                 return {
  //                   "@type": "ListItem",
  //                   position: idx + 2,
  //                   name: text,
  //                   item: getBaseURL() + path,
  //                 }
  //               })
  //             ),
  //           }),
  //         ]}></Helmet>
  //     ) : (
  //       ""
  //     )}
  //     <Helmet>
  //       <title>{meta_title}</title>
  //       <meta name="title" content={meta_title} />
  //       <meta name="description" content={meta_description} />
  //       <meta name="keywords" content={meta_keywords}></meta>
  //       <meta name="og:type" content="website" />
  //       <meta name="og:site_name" content="Hnak.com" />
  //       <meta name="og:url" content={reqURL} />
  //       <meta property="og:locale:locale" content="en_us" />
  //       <meta property="og:locale:alternate" content="ar_sa" />
  //       <meta name="og:title" content={meta_title} />
  //       <meta name="og:description" content={meta_description} />
  //       <meta property="og:image:width" content="600" />
  //       <meta property="og:image:height" content="315" />
  //       <meta property="og:image" content={image} />
  //       <meta name="twitter:site" content="@HNAK" />
  //       <meta name="twitter:card" content="summary" />
  //       <meta name="twitter:widgets:new-embed-design" content="on" />
  //       <meta name="twitter:widgets:csp" content="on" />
  //       <meta property="twitter:title" content={meta_title} />
  //       <meta property="twitter:description" content={meta_description} />
  //       <meta name="twitter:url" content={reqURL} />
  //       <meta name="twitter:app:name:iphone" content="HNAK" />
  //       <meta name="twitter:app:id:iphone" content="1484943691" />
  //       <meta name="twitter:app:name:googleplay" content="HNAK" />
  //       <meta name="twitter:app:id:googleplay" content="com.hnak" />
  //       <meta name="twitter:creator" content="@Hnak" />
  //       <meta name="twitter:domain" content="Hnak.com" />
  //       <meta
  //         property="al:ios:url"
  //         content="https://apps.apple.com/us/app/hnak-online-shopping-in-saudi/id1484943691"
  //       />
  //       <meta property="al:ios:app_store_id" content="1484943691" />
  //       <meta property="al:ios:app_name" content="Hnak" />
  //       <meta
  //         property="al:android:url"
  //         content="https://play.google.com/store/apps/details?id=com.hnak&hl=en_IN&gl=US&pli=1"
  //       />
  //       <meta property="al:android:package" content="com.hnak" />
  //       <meta property="al:android:app_name" content="Hnak" />
  //     </Helmet>
  //     <div className="main home-wrapper">{sectionList}</div>
  //   </div>
  // )
}

export default CategoryLanding
