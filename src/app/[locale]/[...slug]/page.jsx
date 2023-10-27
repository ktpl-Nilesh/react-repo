import { GET_ROUTE_DATA } from "@common/queries/common.gql"
import { fetchGqlServer } from "@utils/data.utils"
// import ClientTest from "./client-test"

import get from "lodash/get"
import CategoryLandingPage from "./CategoryLandingPage"
import CategoryPLP from "./CategoryPLP"
import PDPPage from "./PDP"

async function getRouteData({ params }) {
  const routeDataUrl = params?.slug.join("/")

  try {
    const { data } = await fetchGqlServer({
      query: GET_ROUTE_DATA.loc?.source?.body,
      variables: { url: routeDataUrl },
      nextOptions: { revalidate: 1000 },
    })

    return data?.route
  } catch (err) {
  }
}

export default async function CategoryPage(params) {
  const routeData = await getRouteData(params)

  switch (routeData?.type) {
    // case "CMS_PAGE":
    //   return <AsyncCMSPage identifier={get(routeInfo, "identifier", null)} />
    case "CATEGORY":
      // if (!routeData.is_enabled) {
      //   return isClientSide() ? <Navigate to={getHomePath()} replace /> : ""
      // }
      if (routeData.is_landing_page) {
        return <CategoryLandingPage routeData={routeData} />
      }
      return (
        <CategoryPLP
          routeData={routeData}
          searchParams={params?.searchParams}
        />
      )
    case "PRODUCT":
      return <PDPPage routeData={routeData} />
    // default:
    // // debug log
    //   return isClientSide() ? <Navigate to={getHomePath()} replace /> : ""
  }

  // return (
  //   <div>
  //     {/* <h1>This is PLP, PDP pages, based on url route</h1> */}
  //     {/* <ClientTest /> */}
  //   </div>
  // )
}
