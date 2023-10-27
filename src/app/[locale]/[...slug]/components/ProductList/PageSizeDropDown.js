import React, { useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useI18n } from "@locales/client";
export const PageSizeDropDown = ({
  onPazeSizeChange,
  pageSizeValues,
  showDropDown,
  setShowDropDown,
}) => {
  let searchParams = useSearchParams();
  const t = useI18n()
  let pageSize = searchParams.get("per_page") || 28;
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="page-size-dropdown dropdown title-outside row aic"
      onClick={() => setShowDropDown(!showDropDown)}
      ref={dropdownRef}
    >
      <div className="page-result">
        <span className="title">{t("plp.perPage")}: </span>
        <span className={`selected ${showDropDown ? "show" : "hide"}`}>
          {pageSize}
        </span>
      </div>
      <ul className={showDropDown ? "show" : "hide"}>
        {pageSizeValues.map((pvalue) => (
          <li
            key={pvalue}
            className={`${Number(pageSize) === pvalue ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onPazeSizeChange(pvalue);
              setShowDropDown(false);
            }}
          >
            {pvalue}
          </li>
        ))}
      </ul>
    </div>
  );
};
