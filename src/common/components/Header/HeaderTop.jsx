import React from "react"

import get from "lodash/get"

import { GET_HEADER_TOP } from "./header.gql"
import { getBaseUrl } from "@utils/app.utils"

import CMSBlock from "../CMSBlock"
import LanguageSwitcher from "../LanguageSwitcher"
import { fetchGqlServer } from "@utils/data.utils"

/**
 * Graphql call to get only top section of header
 */
async function getHeaderTopData() {
  try {
    const { data } = await fetchGqlServer({
      query: GET_HEADER_TOP.loc?.source?.body,
      variables: null,
      nextOptions: {
        revalidate: 60,
      },
    })

    return get(data, "cmsBlocks.items.0", {})
  } catch (err) {}
}

/**
 * Render Top smallection of heaader
 *
 * Parent
 *    Header
 */
export default async function HeaderTop() {
  const res = await getHeaderTopData()

  return (
    <div className="header-top">
      <div className="container">
        <CMSBlock
          html={res?.content
            .toString()
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")}
        />
        <LanguageSwitcher />
      </div>
    </div>
  )
}
