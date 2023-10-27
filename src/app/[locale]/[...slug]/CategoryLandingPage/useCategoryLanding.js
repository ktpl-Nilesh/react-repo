// import { useEffect, useState } from "react";
import get from "lodash/get";
// import { useSelector } from "react-redux";
// import { useLazyQuery } from "@apollo/client";
// import { useInView } from "react-intersection-observer";
import { GET_CATEGORY_LANDING_PAGE_DATA } from "./categoryLanding.gql";
// import { getIsUserLoggedIn } from "data/selectors/users.selectors";

export const useCategoryLanding = ({ category_uid }) => {
  const isLoggedIn = useSelector(getIsUserLoggedIn);
  const [categoryLandingData, setCategoryLandingPageData] = useState(null);
  const [blockList, setBlockList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 3;

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
    fallbackInView: true,
  });

  const [fetchCategoryLandingPageData, { loading: blockLoading, error }] =
    useLazyQuery(GET_CATEGORY_LANDING_PAGE_DATA, {
      context: { fetchOptions: { method: "POST" } },
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        let clpBlocks = get(
          data,
          "categories.items.0.category_landing_page_content.items",
          []
        );
        const shopByBrands = get(
          data,
          "categories.items.0.shop_by_brand.items",
          []
        );
        clpBlocks = clpBlocks.map((item) => {
          if (item.block_type === "brand_slider") {
            return {
              ...item,
              items: {
                brands: shopByBrands,
              },
            };
          }
          return item;
        });
        setCategoryLandingPageData(data);
        setBlockList([...blockList, ...clpBlocks]);
        setLoading(false);
        setLoadingMore(false);
      },
      onError: (err) => {
        setLoading(false);
        setLoadingMore(false);
      },
      errorPolicy: "all",
    });

  useEffect(() => {
    try {
      if (currentPage > 1) {
        setLoadingMore(true);
      }
      fetchCategoryLandingPageData({
        variables: {
          category_uid,
          currentPage,
          pageSize: PAGE_SIZE,
        },
      });
    } catch (e) {
    }
  }, [currentPage, category_uid]);

  useEffect(() => {
    if (loading || loadingMore) return;
    if (inView && !loadingMore) {
      const has_more = get(
        categoryLandingData,
        "categories.items.0.category_landing_page_content.page_info.has_more_pages",
        {}
      );
      if (has_more) {
        setCurrentPage(currentPage + 1);
      }
    }
  }, [inView, loadingMore, isLoggedIn, categoryLandingData]);

  return {
    categoryLandingData,
    blockList,
    loading,
    blockLoading,
    loadingMore,
    loadMoreRef: ref,
    error,
  };
};
