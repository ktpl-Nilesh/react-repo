import * as React from "react"
import get from "lodash/get"
// import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CUSTOMER_NOTIFY_ME, NOTIFY_CONFIG, NOTIFY_ME } from "../pdp.gql"
// import { useDispatch, useSelector } from "react-redux";
// import { addNotification } from "data/reducers/notification.reducer";
// import { getIsUserLoggedIn } from "data/selectors/users.selectors";
// import {
//   POPUP_TYPE,
//   setNotfyMeConfig,
//   setPopupType,
// } from "data/reducers/storeConfig.reducer";
// import { NOTIFICATION_TYPE } from "components/common/Notification/notificationType"
import { getI18n } from "@locales/server"
// import { t } from "i18next";
// import { getNotifyMeConfig } from "data/selectors/storeConfig.selector";

export const useNotifyMe =async () => {
  const NOTIFICATION_TYPE = null
  const t = await getI18n()
  // const dispatch = useDispatch()
  // const notifyConfig = useSelector(getNotifyMeConfig)
  // const isLoggedIn = useSelector(getIsUserLoggedIn)
  // const [fetchNotifyMeConfig] = useLazyQuery(NOTIFY_CONFIG, {
  //   onCompleted(res) {
  //     dispatch(
  //       setNotfyMeConfig(get(res, "MpProductAlertsConfigs.stock_alert", null))
  //     )
  //   },
  //   context: { fetchOptions: { method: "GET" } },
  // })
  // React.useEffect(() => {
  //   if (!notifyConfig) {
  //     fetchNotifyMeConfig()
  //   }
  // }, [])
  // const [
  //   notifyMe,
  //   { data: notifyMeRes, loading: notifyMeLoading, error: notifyMeErr },
  // ] = useMutation(isLoggedIn ? CUSTOMER_NOTIFY_ME : NOTIFY_ME, {
  //   onCompleted(res) {
  //     dispatch(
  //       addNotification({
  //         type: NOTIFICATION_TYPE.SUCCESS,
  //         title: t("common.subscribeSuccess"),
  //         text: get(notifyConfig, "subscribed_text", ""),
  //         timeout: 7000,
  //       })
  //     )
  //   },
  //   onError(err) {
  //     dispatch(
  //       addNotification({
  //         type: NOTIFICATION_TYPE.ERROR,
  //         title: t("wentWrong.title"),
  //         text: err.message,
  //         timeout: 7000,
  //       })
  //     )
  //   },
  // })

  const handleNotifyMe = (sku, email) => {
    if (isLoggedIn) {
      notifyMe({ variables: { productSku: sku } })
    } else {
      dispatch(setPopupType(POPUP_TYPE.NOTIFY_ME))
    }
  }
  return {
    handleNotifyMe,
    // notifyMe,
    // fetchNotifyMeConfig,
    // notifyMeRes,
    // notifyMeLoading,
    // notifyMeErr,
    // notifyConfig,
  }
}
