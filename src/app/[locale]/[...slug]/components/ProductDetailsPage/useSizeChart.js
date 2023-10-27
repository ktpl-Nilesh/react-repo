import { useCallback } from "react"
// import { getPopupType } from "data/selectors/storeConfig.selector";
// import { POPUP_TYPE, setPopupType } from "data/reducers/storeConfig.reducer";
// import { useSelector, useDispatch } from "react-redux";
import { setHeaderSticky } from "@utils/app.utils.js"

const useSizeChart = () => {
  const dispatch = useDispatch()
  const popupType = useSelector(getPopupType)

  const openSizeChartPopup = useCallback(() => {
    dispatch(setPopupType(POPUP_TYPE.SIZE_CHART))
    setHeaderSticky(false)
  }, [POPUP_TYPE, setPopupType])

  const closeSizeChartPopup = useCallback(() => {
    dispatch(setPopupType(null))
    setHeaderSticky(true)
  }, [POPUP_TYPE])

  return {
    popupType,
    POPUP_TYPE,
    openSizeChartPopup,
    closeSizeChartPopup,
  }
}

export default useSizeChart
