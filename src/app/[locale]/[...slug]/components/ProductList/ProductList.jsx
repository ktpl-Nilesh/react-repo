"use client"
import React, { useState ,useMemo} from "react"
// import { useSelector, useDispatch } from "react-redux";
// import { Helmet } from "react-helmet";
import { useI18n } from "@locales/client"
// import { useLocation } from "react-router";
import { Link } from "next/link"

// import loadable from "@loadable/component";
import Skeleton from "react-loading-skeleton"
// import InfiniteScroll from "react-infinite-scroller";

// import { Pagination } from "components/common/ListPagination/ListPagination";
// import { CMSBlock } from "../../../../../common/components/CMSBlock"
// import SearchNotFound from "components/SearchBar/SearchNotFound";
// import { ProductFilters } from "../common/ProductListFilters/ProductListFilters";

// import { useProductListData } from "./PLP.hooks";
import { DISPLAY_TYPE } from "@utils/constant"
// import { clearData } from "data/reducers/plp.reducer";
// import { getAvailableFilters } from "data/selectors/plp.selector";

// import ProductListLoader from "./ProductListLoader";

import { PageSizeDropDown } from "./PageSizeDropDown";
// import { SortProductResults } from "./SortProductResults";
// import { withScrollTop } from "routes/withScrollTop";
// import { getHomePath } from "constants/url.constant";

import "./product-list.scss"
// import { getCurrentStoreConfig } from "data/selectors/storeConfig.selector";
import get from "lodash/get"
import size from "lodash/size"
import useProductListData from "./PLP.hooks"
// import { getCategoryPLPData } from "../../CategoryPLP/categoryPLP.services"
// import ShopByBrandOnPLP from "./ShopByBrandOnPLP";
// import ShopByCategory from "./ShopByCategory";
// import { memoDeep } from "react-optimization-tools";
// import { disableBodyScroll, setHeaderSticky } from "utils/utils";
// import { forceVisible } from "react-lazyload";

