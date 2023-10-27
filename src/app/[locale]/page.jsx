import { fetchGqlServer } from "@utils/data.utils"
import { getHomePageMetaDataQuery } from "./HomePage/homePage.gql"

export { default } from "./HomePage"

export async function generateMetadata({ params }) {
  const { data } = await fetchGqlServer({
    query: getHomePageMetaDataQuery.loc?.source?.body,
  })
  const { locale } = params
  const currentStore = data?.availableStores.filter(
    (storeOption) => storeOption.url_store_code === `/${locale}`
  )
  return {
    title: currentStore[0].default_title,
    description: currentStore[0].default_description,
  }
}
