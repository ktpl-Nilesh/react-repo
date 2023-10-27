import * as React from "react"
import debounce from "lodash.debounce"
// import { useTranslation } from "react-i18next";
// import { useSearchBar } from "./searchBar.hooks"
// import { SearchResults } from "./SearchResults";
import { get, size, trim } from "lodash"
// import { useSelector } from "react-redux";
// import { getDisplayType } from "data/selectors/appState.selector";
// import { DISPLAY_TYPE } from "data/reducers/appState.reducer";
// import { useLocation, useNavigate } from "react-router";
// import { getSearchPageUrl } from "constants/url.constant";
// import { useDetectClickOutside } from "react-detect-click-outside";
import { disableBodyScroll } from "@utils/app.utils.js"
// import { useEffect } from "react";
import "./search.scss"
import { getI18n } from "@locales/server"

const HeaderSearchBar = async () => {
  let t = await getI18n()
  // let navigate = useNavigate();
  // const location = useLocation();
  // let displayType = useSelector(getDisplayType);
  // let { getSearchResults, data, loading, error } = useSearchBar();
  // let [showResults, setShowResults] = React.useState(false);
  // let [showMobileInput, setShowMobileInput] = React.useState(false);
  // let [searchText, setSearchText] = React.useState("");
  // let [misspellSearchText, setMisspellSearchText] = React.useState("");
  // let [isMisspellsEnable, showMisspellsBlock] = React.useState(false);

  // disable content scroll when search results are displayed
  // useEffect(() => {
  //   disableBodyScroll(!!showResults);
  // }, [showResults]);

  // const debouncedSearchResults = React.useCallback(
  //   debounce((queryText) => {
  //     if (queryText !== "" && queryText.length >= 2) {
  //       setMisspellSearchText(queryText);
  //       getSearchResults(queryText);
  //     }
  //   }, 300),
  //   []
  // );
  // const displayMobileInput = () => {
  //   setShowMobileInput(true);
  // };
  // const resetSearchBar = () => {
  //   setShowResults(false);
  //   setShowMobileInput(false);
  //   setSearchText("");
  //   showMisspellsBlock(false);
  // };

  // React.useEffect(() => {
  //   if (trim(searchText).length >= 2) {
  //     setShowResults(true);
  //   } else {
  //     setShowResults(false);
  //   }
  //   debouncedSearchResults(trim(searchText));
  // }, [searchText]);

  // // show error if failed to fetc search results
  // React.useEffect(() => {
  //   if (error) {
  //     setShowResults(true);
  //   }
  // }, [error]);

  // React.useEffect(() => {
  //   if (location.pathname) {
  //     if (!location.pathname.includes("catalogsearch")) {
  //       setSearchText("");
  //     }
  //   }
  // }, [location]);

  // // Checks and show misspell block
  // React.useEffect(() => {
  //   const misspells = get(data, "search.catalogsearch_fulltext.misspells", "");
  //   const isMisspellsEnable =
  //     !loading &&
  //     size(misspells) > 0 &&
  //     misspells.toLowerCase() !== misspellSearchText.toLowerCase();
  //   showMisspellsBlock(isMisspellsEnable);
  // }, [data, loading, misspellSearchText]);

  // handle onChange Envent
  const handleSearchInput = (e) => {
    // showMisspellsBlock(false);
    // setSearchText(e.target.value);
  }

  //handle onKeyUp event
  const handleSearchSubmit = (e) => {
    // e.preventDefault();
    // if (trim(searchText).length >= 2) {
    //   setShowResults(false);
    //   setShowMobileInput(false);
    //   navigate(`${getSearchPageUrl()}?q=${searchText}`);
    // }
  }

  // let brandList = get(data, "search.magento_catalog_attribute.items", [])
  // if (brandList === null) {
  //   brandList = []
  // }
  // let products = get(data, "search.catalogsearch_fulltext.items", [])
  // if (products === null) {
  //   products = []
  // }
  // let categories = get(data, "search.magento_catalog_category.items", [])
  // if (categories === null) {
  //   categories = []
  // }

  // const misspells = get(data, "search.catalogsearch_fulltext.misspells", "")

  // const clickRef = useDetectClickOutside({
  //   onTriggered: function () {
  //     resetSearchBar()
  //   },
  // })

  return (
    <div
      className="search-bar"
      // ref={clickRef}
    >
      <div
        className={`input-box 
      `}>
        <div
          className="icon"
          // onClick={displayMobileInput}
        >
          Search Icon
        </div>
        <form
        // onSubmit={handleSearchSubmit}
        >
          <input
            type="text"
            name="search"
            // value={searchText}
            placeholder={t("header.searchPlaceholder")}
            // onChange={handleSearchInput}
            // onFocus={() => {
            //   if (trim(searchText).length >= 2) {
            //     setShowResults(true)
            //   }
            // }}
          />
        </form>

        <a className="filter-by" href="#">
          {t("header.filterBy")}:
        </a>
        {/* {displayType !== DISPLAY_TYPE.LARGE ? (
          <div
            className="close-input"
            onClick={() => {
              setShowMobileInput(false)
              resetSearchBar()
            }}>
            {t("common.close")}
          </div>
        ) : (
          ""
        )} */}
      </div>
      {/* <div className="search-results">
        {showResults ? (
          <div>abc</div>
        ) : (
          // <SearchResults
          //   brandList={brandList}
          //   products={products}
          //   categoryList={categories}
          //   loading={loading}
          //   searchText={searchText}
          //   hidePopup={resetSearchBar}
          //   error={error}
          //   misspells={misspells}
          //   isMisspellsEnable={isMisspellsEnable}
          //   setSearchText={setSearchText}
          // />
          ""
        )}
      </div> */}
    </div>
  )
}

export default HeaderSearchBar
