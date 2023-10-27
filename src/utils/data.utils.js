import { getCurrentLocale } from "@locales/server"
import { getBaseUrl } from "@utils/app.utils"

import { stripIgnoredCharacters } from "graphql"

export const getStoreHeaderValue = (locale) => {
  switch (locale) {
    case "en-sa":
      return "default"

    case "ar-sa":
      return "ar_SA"

    default:
      throw new Error(`Invalid locale : ${locale}`)
  }
}

export async function fetchGqlServer({
  query,
  variables = null,
  method = "POST",
  /**
   * String value that tells fetch to cache or not to cache return data
   *
   * no-store : Never cache this fetch request
   * force-cache : Default value, always cache
   */
  cache = null,
  // { revalidate: in seconds , tags: used to invalidate data-cache }
  nextOptions = null,
}) {
  if (!query) {
    throw new Error("Query is required to fetch graphQL results")
  }
  const currLocale = getCurrentLocale()

  let fetchOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      store: getStoreHeaderValue(currLocale),
    },
    cache: !!cache ? cache : undefined,
  }
  let url = getBaseUrl()

  if (method === "POST") {
    fetchOptions.body = JSON.stringify({
      query,
      variables: variables ? variables : undefined,
    })
  } else {
    // convert query into GET request
    const urlGetParams = new URLSearchParams({
      query: stripIgnoredCharacters(query),
    }).toString()
    // final url with get query params
    url = `${url}?${urlGetParams}`

    if (!!variables) {
      const urlGetParams = new URLSearchParams({
        variables: stripIgnoredCharacters(variables),
      }).toString()
      // url here will always have get query ?query so add another "&" variables
      url = `${url}&${urlGetParams}`
    }
  }

  if (!!nextOptions) {
    fetchOptions.next = nextOptions
  }

  const result = await fetch(url, fetchOptions)
  const resultData = await result.json()
  return { data: resultData?.data, errMessage: "", status: 200 }
}
export const mergeFilters = (latestFilter, fltrList) => {
  if (latestFilter) {
    const fIndex = fltrList?.findIndex(
      (fl) => fl.attribute_code === latestFilter.attribute_code
    )
    if (fIndex !== -1) {
      const nFltrList = Array.from(fltrList)
      nFltrList.splice(fIndex, 1, latestFilter)
      return nFltrList
    }
  }
  return fltrList
}
