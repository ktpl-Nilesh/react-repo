import * as React from "react"
import Link from "next/link"

import { useI18n } from "@locales/client"

import get from "lodash/get"

import { getHomePath, getCategoryPageLink } from "@utils/app.utils"
// import { Helmet } from "react-helmet";
// import { helmetJsonLdProp } from "react-schemaorg";
import "./breadcrumbs.scss"

const CategoryBreadcrumbs = ({ categoryData }) => {
  let breadcrumbs = get(categoryData, "breadcrumbs", [])
  if (!breadcrumbs) {
    breadcrumbs = []
  }
  const t = useI18n()
  return (
    <>
      {/* <Helmet
        script={[
          helmetJsonLdProp({
            "@context": "https://schema.org/",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: getBaseURL(),
              },
            ]
              .concat(
                breadcrumbs.map(({ category_name, category_url_path }, idx) => {
                  return {
                    "@type": "ListItem",
                    position: idx + 2,
                    name: category_name,
                    item:
                      getBaseURL() +
                      category_url_path,
                  };
                })
              )
              .concat({
                "@type": "ListItem",
                position: breadcrumbs.length + 2,
                name: categoryData.name,
                item:
                  getBaseURL() +
                  categoryData.url_path,
              }),
          }),
        ]}
      ></Helmet> */}
      <div className="category-breadcrumbs">
        <ul className="breadcrumb-list clearfix">
          <li className="br-item">
            <Link href={"/"}>{t("common.home")}</Link>
          </li>
          {breadcrumbs !== null
            ? breadcrumbs.map((bitem) => (
                <li className="br-item" key={bitem.category_uid}>
                  <Link
                    href={getCategoryPageLink(
                      bitem.category_url_path,
                      bitem.is_landing_page
                    )}
                  >
                  {bitem.category_name}
                  </Link>
                </li>
              ))
            : null}
          <li className="br-item active">
            <Link
              href={'/'}
              onClick={(e) => e.preventDefault()}
              className="active"
              
            >
            <span>{categoryData.name}</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
export default CategoryBreadcrumbs
