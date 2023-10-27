import { fetchGqlServer } from "@utils/data.utils"
import { getHomePageMetaDataQuery, getHomePageQuery } from "./homePage.gql"

/**
 * service will return home page inital graphql data
 */
export async function getHomePageData() {
  try {
    const { data } = await fetchGqlServer({
      query: getHomePageQuery(2, 1).loc?.source?.body,
      method: "GET",
    })

    // console.log(
    //   "🚀 ~ file: homePage.services.js:15 ~ getHomePageData ~ data?.dashboard1:",
    //   data?.dashboard1
    // )
    return data?.dashboard1
  } catch (err) {
  }
}

export async function getHomePageDataPromise() {
  return fetchGqlServer({ query: getHomePageQuery(14, 2).loc?.source?.body })
}

export const getHomePageMetaData = async () => {
  const { data } = await fetchGqlServer({
    query: getHomePageMetaDataQuery.loc?.source?.body,
  })
  return data
}
