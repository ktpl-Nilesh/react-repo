import { useQuery } from "@apollo/client";
import { get } from "lodash";
import { GET_RECENT_SERCH_PRODUCTS } from "pages/PageNotFound/pageNotFound.gql";
import {isClientSide} from "utils/misc";

export const useSearchNotFound = () => {
  const { data, loading, error } = useQuery(GET_RECENT_SERCH_PRODUCTS, {
    skip: !isClientSide(),
  });

  return {
    basedOnRecentSearchProducts: get(data, "based_on_search_products", ""),
  };
};
