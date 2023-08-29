// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable import/no-named-as-default */
// import { useState } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import './Footer.scss'
// import buttonClickSound from '../../../utils/ButtonClick.util'
// import { RoutePaths } from '../../../constants/Routepaths.constants'
// // import exitToDesktopUtil from "../../../utils/ExitToDesktop.util";
// // import { logoutUser } from "../../../utils/AwsCognito.util";
// import UiLables from '../../../constants/UiLables.constants'
// // import Popover from '../../generic/';
// import OutsideAlerter from '../outside-alerter/OutsideAlerter'
// // import { version as applicationVersion } from '../../../../../release/app/package.json';
// <<<<<<< HEAD
// // import React from "react";
// =======
// import React from 'react'
// >>>>>>> 826986a092f2a3ac07be09ac7a9e2bd532fb644a

// interface IProps {
//   productDetails: any
//   loginDetails: any
//   isTeacherDashboard: boolean
//   userName: string
//   setLoginDetails: (data: any) => void
//   stopInactivityTimer: () => void
// }

// const Footer: React.FC<IProps> = ({
//   productDetails,
//   isTeacherDashboard
// } // userName,
// // setLoginDetails,
// // loginDetails,
// // stopInactivityTimer,
// : IProps) => {
//   const location = useLocation()
//   // const navigate = useNavigate();

//   const [exitPopupStatus, setExitPopupStatus] = useState(false)
//   const [logoutPopupStatus, setLogoutPopupStatus] = useState(false)
//   const [exitToDesktopPressed, setExitToDesktopPressed] = useState(false)
//   const [logoutPressed, setLogoutPressed] = useState(false)

//   const setExitPopup = (clickEvent: { detail: number }) => {
//     if (clickEvent.detail !== 0) {
//       buttonClickSound()
//       setExitPopupStatus(!exitPopupStatus)
//     }
//   }

//   // const setExitPopupAsRef = () => {
//   //   setExitPopupStatus(!exitPopupStatus);
//   // };

//   const setLogoutPopup = (clickEvent: { detail: number }) => {
//     if (clickEvent.detail !== 0) {
//       buttonClickSound()
//       setLogoutPopupStatus(!logoutPopupStatus)
//     }
//   }

//   // const setLogoutPopupAsRef = () => {
//   //   setLogoutPopupStatus(!logoutPopupStatus);
//   // };

//   const exitApplication = (keyEvent: { key: string }) => {
//     if (keyEvent.key === 'Enter') {
//       buttonClickSound()
//       setExitPopupStatus(!exitPopupStatus)
//       setTimeout(() => {
//         document.getElementById('exitToDesktopYesButton')?.focus()
//       }, 10)
//     }
//   }

//   const closeExitPopup = () => {
//     setTimeout(() => {
//       setExitPopupStatus(false)
//     })
//   }

//   const closeLogoutPopup = () => {
//     setTimeout(() => {
//       setLogoutPopupStatus(false)
//     })
//   }

//   // const exitToDesktop = () => {
//   //   setTimeout(() => {
//   //     exitToDesktopUtil();
//   //   }, 200);
//   // };

//   // const logoutToDesktop = () => {
//   //   console.log("clicked on logoutToDesktop");

//   //   setTimeout(() => {
//   //     logoutUser();
//   //     localStorage.removeItem("userIdToken");
//   //     localStorage.removeItem("refreshToken");
//   //     localStorage.removeItem("userIdtokenExpiry");
//   //     localStorage.removeItem("email");
//   //     localStorage.removeItem("accessToken");
//   //     localStorage.removeItem("userId");
//   //     localStorage.removeItem("sub");
//   //     sessionStorage.removeItem("upgradePopupDisplayed");
//   //     setLoginDetails({});
//   //     // window.electron.ipcRenderer.sendMessage(
//   //     //   'remove_classlink_clever_cookies',
//   //     //   []
//   //     // );
//   //     navigate(RoutePaths.LOGIN_CARD);
//   //   }, 100);
//   // };

