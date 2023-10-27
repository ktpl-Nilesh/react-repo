import { PriceBlock } from "components/common/PriceBlock/PriceBlock";
import * as React from "react";
import { get } from "react-hook-form";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { getProductPageLink } from "utils/utils";

export const SearchProducts = ({ products, hidePopup }) => {
  const isRTL = window.isRTL;
  var settings = {
    arrows: true,
    infinite: false,
    speed: 1200,
    slidesToShow: 4,
    slidesToScroll: 4,
    rows: 1,
    centerMode: false,
    centerPadding: "0",
    swipe: true,
    rtl: window.isRTL,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {products.map((product, index) => (
        <div
          className="product-list-item fdc jcsb"
          key={product.uid}
          onClick={hidePopup}
        >
          <div className="product-info">
            <Link to={getProductPageLink(get(product, "url_key", ""))}>
              <div className="product-thumbnail">
                <img src={product.thumbnail.url} alt={product.name} />
              </div>
              <div className="product-name">{product.name}</div>
            </Link>
            <div className="product-price">
              <PriceBlock
                currency={
                  product.price_range.minimum_price.final_price.currency
                }
                value={product.price_range.minimum_price.final_price.value}
              />
            </div>
            {/* hidden as per mentioned in [AMITCL-530] */}
            {/* {product.price_range.minimum_price.discount.amount_off > 0 ? (
              <del className="product-discount">
                <span className="value">
                  <PriceString
                    prefix={t("common.save")}
                    currency={
                      product.price_range.minimum_price.final_price.currency
                    }
                    value={
                      product.price_range.minimum_price.discount.amount_off
                    }
                  />
                </span>
                <span className="percent">{`(${product.price_range.minimum_price.discount.amount_off}% off)`}</span>
              </del>
            ) : (
              ""
            )} */}
          </div>
        </div>
      ))}
    </Slider>
  );
};
