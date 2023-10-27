import React from "react"
// import { Link, NavLink } from "react-router-dom"
// import { useNavigate } from "react-router"

// import { getMegaMenuLink } from "@utils/app.utils"
// import { useDetectClickOutside } from "react-detect-click-outside"
// import CMSBlock from "../CMSBlock"
// import Link from "next/link"

export const MobileMenuOffCanvas = ({
  menuList,
  setShow,
  setShowCategories,
  mobileMenuCMSBlock,
  mobileMenuBottomCMSBlock,
}) => {
  // let navigate = useNavigate()
  // let viewAllCategories = () => {
  //   setShow(false)
  //   navigate("/categories")
  // }
  // React.useEffect(() => {
  //   return () => {
  //     setShow(false)
  //   }
  // }, [])
  // const clickRef = useDetectClickOutside({
  //   onTriggered: function () {
  //     setShow(false)
  //   },
  // })
  return (
    <></>
    // <div ref={clickRef}>
    //   <span
    //     className="close-btn"
    //     onClick={() => {
    //       setShow(false)
    //       setShowCategories(false)
    //     }}>
    //     close
    //   </span>
    //   <div className="menu-top">
    //     {mobileMenuCMSBlock ? (
    //       <CMSBlock
    //         html={mobileMenuCMSBlock.content
    //           .toString()
    //           .replace(/&lt;/g, "<")
    //           .replace(/&gt;/g, ">")}
    //       />
    //     ) : (
    //       ""
    //     )}
    //   </div>
    //   <div className="menu-link-list">
    //     <ul>
    //       {menuList.map((menuItem, idx) => (
    //         <li key={menuItem.item_id}>
    //           <div
    //             className={`${
    //               idx === menuList.length - 1
    //                 ? "menu-item-div row jcsb"
    //                 : "menu-item-div"
    //             }`}>
    //             {menuItem.item_type === "link" ? (
    //               <a
    //                 href={getMegaMenuLink(
    //                   menuItem.item_link,
    //                   menuItem.item_type
    //                 )}
    //                 target="_blank">
    //                 {menuItem.item_name}
    //               </a>
    //             ) : (
    //               <Link
    //                 href={getMegaMenuLink(menuItem.item_link, menuItem.item_type)}
    //                 onClick={() => setShow(false)}>
    //                 {menuItem.item_name}
    //               </Link>
    //             )}
    //             {idx === menuList.length - 1 ? (
    //               <div
    //                 className="view-all-category"
    //                 onClick={viewAllCategories}>
    //                 {t("mobileMenu.viewAllCategories")}
    //               </div>
    //             ) : (
    //               ""
    //             )}
    //           </div>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    //   <div className="menu-footer">
    //     <div className="ftr-1">
    //       <ul>
    //         <li>
    //           <img
    //             src="/assets/images/help-support-mobile.svg"
    //             alt="mobile menu"
    //           />
    //           <span>
    //             <span>
    //               <div>{t("link.helpSupport")}</div>
    //               <div>
    //                 <a href="tel:+966 920009538" target="_blank" dir="ltr">
    //                   <b>+966 920009538</b>
    //                 </a>
    //               </div>
    //               <div>
    //                 <a href="mailto:help@hnak.com" target="_blank">
    //                   <b>help@hnak.com</b>
    //                 </a>
    //               </div>
    //             </span>
    //           </span>
    //           {/* <label>arrow</label> */}
    //         </li>
    //         <li>
    //           <img src="/assets/images/about-us-mobile.svg" alt="about us" />
    //           <span>
    //             <Link href="/about-us" onClick={() => setShow(false)}>
    //               {t("link.aboutUs")}
    //             </Link>
    //           </span>
    //           {/* <label>arrow</label> */}
    //         </li>
    //       </ul>
    //     </div>
    //     <div className="ftr-2">
    //       <div className="social-icon">
    //         <label>{t("footer.findUs")}: </label>
    //         <ul>
    //           <li className="yt">
    //             <a href="https://www.youtube.com/channel/UClk1D8nB_ZJdPK3PbIdh7uA">
    //               <img
    //                 src="/assets/images/social/Icons/youtube.png"
    //                 alt="youtube"
    //               />
    //             </a>
    //           </li>
    //           <li className="sc">
    //             <a href="https://www.snapchat.com/add/hnak.com" target="_blank">
    //               <img
    //                 src="/assets/images/social/Icons/snapchat.png"
    //                 alt="snapchat"
    //               />
    //             </a>
    //           </li>
    //           <li className="tw">
    //             <a href="https://twitter.com/HNAKKSA" target="_blank">
    //               <img
    //                 src="/assets/images/social/Icons/twitter.png"
    //                 alt="twitter"
    //               />
    //             </a>
    //           </li>
    //           <li className="fb">
    //             <a href="https://www.facebook.com/meethnak" target="_blank">
    //               <img
    //                 src="/assets/images/social/Icons/facebook.png"
    //                 alt="facebook"
    //               />
    //             </a>
    //           </li>
    //           <li className="ins">
    //             <a href="https://www.instagram.com/hnak.sa" target="_blank">
    //               <img
    //                 src="/assets/images/social/Icons/insta.png"
    //                 alt="insta"
    //               />
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //       {mobileMenuBottomCMSBlock ? (
    //         <CMSBlock
    //           html={mobileMenuBottomCMSBlock.content
    //             .toString()
    //             .replace(/&lt;/g, "<")
    //             .replace(/&gt;/g, ">")}
    //         />
    //       ) : (
    //         ""
    //       )}
    //     </div>
    //   </div>
    // </div>
  )
}
