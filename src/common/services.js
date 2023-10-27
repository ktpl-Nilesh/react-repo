import { fetchGqlServer } from "@utils/data.utils"
import { GET_AVAILABLE_STORES } from "@common/queries/common.gql"

export async function getStoreConfig() {
  try {
    const { data } = await fetchGqlServer({
      query: GET_AVAILABLE_STORES.loc?.source?.body,
      nextOptions: { revalidate: 1000 },
    })

    return data?.availableStores || []
  } catch (err) {
  }
}
