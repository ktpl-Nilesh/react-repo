import * as React from "react"
// import { useForm } from "react-hook-form";
import size from "lodash/size"
import get from "lodash/get"
// import { t } from "i18next";
import Input from "../../../../../../common/components/Form/Input"
// import { EMAIL_REGEXP } from "utils/utils"
import { useNotifyMe } from "./useNotifyMe"
// import { useDispatch } from "react-redux"
// import { setPopupType } from "data/reducers/storeConfig.reducer"
import Loader from "../../../../../../common/components/Loader"
import { getI18n } from "@locales/server"
// import "./NotifyMePopup.scss";

export const NotifyMePopup =async ({ sku }) => {
  const t = await getI18n()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { notifyMe, notifyMeLoading, notifyConfig } = useNotifyMe()
  const handleClose = () => {
    dispatch(setPopupType(null))
  }
  const onNotifyMe = (data) => {
    notifyMe({ variables: { productSku: sku, email: data.email } }).then(() => {
      handleClose()
    })
  }
  const notifyMeTitle = get(notifyConfig, "popup_setting.heading_text")
  const notifyDesc = get(notifyConfig, "popup_setting.description")
  const notifyFoterText = get(notifyConfig, "popup_setting.footer_content")
  return (
    <div className="notify-popup-inner">
      {notifyMeLoading ? <Loader /> : ""}
      <div className="close" onClick={handleClose}>
        close
      </div>
      {notifyMeTitle ? <div className="title">{notifyMeTitle}</div> : ""}
      {notifyDesc ? <div className="description">{notifyDesc}</div> : ""}
      <form>
        <Input
          label={t("fieldName.emailAddress")}
          type="text"
          autoComplete={false}
          placeholder={get(notifyConfig, "popup_setting.place_holder")}
          {...register("email", {
            validate: (value) => {
              // if no mobile no this field is required
              if (!size(value)) {
                return t("form.required", {
                  field: t("fieldName.emailAddress"),
                })
              }
              return true
            },
            pattern: {
              value: EMAIL_REGEXP,
              message: t("form.invalidEmail"),
            },
          })}
          error={errors && errors.email?.message}
        />
        <button
          className="notify-me"
          type="submit"
          onClick={(e) => {
            e.preventDefault()
            if (notifyMeLoading) {
              return
            }
            handleSubmit(onNotifyMe)()
          }}>
          {notifyMeLoading
            ? `${t("loading")}`
            : get(notifyConfig, "popup_setting.button_text") ||
              t("pdp.notifyMe")}
        </button>
      </form>
      {notifyFoterText ? (
        <div className="footer-text">{notifyFoterText}</div>
      ) : (
        ""
      )}
    </div>
  )
}
