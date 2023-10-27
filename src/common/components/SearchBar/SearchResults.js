import * as React from "react";
import { useTranslation } from "react-i18next";
import { SearchBrands } from "./SearchBrands";
import { SearchProducts } from "./SearchProducts";
import { SearchCategories } from "./SearchCategories";
import MisspellsList from "./MisspellsList";

export const SearchResults = ({
  brandList,
  products,
  categoryList,
  loading,
  searchText,
  hidePopup,
  error,
  misspells,
  isMisspellsEnable,
  setSearchText,
}) => {
  let { t } = useTranslation();
  return (
    <>
      <div className="search-popup fancy-scroll">
        {error ? (
          <p className="message error search-failed">{t("wentWrong.title")}</p>
        ) : (
          <>
            {isMisspellsEnable ? (
              <div className="top wrong-key-search">
                <MisspellsList
                  misspells={misspells}
                  setSearchText={setSearchText}
                />
              </div>
            ) : (
              <>
                <div className="left fancy-scroll">
                  <SearchCategories
                    categoryList={categoryList}
                    searchText={searchText}
                    hidePopup={hidePopup}
                  />
                </div>
                <div className="right fancy-scroll">
                  <div className="Search-brands">
                    <h3>{t("searchResults.brandLabel")}</h3>
                    {loading ? (
                      <div>{t("loading")}</div>
                    ) : (
                      <div className="search-brands-inner">
                        <SearchBrands
                          brands={brandList}
                          hidePopup={hidePopup}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="popular-product">
                  <div className="pp-content">
                    <h3>{t("pupularProducts")}</h3>
                    {loading ? (
                      <div>{t("loading")}</div>
                    ) : (
                      <div className="products-result">
                        <SearchProducts
                          products={products}
                          hidePopup={hidePopup}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};
