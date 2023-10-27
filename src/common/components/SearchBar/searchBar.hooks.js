import { useLazyQuery } from "@apollo/client";
import { GET_SEARCH_RESULTS } from "./searchBar.gql";

export const useSearchBar = () => {
  let [fetchSearchResults, { data, loading, error }] = useLazyQuery(
    GET_SEARCH_RESULTS,
    { variables: { searchText: "" } }
  );

  // methods and event handlers
  const getSearchResults = (searchText) => {
    fetchSearchResults({ variables: { searchText: searchText } });
  };

  return {
    getSearchResults,
    data,
    loading,
    error,
  };
};
