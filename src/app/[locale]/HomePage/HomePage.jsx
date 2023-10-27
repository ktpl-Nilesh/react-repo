import get from "lodash/get"
import ConfiguratorBlocks from "../components/ConfiguratorBlocks"
import { getHomePageQuery } from "./homePage.gql"
import { fetchGqlServer } from "@utils/data.utils"
import dynamic from "next/dynamic"

async function getData() {
  try {
    const { data } = await fetchGqlServer({
      query: getHomePageQuery(2, 1).loc?.source?.body,
    })

    return data?.dashboard1
  } catch (err) {
  }
}
async function getDataPromise() {
  try {
    const { data } = await fetchGqlServer({
      query: getHomePageQuery(50, 1).loc?.source?.body,
    })

    return data?.dashboard1
  } catch (err) {
  }
}

const DynamicConfiguratorBlock = dynamic(() =>
  import("../DynamicConfiguratorBlock")
)

export default async function HomePage(props) {
  const res = await getData()
  const resRes = getDataPromise

  return (
    <div className="home page">
      <div>
        <div className="home-wrapper">
          <ConfiguratorBlocks
            blockList={get(res, "items", [])}
            senseiList={[]}
            pageInfo={get(res, "page_info", {})}
            loadingMore={false}
          />
          <DynamicConfiguratorBlock dataPromise={resRes} />
        </div>
      </div>
    </div>
  )
}
