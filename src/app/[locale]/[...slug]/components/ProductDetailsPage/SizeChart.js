// import { t } from "i18next";
import ImageRenderer from "../../../../../common/components/Image"
import PLACEHOLDER from "../../../../../common/components/Image/PLACEHOLDER"
// import Portal from "components/Portal"
import useSizeChart from "./useSizeChart"
// import "./SizeChart.scss";
// import { useDetectClickOutside } from "react-detect-click-outside"
import { getI18n } from "@locales/server"

const SizeChart = async ({ size_chart }) => {
  const t = await getI18n()
  const { popupType, POPUP_TYPE, openSizeChartPopup, closeSizeChartPopup } =
    useSizeChart()

  // close popup on click outside
  // const clickRef = useDetectClickOutside({
  //   onTriggered: function () {
  //     closeSizeChartPopup()
  //   },
  // })

  return (
    <div
      className="size-chart-text-link"
      // ref={clickRef}
    >
      <div className="find-your-size-link" onClick={openSizeChartPopup}>
        {t("pdp.findYourSize")}
      </div>
      {popupType === POPUP_TYPE.SIZE_CHART ? (
        // <Portal className="sizechartpopup">
        <div className="size-chart-container">
          <div className="popup-header">
            <h3 className="size-chart-title">{t("pdp.findYourSize")}</h3>
            <div className="close-popup" onClick={closeSizeChartPopup}>
              {t("common.close")}
            </div>
          </div>
          <div className="size-chart-container-inn fancy-scroll">
            <ImageRenderer
              alt="Size Chart"
              url={size_chart}
              minHeight="300px"
              thumb={PLACEHOLDER}
            />
          </div>
        </div>
      ) : (
        // </Portal>
        ""
      )}
    </div>
  )
}

export default SizeChart
