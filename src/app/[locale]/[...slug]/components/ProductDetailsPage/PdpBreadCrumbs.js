import React, { useMemo } from "react";

import { get, size } from "lodash";
import { Link } from "react-router-dom";

// import "./pdp-breadcrumbs.scss";
import { t } from "i18next";
import { getHomePath } from "constants/url.constant";

/**
 * Render BreadCrumbs
 * click handlers will be passed from the parent
 *
 * Parent
 *    ProductPage
 */
const PdpBreadCrumbs = ({ breadcrumbs, productName }) => {
  const breadcrumbItems = get(breadcrumbs, "0.breadcrumbs", []);

  const renderBreadcrumbItems = useMemo(() => {
    if (size(breadcrumbItems) === 0) return null;

    return (
      <ul className="breadcrumb-list clearfix">
        <li className="br-item">
          <Link to={getHomePath()}>{t("common.home")}</Link>
        </li>
        {breadcrumbItems.map((item) => {
          return (
            <li className="br-item" key={get(item, "category_uid", "")}>
              <Link to={`/${item.category_url_path}`}>
                {get(item, "category_name", "")}
              </Link>
            </li>
          );
        })}
        <li className="br-item active">
          <a className="active">{productName}</a>
        </li>
      </ul>
    );
  }, [breadcrumbItems]);
  return <div className="pdp-breadcrumbs">{renderBreadcrumbItems}</div>;
};

export default PdpBreadCrumbs;
