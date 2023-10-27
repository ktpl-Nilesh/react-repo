import React, { memo } from "react";
import Skeleton from "react-loading-skeleton";

import "./configurator-loader.scss";

/**
 * Render different Loader based on the type of the component.
 *
 * Parent:
 *      HomeSections
 *      CarouselSlider
 *      SenseiProdutSlider
 *      ProductSliderBlock
 *      ShopByBrandOnPLP
 */
const _ConfigratorLoading = ({ type }) => {
  return (
    <div className="configurator-loader">
      {type === "main_slider" || !type ? (
        <section className="section-1">
          <div className="no-container">
            <div className="loading-row">
              <div className="loading-col">
                <Skeleton height="100%" />
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
      {type === "products" || !type ? (
        <section className="section-2">
          <div className="container">
            <div className="loading-row">
              <div className="loading-col">
                <Skeleton height="100%" />
              </div>
              <div className="loading-col">
                <Skeleton height="100%" />
              </div>
              <div className="loading-col">
                <Skeleton height="100%" />
              </div>
              <div className="loading-col">
                <Skeleton height="100%" />
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
      {type === "catogories" || !type ? (
        <section className="section-3">
          <div className="container">
            <div className="loading-row">
              <div className="loading-col">
                <Skeleton height="100%" />
              </div>
              <div className="loading-col">
                <Skeleton height="100%" />
              </div>
              <div className="loading-col">
                <Skeleton height="100%" />
              </div>
              <div className="loading-col">
                <Skeleton height="100%" />
              </div>
              <div className="loading-col">
                <Skeleton height="100%" />
              </div>
              <div className="loading-col">
                <Skeleton height="100%" />
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
      {/* <section className="section-4">
      <div className="no-container">
        <div className="loading-row">
          <div className="loading-col">
            <Skeleton height="100%" />
          </div>
        </div>
      </div>
    </section> */}
      {type === "cms_block" || !type ? (
        <section className="section-5">
          <div className="container">
            <div className="loading-row">
              <div className="loading-col">
                <Skeleton height="100%" />
              </div>
              <div className="loading-col">
                <Skeleton height="100%" />
              </div>
              <div className="loading-col">
                <Skeleton height="100%" />
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </div>
  );
};

export const ConfiguratorLoading = memo(_ConfigratorLoading);
