import * as React from "react"
import "./plp-pagination.scss"
import { useI18n } from "@locales/client"
import Link from "next/link"

export const Pagination = ({ page_info, changePage }) => {
  const t = useI18n()
  return (
    <div className="plp-pagination">
      {page_info.current_page > 1 && page_info.total_pages > 1 ? (
        <Link
          rel="prev"
          href={
            window.origin +
            window.location.pathname +
            `?page=${page_info.current_page - 1}`
          }
        />
      ) : (
        ""
      )}
      {page_info.current_page !== page_info.total_pages &&
      page_info.total_pages > 1 ? (
        <Link
          rel="next"
          href={
            window.origin +
            window.location.pathname +
            `?page=${page_info.current_page + 1}`
          }
        />
      ) : (
        ""
      )}

      <button
        className="prev-page btn"
        onClick={() => changePage(page_info.current_page - 1, page_info)}
        disabled={page_info.current_page === 1}>
        &lt;
      </button>
      <span>
        {t("plp.page")}:{" "}
        {`${page_info.current_page} ${t("pagination.of")} ${
          page_info.total_pages
        }`}
      </span>
      <button
        className="next-page btn"
        onClick={() => changePage(page_info.current_page + 1, page_info)}
        disabled={page_info.current_page === page_info.total_pages}>
        &gt;
      </button>
    </div>
  )
}
