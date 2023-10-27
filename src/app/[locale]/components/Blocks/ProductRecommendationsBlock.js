// import { RenderSenseiProducts } from "components/common/sensei/RenderSenseiProducts";
import { get } from "lodash";
import React from "react";
import { ConfiguratorLoading } from "../ConfiguratorLoading";

/**
 * Render product recommendations block on Homepage and CLP.
 *
 * Parent:
 *      ConfiguratorBlocksItem
 */

 const ProductRecommendationsBlock = ({
  blockType,
  blockData,
  senseiList,
}) => {
  const blockContent = get(blockData, "items");
  const unit = senseiList.find((u) => u.unitId === blockContent.unit_id);
  if (!unit) {
    return <ConfiguratorLoading type="products" />;
  }
  return (
    <div className={blockType}>
      {/* <RenderSenseiProducts units={[unit]} /> */}
    </div>
  );
};
export default ProductRecommendationsBlock