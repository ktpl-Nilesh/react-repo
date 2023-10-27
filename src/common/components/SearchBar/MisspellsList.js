import * as React from "react";
import { t } from "i18next";

/**
 * Renders the misspells list and set the search text on mispell click
 *
 * Parent
 *      SearchResults.js
 */
const MisspellsList = ({ misspells, setSearchText }) => {
  // Set search text on misspell click
  const handleMisspellClick = React.useCallback(
    (e) => {
      e.preventDefault();
      setSearchText(misspells);
    },
    [misspells, setSearchText]
  );
  return (
    <>
      <p>
        {t("searchResults.areYouLookingFor")}{" "}
        <strong style={{ cursor: "pointer" }} onClick={handleMisspellClick}>{misspells} ?</strong>
      </p>
      {/* <ul className="misspelling-list">
        <li onClick={handleMisspellClick}>{misspells}</li>
      </ul> */}
    </>
  );
};

export default MisspellsList;
