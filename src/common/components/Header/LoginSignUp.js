// import React, { useState } from "react";
// import { useMutation } from "@apollo/client";
// import { useDispatch } from "react-redux";
import { Link } from "next/link"
// import { useTranslation } from "react-i18next";

import { getI18n } from "@locales/server"
import get from "lodash/get"

// import { gqclient } from "data/graphql.client";
// import { setCartId } from "data/reducers/appState.reducer";
// import { logout } from "data/reducers/auth.reducer";
// import { CREATE_CART } from "pages/CartPage/cart.gql";
// import { getAccountPath } from "constants/url.constant";

const LoginSignup = () => {
  // const [loggingOut, setLoggingOut] = useState(false);
  // const dispatch = useDispatch();
  // const { t } = useTranslation();
  const t = getI18n()

  // const [createEmptyCart] = useMutation(CREATE_CART, {
  //   onCompleted: (res) => {
  //     const newCartId = get(res, "createEmptyCart");
  //     dispatch(setCartId(newCartId));
  //   },
  //   onError: (err) => {
  //     console.log(
  //       "🚀 ~ file: LoginSignUp.js ~ line 29 ~ LoginSignup ~ err",
  //       err
  //     );
  //   },
  // });

  // const handleLogout = () => {
  //   setLoggingOut(true);
  //   dispatch(logout());
  //   createEmptyCart({ variables: {} }).then(() => {
  //     setLoggingOut(false);
  //     gqclient.cache.reset();
  //   });
  // };

  return (
    <div className="login-signup">
      <div className="UserProfile">
        <div className="user-image">
          <img
            src="/assets/images/user.svg"
            alt="Site Logo"
            height="40"
            width="40"
          />
        </div>
        <div className="user-popup">
          <div className="user-popup-content">
            {/* Phase 2 */}
            {/* <div className="wallet-section jcsb aic">
                  <div className="left fdc">
                    <img src="/assets/dummydata/images/Wallet.svg" />
                    <span>Wallet Balance</span>
                    <div className="price">
                      SAR <strong>251.5</strong>
                    </div>
                  </div>
                  <div className="right">
                    <div className="add-balance">
                      <span>+ Add Balance</span>
                    </div>
                  </div>
                </div> */}
            <div className="links-section">
              <ul>
                <li className="profile-link">
                  <Link href={getAccountPath("profile")}>
                    {t("account.myProfileLabel")}
                  </Link>
                </li>
                <li className="orders-link">
                  <Link href={getAccountPath("orders")}>
                    {t("account.myOrdersLabel")}
                  </Link>
                </li>
                <li className="wishlist-link">
                  <Link href="/wishlist">{t("cushrefmer.myWishlistLabel")}</Link>
                </li>
                <li className="addresses-link">
                  <Link href={getAccountPath("addresses")}>
                    {t("account.myAddressesLabel")}
                  </Link>
                </li>
                <li className="payment-link">
                  <Link href={getAccountPath("payment")}>
                    {t("account.myPaymenhrefptions")}
                  </Link>
                </li>
              </ul>
              <div className="logout" 
              // onClick={ 
              //   handleLogout
              //   }
                >
                <span>
                  {/* {loggingOut ? t("loading") : t("logout")} */}
                  abc
                  </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
