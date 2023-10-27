"use client"
import * as React from "react"
import { useEffect } from "react"
import { ProductListItem } from "../../../app/[locale]/components/ProductListItem"
import "./product-slider.scss"

const ProductListGrid = ({
  products,
  rating,
  loading,
  description,
  view = "grid-view",
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])
  return (
    <div
      className={`category-products ${
        view === "list" ? "list-view" : "grid-view"
      }`}>
      <div className="product-grid">
        <div className="p-grid row">
          {products.map((productItem) => {
            return (
              <div
                height={200}
                // once
                // resize={true}
                // once
                // resize={true}
                className="product-grid-item col-sm-3"
                key={productItem.uid}>
                  <ProductListItem
                    product={productItem}
                    rating={rating}
                    config
                    loading={loading}
                    description={description}
                  />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ProductListGrid
