import React from "react"
import get from "lodash/get"
import CMSBlock from "../../../../common/components/CMSBlock"

/**
 * Render CMS block on Homepage and CLP.
 *
 * Parent:
 *      ConfiguratorBlocksItem
 */

export default function HomePageCMSBlock({ blockData }) {
  const blockContent = get(blockData, "items", null)
  return (
    <div className={blockData.block_id}>
      <CMSBlock
        html={blockContent.content
          .toString()
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")}
      />
    </div>
  )
}
