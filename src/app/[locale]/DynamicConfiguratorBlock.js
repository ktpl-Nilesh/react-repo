import get from "lodash/get"
import ConfiguratorBlocks from "./components/ConfiguratorBlocks"

export default async function DynamicConfiguratorBlock({ dataPromise }) {
  const restRes = await dataPromise()

  return (
    <ConfiguratorBlocks
      blockList={get(restRes, "items", []).slice(1, 40)}
      senseiList={[]}
      pageInfo={get(restRes, "page_info", {})}
      loadingMore={false}
    />
  )
}
