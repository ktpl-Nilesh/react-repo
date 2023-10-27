"use client"
import React, { useEffect, useState } from "react"
import get from "lodash/get"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
const useProductListData = (
  categoryInfo,
  categoryPLPData,
  productView,
  paginationType,
  storeConfig
) => {
  const router = useRouter()
  const pathname = usePathname()
  let [metaInfo, setMetaInfo] = useState(null)
  let [pageTitle, setPageTitle] = useState(null)
  let [activeKey, setActiveKey] = useState(null)
  let [products, setProducts] = useState([])
  let defaultPageSize =
    productView == "grid"
      ? get(storeConfig, "grid_per_page")
      : get(storeConfig, "list_per_page")
  let searchParams = useSearchParams()

  let [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1)
  let [pageSize, setPageSize] = useState(
    searchParams.get("per_page") || defaultPageSize
  )

  // manage breadcrumbs and acctive and open category left  menu
  useEffect(() => {
    if (categoryInfo) {
      let currCategoryData = get(categoryInfo, "categories.items.0", null)
      if (currCategoryData) {
        setPageTitle(currCategoryData.name)
        setMetaInfo({
          meta_title: currCategoryData.meta_title || currCategoryData.name,
          meta_description: currCategoryData.meta_description,
          meta_keywords: currCategoryData.meta_keywords,
        })
        if (currCategoryData && currCategoryData.breadcrumbs) {
          let level3Breadcrumb = currCategoryData.breadcrumbs.find(
            (breadcrumb) => breadcrumb.category_level === 3
          )
          if (level3Breadcrumb) {
            setActiveKey(level3Breadcrumb.category_uid)
          }
        }
      }
    }
  }, [categoryInfo])

  useEffect(() => {
    if (categoryPLPData) {
      // console.log(categoryPLPData)
      let page_info = get(categoryPLPData, "products.page_info", null)
      if (page_info && page_info.page_size !== pageSize) {
        setPageSize(page_info.page_size)
        // updateURLParams();
      }
      if (paginationType === "pages" || products.length === 0) {
        setProducts(
          get(categoryPLPData, "products.items", []).filter((p) => p !== null)
        )
      } else {
        if (page_info && page_info.current_page === 1) {
          setProducts(
            get(categoryPLPData, "products.items", []).filter((p) => p !== null)
          )
        }
        if (page_info && page_info.current_page > 1) {
          // updateURLParams(page_info);
        }
      }
    }
  }, [categoryPLPData])

  // Page size Handler
  const handlePageSize = (pageSize) => {
    setCurrentPage(1)
    setPageSize(pageSize)
    const searchQuery = `per_page=${pageSize}`
    const query = pageSize ? `?${searchQuery}` : ""

    router.push(`${pathname}${query}`)
  }

  // function updateURLParams(pageInfo) {
  //   let page_info;
  //   if (pageInfo) {
  //     page_info = { ...pageInfo };
  //   } else {
  //     page_info = get(categoryPLPData, "products.page_info", null);
  //   }
  //   // console.log(page_info, filter);
  //   if (page_info) {
  //     setCurrentPage(page_info.current_page);
  //   }
  //   if (type == "catalogsearch") {
  //     if (
  //       page_info &&
  //       page_info.current_page === 1 &&
  //       !size(filter) &&
  //       !size(sort) &&
  //       !searchParams.get("q")
  //     ) {
  //       setSearchParams({});
  //     } else {
  //       setSearchParams({
  //         q: searchParams.get("q"),
  //         page: get(page_info, "current_page", currentPage),
  //         sort: size(sort) > 0 ? keys(sort)[0] + "_" + sort[keys(sort)[0]] : "",
  //         per_page: get(page_info, "page_size", pageSize),
  //         filters: size(filter) > 0 ? JSON.stringify(filter) : "",
  //       });
  //     }
  //   } else {
  //     if (
  //       page_info &&
  //       page_info.current_page === 1 &&
  //       !size(filter) &&
  //       !size(sort)
  //     ) {
  //       setSearchParams({});
  //     } else {
  //       setSearchParams({
  //         page: get(page_info, "current_page", currentPage),
  //         sort: size(sort) > 0 ? keys(sort)[0] + "_" + sort[keys(sort)[0]] : "",
  //         per_page: get(page_info, "page_size", pageSize),
  //         filters: size(filter) > 0 ? JSON.stringify(filter) : "",
  //       });
  //     }
  //   }
  // }

  // Function to handle pagination
  const changePage = (page, page_info) => {
    if (page > 0 && page <= page_info.total_pages) {
      // Parse the existing query parameters
      const queryParams = searchParams.toString()
        ? "?" + searchParams.toString()
        : ""

      // Check if the page is 1, and if so, remove the 'page' query parameter
      if (page === 1) {
        const updatedQueryParams = new URLSearchParams(queryParams)
        updatedQueryParams.delete("page")
        const newQueryString = updatedQueryParams.toString()

        // Push the new URL with the updated query string
        router.push(`${pathname}${newQueryString ? "?" + newQueryString : ""}`)
      } else {
        // Update the page query parameter
        const updatedQueryParams = new URLSearchParams(queryParams)
        updatedQueryParams.set("page", page.toString())
        const newQueryString = updatedQueryParams.toString()

        // Push the new URL with the updated query string
        router.push(`${pathname}?${newQueryString}`)
      }
    }
  }

  return {
    metaInfo,
    activeKey,
    pageTitle,
    products,
    page_info: get(categoryPLPData, "products.page_info", {
      current_page: 1,
      total_pages: 1,
      page_size: defaultPageSize,
    }),
    handlePageSize,
    changePage,
  }
}

export default useProductListData