//   return (
//     <div className='footer_container'>
//       <div>
//         {RoutePaths.EULA !== location.pathname &&
//         RoutePaths.PRIVACY_POLICY !== location.pathname &&
//         RoutePaths.GENERAL_MESSAGE !== location.pathname &&
//         RoutePaths.DYNAMIC_LOADER !== location.pathname ? (
//           <div>
//             {exitPopupStatus ? (
//               <div
//                 className={
//                   isTeacherDashboard ? 'footer_container_exit_to_desktop_dashboard_after' : 'footer_container_exit_to_desktop_login_after'
//                 }
//               >
//                 <OutsideAlerter setExitPopupRef={closeExitPopup}>
//                   {/* <Popover
//                     message={UiLables.LABELS.ARE_YOU_SURE_TO_EXIT}
//                     setExitPopupRef={setExitPopupAsRef}
//                     onClickYes={() => {
//                       exitToDesktop();
//                       // window.electron.ipcRenderer.sendMessage(
//                       //   'destroy-browser-view',
//                       //   []
//                       // );
//                       stopInactivityTimer();
//                     }}
//                   /> */}
//                 </OutsideAlerter>
//               </div>
//             ) : (
//               <></>
//             )}
//             {logoutPopupStatus ? (
//               <div className='footer_container_logout_dashboard_after'>
//                 <OutsideAlerter setExitPopupRef={closeLogoutPopup}>
//                   {/* <Popover
//                     message={UiLables.LABELS.ARE_YOU_SURE_TO_LOGOUT}
//                     setExitPopupRef={setLogoutPopupAsRef}
//                     onClickYes={() => {
//                       logoutToDesktop();
//                       // window.electron.ipcRenderer.sendMessage(
//                       //   'destroy-browser-view',
//                       //   []
//                       // );
//                       stopInactivityTimer();
//                     }}
//                   /> */}
//                 </OutsideAlerter>
//               </div>
//             ) : (
//               <></>
//             )}
//             {isTeacherDashboard ? (
//               <></>
//             ) : (
//               <button
//                 onPointerDown={() => {
//                   setExitToDesktopPressed(true)
//                 }}
//                 onPointerUp={() => {
//                   setExitToDesktopPressed(false)
//                 }}
//                 onPointerOut={() => {
//                   setExitToDesktopPressed(false)
//                 }}
//                 className={`${exitToDesktopPressed ? 'thick_purple_btn_pressed' : 'thick_purple_btn'} footer_container_exit_to_desktop`}
//                 onKeyDown={exitApplication}
//                 onClick={setExitPopup}
//                 type='button'
//                 style={exitPopupStatus ? { pointerEvents: 'none' } : {}}
//               >
//                 {UiLables.LABELS.EXIT_TO_DESKTOP}
//               </button>
//             )}
//             <div>
//               {isTeacherDashboard ? (
//                 <div>
//                   <div className='footer_container_user_name'>
//                     {/* {JSON.parse(localStorage.getItem("userDetail"))?.payload
//                       ?.data?.user[0]?.firstName || ""}{" "}
//                     {JSON.parse(localStorage.getItem("userDetail"))?.payload
//                       ?.data?.user[0]?.lastName || ""} */}
//                   </div>
//                   <div>
//                     <button
//                       onPointerDown={() => {
//                         setLogoutPressed(true)
//                       }}
//                       onPointerUp={() => {
//                         setLogoutPressed(false)
//                       }}
//                       onPointerOut={() => {
//                         setLogoutPressed(false)
//                       }}
//                       className={`${logoutPressed ? 'thick_purple_btn_pressed' : 'thick_purple_btn'} footer_container_logout_dashboard`}
//                       onKeyDown={exitApplication}
//                       onClick={setLogoutPopup}
//                       type='button'
//                       style={logoutPopupStatus ? { pointerEvents: 'none' } : {}}
//                     >
//                       {UiLables.LABELS.LOG_OUT}
//                     </button>
//                     <button
//                       onPointerDown={() => {
//                         setExitToDesktopPressed(true)
//                       }}
//                       onPointerUp={() => {
//                         setExitToDesktopPressed(false)
//                       }}
//                       onPointerOut={() => {
//                         setExitToDesktopPressed(false)
//                       }}
//                       className={`${
//                         exitToDesktopPressed ? 'thick_purple_btn_pressed' : 'thick_purple_btn'
//                       } footer_container_exit_to_desktop_dashboard`}
//                       onKeyDown={exitApplication}
//                       onClick={setExitPopup}
//                       type='button'
//                       style={exitPopupStatus ? { pointerEvents: 'none' } : {}}
//                     >
//                       {UiLables.LABELS.EXIT_TO_DESKTOP}
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <></>
//               )}
//             </div>
//           </div>
//         ) : (
//           <></>
//         )}
//       </div>
//       <div className='footer_container_line1'>
//         {/* TO DO: client name should retrive from DB */}
//         &copy; {new Date().getFullYear()}
//         {` ${productDetails.copyright}`} {UiLables.LABELS.ALL_RIGHTS_RESERVED}
//       </div>
//       <div className='footer_container_line2'>
//         <span className='footer_container_line2_version'>{/* {UiLables.LABELS.VERSION} {applicationVersion} */}</span>
//         <span>
//           {RoutePaths.EULA !== location.pathname &&
//           RoutePaths.PRIVACY_POLICY !== location.pathname &&
//           RoutePaths.GENERAL_MESSAGE !== location.pathname &&
//           RoutePaths.DYNAMIC_LOADER !== location.pathname ? (
//             <span>
//               {' '}
//               |{' '}
//               <Link className='footer_container_line2_links' to='/login/privacy-policy' state={{ from: location.pathname }}>
//                 {UiLables.LABELS.PRIVACY_POLICY}
//               </Link>{' '}
//               |{' '}
//               <Link className='footer_container_line2_links' to='/login/eula' state={{ from: location.pathname }}>
//                 {UiLables.LABELS.EULA}
//               </Link>
//             </span>
//           ) : (
//             <></>
//           )}
//         </span>
//       </div>
//     </div>
//   )
// }
const Footer = ()=> {
  return(
    <>Footer</>
  )
}
export default Footer