// const ProductListGrid = loadable(() =>
//   import("components/common/ProductItemList/ProductListGrid")
// );
// const SelectedFiltersCloud = loadable(() =>
//   import("components/common/ProductListFilters/SelectedFiltersCloud")
// );
// const CategoryBreadcrumbs = loadable(() =>
//   import("components/common/CategoryBreadcrumbs/CategoryBreadcrumbs")
// );
import CategoryNavMenu from "./CategoryNavMenu"
import ProductListGrid from "../../../../../common/components/ProductItemList/ProductListGrid"
import { ProductFilters } from "../ProductListFilters"
import CategoryBreadcrumbs from '../CategoryBreadcrumbs/CategoryBreadcrumbs';
import { usePathname } from 'next/navigation'
import {getHomePath} from "@utils/app.utils"
import { Pagination } from '../ListPagination/ListPagination';
/*
  parent component : CategoryPLP.jsx
*/
const ProductList = ({
  categoryPLPData,
  type,
  availableFilters,
  filter,
  categoryInfo,
  categoryNavMenu,
  brandInfo,
  title,
  storeConfig
}) => {
  let displayType = DISPLAY_TYPE.LARGE
  let t = useI18n()
  const pathname = usePathname()
  let [productView, setProductView] = useState("grid")
  let [paginationType, setPaginationType] = useState("pages");

  let [pageSizeValues, setPageSizeValues] = useState(
    get(storeConfig, "grid_per_page_values", "").split(",")
  );
  let [showPageSize, setShowPageSize] = useState(false);
  let { metaInfo, pageTitle, activeKey, products ,page_info,handlePageSize,changePage} = useProductListData(
    categoryInfo,
    categoryPLPData,
    productView,
    paginationType,
    storeConfig
  )
  let categoryData = get(categoryInfo, "categories.items.0", null)
  let list_title = pageTitle || title
  if (!categoryData) {
    list_title = title || ""
  }

  // const { products } = useProductListData(filter, search, plpdefaultSort)
  // console.log(products,"thisssdasflsdflsdl");
  // const dispatch = useDispatch();
  // const location = useLocation();
  // const storeConfig = useSelector(getCurrentStoreConfig);

  // let [paginationType, setPaginationType] = useState("pages");
  // let [productView, setProductView] = useState("grid");
  // let [pageSizeValues, setPageSizeValues] = useState(
  // get(storeConfig, "grid_per_page_values", "").split(",")
  // );
  // let [showSortDrawer, setShowSortDrawer] = useState(false);
  // let [showoDeptSidebar, setShowDeptSidebar] = useState(false);
  // let [showPageSize, setShowPageSize] = React.useState(false);
  // let [showSortOptions, setShowSortOptions] = React.useState(false);

  // useEffect(() => {
  //   if (showoDeptSidebar) {
  //     setHeaderSticky(false);
  //     disableBodyScroll(true)
  //     forceVisible()
  //   } else {
  //     setHeaderSticky(true);
  //     disableBodyScroll(false)
  //   }
  // }, [showoDeptSidebar]);
  // useEffect(() => {
  //   if (productView == "grid") {
  //     setPageSizeValues(
  //       get(storeConfig, "grid_per_page_values", "").split(",")
  //     );
  //   } else {
  //     setPageSizeValues(
  //       get(storeConfig, "list_per_page_values", "").split(",")
  //     );
  //   }
  // }, [productView]);

  // useEffect(() => {
  //   if (displayType && displayType !== DISPLAY_TYPE.LARGE) {
  //     setPaginationType("scroll");
  //   }
  // }, [displayType]);

  // let {
  //   categoryData,
  //   products,
  //   filtersLoading,
  //   availableFilters,
  //   // shopByCatList,
  //   // shopByCatLoading,
  //   categoryInfoLoading,
  //   pageTitle,
  //   sort_options,
  //   defaultSort,
  //   page_info,
  //   categoryNavMenu,
  //   metaInfo,
  //   loading,
  //   currFilters,
  //   activeKey,
  //   productsErrror,
  //   infiLoading,
  //   loadMoreOnScroll,
  //   changePage,
  //   handleSort,
  //   handlePageSize,
  //   findSelectedFilterOptions,
  //   handleFilter,
  //   clearAllFilters,
  // } = useProductListData(
  //   filter,
  //   search,
  //   type,
  //   paginationType,
  //   productView,
  //   plpdefaultSort
  // );

  // useEffect(() => {
  //   // clear store on unmount
  //   return () => dispatch(clearData());
  // }, []);

  // let list_title = pageTitle || title;
  // if (!categoryData) {
  //   list_title = title || "";
  // }

  // const maybeRenderCategoryBanner = useMemo(() => {
  //   if (
  //     categoryData &&
  //     categoryData.pwa_category_banner &&
  //     type == "category"
  //   ) {
  //     return (
  //       <div className="plp-top-banner">
  //         <img
  //           src={categoryData.pwa_category_banner || ""}
  //           alt="category banner"
  //           width="100%"
  //           height="100%"
  //         />
  //       </div>
  //     );
  //   }

  //   return null;
  // }, [categoryData]);

  // const maybeRenderBrandTopStaticBlock = useMemo(() => {
  //   if (type == "brand" && brandInfo.top_static_block) {
  //     return (
  //       <div className="brand-banner plp-top-banner">
  //         <CMSBlock
  //           html={brandInfo.top_static_block
  //             .toString()
  //             .replace(/&lt;/g, "<")
  //             .replace(/&gt;/g, ">")}
  //         />
  //       </div>
  //     );
  //   }
  //   return null;
  // }, [brandInfo, type]);

  // const maybeRenderPromotionBlock = useMemo(() => {
  //   if (type == "category" && categoryData && categoryData.promotion_block) {
  //     return (
  //       <div className="promo-block">
  //         <CMSBlock
  //           html={categoryData.promotion_block
  //             .toString()
  //             .replace(/&lt;/g, "<")
  //             .replace(/&gt;/g, ">")}
  //         />
  //       </div>
  //     );
  //   }
  //   return null;
  // }, [type, categoryData]);

  // const maybeRenderBrandStaticBlock = useMemo(() => {
  //   if (type === "brand" && brandInfo.static_block) {
  //     return (
  //       <CMSBlock
  //         html={brandInfo.static_block
  //           .toString()
  //           .replace(/&lt;/g, "<")
  //           .replace(/&gt;/g, ">")}
  //       />
  //     );
  //   }
  //   return null;
  // }, [type, brandInfo]);

  const maybeRenderBreadcrumb = useMemo(() => {
    if (type === "category" && categoryData) {
      return <CategoryBreadcrumbs categoryData={categoryData} />;
    } else {
      return (
        <div className="category-breadcrumbs">
          <ul className="breadcrumb-list clearfix">
            <li className="br-item">
              <Link href={getHomePath()}>{t("common.home")}</Link>
            </li>
            <li className="br-item active">
              <Link href={pathname}>{title}</Link>
            </li>
          </ul>
        </div>
      );
    }
  }, [pathname, title, categoryData, type]);
  if (page_info.total_pages === 0 && type == "catalogsearch") {
    // return <SearchNotFound />;
  }
  const showoDeptSidebar = false
  const filtersLoading = false
  return (
    <div className={`product-category container ${type}`}>
      <div className="row">
        {/* {maybeRenderCategoryBanner} */}
        {/* {maybeRenderBrandTopStaticBlock} */}
      </div>
      <div className="row">
        <div
          className={`category-sidebar ${showoDeptSidebar ? "show" : ""} ${
            displayType !== DISPLAY_TYPE.LARGE ? "mobile" : ""
          }`}
          id="category_plp_sidebar">
          <div className="category-nav">
            <div className="row aic jcsb">
              <h2 className="dept">{t("plp.dept")}</h2>
              {displayType !== DISPLAY_TYPE.LARGE ? (
                <span
                  className="close-btn"
                  // onClick={() => setShowDeptSidebar(false)}
                >
                  {t("common.close")}
                </span>
              ) : null}
            </div>
            <CategoryNavMenu
              navMenu={type === "category" ? categoryNavMenu : brandInfo}
              activeKey={type === "category" ? activeKey : ""}
              curr_uid={type === "category" ? filter.category_uid.eq : ""}
              type={type}
            />
          </div>
          {filtersLoading ? (
            <Skeleton height="100%" position="relative" />
          ) : (
            <ProductFilters
              aggregations={availableFilters || []}
              // onFilterChange={handleFilter}
              filters={filter}
              // currFilters={currFilters}
              // clearAll={clearAllFilters}
              // filterExclude={filterExclude}
              // findSelectedFilterOptions={findSelectedFilterOptions}
            />
          )}
          {/* {maybeRenderPromotionBlock} */}
          {/* {maybeRenderBrandStaticBlock} */}
        </div>
        <div className="category-pl">
          {products?.length === 0 ? (
            <>
              {/* {productsErrror ? (
                <p className="message error">{t("wentWrong.title")}</p>
              ) : (
                <div></div>
                <ProductListLoader view={productView} />
              )} */}
            </>
          ) : (
            <>
              {maybeRenderBreadcrumb}
              <div className="row jcsb">
                <h1 className="category-name">{list_title}</h1>
              </div>
              {/* && displayType === DISPLAY_TYPE.LARGE */}
              {type === "brand" ? (
                <div className="shop-by-brand">
                  {/* <ShopByCategory
                    gridItems={
                      brandInfo.feature_categories
                        ? get(brandInfo, "feature_categories", [])
                        : []
                    }
                    filter={filter}
                  /> */}
                </div>
              ) : (
                ""
              )}
              {type === "category" ? (
                <div className="shop-by-brand">
                  {/* <ShopByBrandOnPLP
                    category_uid={filter.category_uid.eq}
                    filterList={availableFilters}
                    currFilters={currFilters}
                    handleFilter={handleFilter}
                    filtersLoading={filtersLoading}
                  /> */}
                </div>
              ) : null}
              <div style={{ position: "relative" }}>
                <div className="plp-topbar row jcsb">
                  {displayType !== DISPLAY_TYPE.LARGE ? (
                    <div>
                      <div
                        className="filter-by mobile-btn jcsb"
                        onClick={setShowDeptSidebar}>
                        <span className="bars-icon">
                          <svg viewBox="0 0 16 12" fill="none">
                            <rect width="16" height="2" rx="1" />
                            <rect y="5" width="16" height="2" rx="1" />
                            <rect y="10" width="16" height="2" rx="1" />
                          </svg>
                        </span>
                        <span className="label">{t("header.filterBy")}</span>
                      </div>
                    </div>
                  ) : null}

                  {/* <SortProductResults
                    onSortChange={handleSort}
                    sortOptions={sort_options}
                    setShowDrawer={setShowSortDrawer}
                    showDrawer={showSortDrawer}
                    showDropDown={showSortOptions}
                    setShowDropDown={setShowSortOptions}
                    defaultSort={defaultSort}
                  /> */}
                  <div className="top-right row aic">
                    <PageSizeDropDown
                      onPazeSizeChange={handlePageSize}
                      pageSizeValues={pageSizeValues}
                      showDropDown={showPageSize}
                      setShowDropDown={setShowPageSize}
                    />
                    <div className="view-switch row aic">
                      <label>{t("plp.viewBy")}:</label>
                      <div
                        onClick={() => setProductView("grid")}
                        className={`grid-view ${
                          productView === "grid" ? "active" : ""
                        }`}>
                        Grid View
                      </div>
                      <div
                        onClick={() => setProductView("list")}
                        className={`list-view ${
                          productView === "list" ? "active" : ""
                        }`}>
                        {" "}
                        List View
                      </div>
                    </div>
                  </div>
                </div>
                {displayType !== DISPLAY_TYPE.LARGE ? (
                  <div></div>
                ) : // <SelectedFiltersCloud
                //   availableFilters={availableFilters}
                //   findSelectedFilterOptions={findSelectedFilterOptions}
                //   currFilters={currFilters}
                //   filter={filter}
                //   clearAllFilters={clearAllFilters}
                //   handleFilter={handleFilter}
                //   filterExclude={filterExclude}
                // />
                null}
                {products?.length > 0 ? (
                  <>
                    <div>
                      <>
                        {products?.length > 0 ? (
                          <>
                            <ProductListGrid
                              products={products}
                              view={productView}
                              type="grid"
                              description
                            />
                          </>
                        ) : (
                          <>
                            <ProductListGrid
                              products={products}
                              view={productView}
                              type="grid"
                              description
                            />
                          </>
                        )}
                      </>
                    </div>
                    {page_info && page_info.total_pages > 1 ? (
                      <div className="cat-pagination-bottom row jcfe">
                        <Pagination
                          page_info={page_info}
                          changePage={changePage}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <div className="no-product-results">
                    <p>{t("plp.noProductsMessage")}</p>
                  </div>
                )}
                {displayType !== DISPLAY_TYPE.LARGE ? (
                  <div className="bottom-fixed row">
                    <div className="row options">
                      <div
                        className="option"
                        // onClick={() => {
                        //   {
                        //     setShowSortDrawer(false);
                        //     setShowDeptSidebar(!showoDeptSidebar);
                        //   }
                        // }}
                      >
                        <span className="filters-icon">
                          <img
                            src="/assets/images/filters.svg"
                            width="12"
                            height="10"
                            alt="filter"
                          />
                        </span>
                        {t("plp.filters")}
                      </div>
                      <div
                        className="option"
                        // onClick={() => {
                        //   setShowSortDrawer(!showSortDrawer);
                        //   setShowDeptSidebar(false);
                        // }}
                      >
                        <span className="sortby-icon">
                          <img
                            src="/assets/images/sort-by.svg"
                            width="11"
                            height="11"
                            alt="sort by"
                          />
                        </span>
                        {t("plp.sortBy")}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default (ProductList)
