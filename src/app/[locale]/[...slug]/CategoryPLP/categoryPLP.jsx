import * as React from "react"
import { ProductList } from "../components/ProductList"
// import { Helmet } from "react-helmet";
// import { useSelector } from "react-redux"
// import { getRequestUrl } from "data/selectors/storeConfig.selector"
// import { useQuery } from "@apollo/client"
import get from "lodash/get"

// import { GET_SORT_FIELDS } from "./categoryPLP.gql"
import {
  getCategoryPLPData,
  getCategoryTree,
  getProductFilterData,
  getProductListData,
  getCategoryData,
  getAvailableStore,
} from "./categoryPLP.services"
import Clienti18nWrapper from "../../components/Clienti18nWrapper"
import { mergeFilters } from "@utils/data.utils"
import { getCurrentLocale } from "@locales/server"

const CategoryPLP = async ({ routeData, searchParams }) => {
  const pageSize = searchParams?.per_page
  const currentPage = searchParams?.page || 1

  //query for available Store
  const availableStore = await getAvailableStore()
  const currLang = getCurrentLocale()
  const currentStore = availableStore?.availableStores?.filter((store) =>
    store.url_store_code.includes(currLang)
  )

  const { uid, meta_title, meta_description, meta_keywords } = routeData

  // query for categories of PLP
  const plpPageCategories = await getCategoryPLPData({
    filter: { category_uid: { eq: uid } },
  })
  const plpdefaultSort = get(
    plpPageCategories,
    "products.sort_fields.default",
    undefined
  )
  let sortBy = plpdefaultSort
  if (!sortBy) {
    sortBy = get(currentStore[0], "catalog_default_sort_by")
  }
  let defaultSort = {}
  if (sortBy) {
    defaultSort = { [sortBy]: sortBy == "price" ? "DESC" : "ASC" }
  }
  const filter = { category_uid: { eq: uid } }

  // Query for Product List Data
  let plpData = await getProductListData({
    page: currentPage,
    page_size: pageSize,
    // sort: defaultSort,
    filter: { ...filter },
  })
  let filterProductData = await getProductFilterData({
    filter: { ...filter },
  })
  const availableFilters = mergeFilters(
    [],
    get(filterProductData, "products.aggregations", [])
  )

  //logic for left side nav menu data
  let categoryInfo = await getCategoryData({ category_uid: uid })
  let currCategoryData = get(categoryInfo, "categories.items.0", null)
  let CategoryNavMenu_uid = get(
    currCategoryData,
    "breadcrumbs.0.category_uid",
    currCategoryData.uid
  )

  // Query for Category Tree Data
  const getCategoryTreeData = await getCategoryTree({
    category_uid: CategoryNavMenu_uid,
  })
  const categoryNavMenu = get(getCategoryTreeData, "categories.items", [])

  return (
    <div className="category-page">
      {/* <Helmet>
        <title>{meta_title}</title>
        <meta name="title" content={meta_title} />
        <meta name="description" content={meta_description} />
        <meta name="keywords" content={meta_keywords}></meta>
        <meta name="og:type" content="website" />
        <meta name="og:site_name" content="Hnak.com" />
        <meta name="og:url" content={reqURL} />
        <meta property="og:locale:locale" content="en_us" />
        <meta property="og:locale:alternate" content="ar_sa" />
        <meta name="og:title" content={meta_title} />
        <meta name="og:description" content={meta_description} />
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
      </Helmet> */}
      {/* {sortLoading ? <Loader /> : ""} */}
      <Clienti18nWrapper>
        <ProductList
          type="category"
          categoryPLPData={plpData}
          availableFilters={availableFilters}
          filter={filter}
          categoryNavMenu={categoryNavMenu}
          categoryInfo={categoryInfo}
          storeConfig={currentStore[0]}
        />
      </Clienti18nWrapper>
    </div>
  )
}

export default CategoryPLP
