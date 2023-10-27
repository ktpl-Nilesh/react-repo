import { t } from "i18next";
import * as React from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";

export const SearchCategories = ({ categoryList, searchText, hidePopup }) => {
  const getSearchCategory = (category) => {
    if (category.parent_category) {
      return category.parent_category.custom_parent_category_name_path;
    } else {
      return category.name;
    }
  };
  return (
    <div>
      {categoryList
        .filter((cat) => !!cat.parent_category)
        .map((searchcategory, index) => (
          <div className="sr-list" key={index} onClick={hidePopup}>
            {`${searchcategory.name} ${t("common.in")} `}
            <strong>
              <Link to={searchcategory.url_path}>
                {getSearchCategory(searchcategory)}
              </Link>
            </strong>
          </div>
        ))}
    </div>
  );
};
