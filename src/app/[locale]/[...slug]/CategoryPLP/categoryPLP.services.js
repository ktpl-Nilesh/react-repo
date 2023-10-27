import { fetchGqlServer } from "@utils/data.utils"
import {
  GET_SORT_FIELDS,
  GET_PRODUCT_FILTERS,
  GET_CATEGORY_TREE,
} from "./categoryPLP.gql"
import {
  GET_CATEGORY_DATA,
  GET_CATEGORY_PLP_DATA,
} from "../components/ProductList/ProductList.gql"
import { GET_AVAILABLE_STORES } from "@utils/storeConfig.gql"

export async function getCategoryPLPData(filterVariables) {
  try {
    const { data } = await fetchGqlServer({
      query: GET_SORT_FIELDS?.loc?.source?.body,
      variables: filterVariables,
    })
    return data
  } catch (err) {
  }
}
export async function getProductFilterData(filterVariables) {
  try {
    const { data } = await fetchGqlServer({
      query: GET_PRODUCT_FILTERS?.loc?.source?.body,
      variables: filterVariables,
    })
    return data
  } catch (err) {
  }
}

export async function getCategoryTree(filterVariables) {
  try {
    const { data } = await fetchGqlServer({
      query: GET_CATEGORY_TREE?.loc?.source?.body,
      variables: filterVariables,
    })
    return data
  } catch (err) {
  }
}

export async function getProductListData(filterVariables) {
  try {
    const { data } = await fetchGqlServer({
      query: GET_CATEGORY_PLP_DATA?.loc?.source?.body,
      variables: filterVariables,
    })
    return data
  } catch (err) {
  }
}

export async function getCategoryData(filterVariables) {
  try {
    const { data } = await fetchGqlServer({
      query: GET_CATEGORY_DATA?.loc?.source?.body,
      variables: filterVariables,
    })
    return data
  } catch (err) {
  }
}

export async function getAvailableStore() {
  try {
    const { data } = await fetchGqlServer({
      query: GET_AVAILABLE_STORES?.loc?.source?.body,
    })
    return data
  } catch (err) {
  }
}
