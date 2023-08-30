// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-use-before-define */
// /* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable react/button-has-type */
// /* eslint-disable import/no-unresolved */
// /* eslint-disable react/destructuring-assignment */
// import { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import "./GeneralMessage.scss";
// import buttonClickSound from "../../../utils/ButtonClick.util";
// import {
//   SpecificPaths,
//   RoutePaths,
// } from "../../../constants/Routepaths.constants";
// import GeneralMessageService from "../../../services/GeneralMessage.service";
// import tobeImg from "../../../../renderer/assets/images/tob_e.png";
// import exitToDesktopUtil from "../../../utils/ExitToDesktop.util";

// interface IProps {
//   messageContent: {
//     errorCode?: () => void;
//     PrimaryBtnFn?: () => void;
//     SecondaryBtnFn?: () => void;
//   };
// }

// const GeneralMessage = (props: IProps) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [pressed, setPressed] = useState(false);
//   const [down, setDown] = useState(false);
//   const [message, setMessage] = useState({
//     Header: "",
//     Subheader: "",
//     P1: "",
//     P2: "",
//     P3: "",
//     NavLink: "",
//     PrimaryBtn: "",
//     SecondaryBtn: "",
//   });
//   const [clicked, setClicked] = useState(false);
//   const [timeoutId, setTimeoutId] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);

//   const { errorCode, PrimaryBtnFn, SecondaryBtnFn } = props.messageContent;
//   const isUpdateAvailable =
//     String(localStorage.getItem("IS_UPDATE_AVAILABLE")) || null;
//   const isAdmin = String(localStorage.getItem("adminPrivilege")) || null;
//   const updateCounter = Number(String(localStorage.getItem("updateCounter")));

//   useEffect(() => {
//     if (
//       isUpdateAvailable === "true" &&
//       location.state?.errorCode === "UP-1001" &&
//       ((isAdmin === "true" && !timeoutId) ||
//         (isAdmin !== "true" &&
//           (updateCounter === 1 || updateCounter === 5) &&
//           !timeoutId))
//     ) {
//       const newTimeoutId = setTimeout(() => {
//         setClicked(true);
//         handleAppUpdate();
//       }, 15000);
//       // setTimeoutId(newTimeoutId);
//       setIsRunning(true);
//     }
//     // When the component unmounts or the timeout is cleared, reset the state
//     return () => {
//       clearTimeout(timeoutId);
//       setIsRunning(false);
//       setTimeoutId(0);
//     };
//   }, [isUpdateAvailable, isAdmin, updateCounter, location.state?.errorCode]);

//   useEffect(() => {
//     // calling IPC exposed from preload script
//     window.electron.ipcRenderer.on(
//       "inform-update-is-downloaded",
//       (arg: any) => {
//         if (!timeoutId) {
//           const newTimeoutId = setTimeout(() => {
//             setClicked(true);
//             handleAppUpdate();
//           }, 15000);
//           setTimeoutId(newTimeoutId);
//           setIsRunning(true);
//         }
//       }
//     );
//     return () => {
//       clearTimeout(timeoutId);
//       setIsRunning(false);
//       setTimeoutId(0);
//     };
//   });

//   if (errorCode !== undefined) {
//     useEffect(() => {
//       setMessage(GeneralMessageService(errorCode));
//     }, [errorCode]);
//   } else {
//     useEffect(() => {
//       // if the input has p2 and p3 variable which comes from API failures
//       if (
//         (location.state.p2 !== "" ||
//           location.state.p2 !== undefined ||
//           location.state.p2 !== null) &&
//         (location.state.p3 !== "" ||
//           location.state.p3 !== undefined ||
//           location.state.p3 !== null)
//       ) {
//         setMessage(
//           GeneralMessageService(
//             location.state.errorCode,
//             location.state.P2,
//             location.state.P3
//           )
//         );
//       }
//       // if the input has p2 variable which comes from Login card
//       else if (
//         location.state.p2 !== "" ||
//         location.state.p2 !== undefined ||
//         location.state.p2 !== null
//       ) {
//         setMessage(
//           GeneralMessageService(location.state.errorCode, location.state.P2)
//         );
//       } else {
//         setMessage(GeneralMessageService(location.state.errorCode));
//       }
//     }, [location.state.errorCode]);
//   }

//   const navigateToLogin = () => {
//     navigate(SpecificPaths.LOGIN_CARD);
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("userIdToken");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("userIdtokenExpiry");
//     localStorage.removeItem("email");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("sub");
//     localStorage.removeItem("userDetail");
//     sessionStorage.removeItem("upgradePopupDisplayed");
//     window.electron.ipcRenderer.sendMessage(
//       "remove_classlink_clever_cookies",
//       []
//     );
//   };

//   const handleSecondaryBtnDown = () => {
//     setPressed(true);
//     buttonClickSound();
//   };

//   const handleAppUpdate = () => {
//     setClicked(false);
//     window.electron.ipcRenderer.sendMessage("autoupdate-message", [
//       "quitAndInstall",
//     ]);
//   };

//   const handleSecondaryBtnUp = () => {
//     setPressed(false);
//     if (SecondaryBtnFn) {
//       SecondaryBtnFn();
//     }
//     if (message.SecondaryBtn === "Log Out") {
//       navigateToLogin();
//     }
//     if (message.SecondaryBtn === "Exit App") {
//       if (
//         String(errorCode)?.includes("CLSLINK") ||
//         String(errorCode)?.includes("CLEVER")
//       ) {
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("userIdToken");
//         localStorage.removeItem("refreshToken");
//         localStorage.removeItem("userIdtokenExpiry");
//         localStorage.removeItem("email");
//         localStorage.removeItem("userId");
//         localStorage.removeItem("sub");
//         localStorage.removeItem("userDetail");
//         sessionStorage.removeItem("upgradePopupDisplayed");
//         window.electron.ipcRenderer.sendMessage(
//           "remove_classlink_clever_cookies",
//           []
//         );
//         exitToDesktopUtil();
//       } else {
//         exitToDesktopUtil();
//       }
//     }
//   };

//   const handlePrimaryBtnDown = () => {
//     setDown(true);
//     buttonClickSound();
//   };

//   const handlePrimaryBtnUp = () => {
//     setDown(false);
//     if (PrimaryBtnFn) {
//       PrimaryBtnFn();
//     }
//     if (message.PrimaryBtn === "Continue") {
//       handleAppUpdate();
//     }
//     if (message.PrimaryBtn === "Login") {
//       navigateToLogin();
//     }
//     if (message.PrimaryBtn === "Back") {
//       if (
//         String(errorCode)?.includes("CLSLINK") ||
//         String(errorCode)?.includes("CLEVER")
//       ) {
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("userIdToken");
//         localStorage.removeItem("refreshToken");
//         localStorage.removeItem("userIdtokenExpiry");
//         localStorage.removeItem("email");
//         localStorage.removeItem("userId");
//         localStorage.removeItem("sub");
//         localStorage.removeItem("userDetail");
//         sessionStorage.removeItem("upgradePopupDisplayed");
//         window.electron.ipcRenderer.sendMessage(
//           "remove_classlink_clever_cookies",
//           []
//         );
//         navigate(RoutePaths.LOGIN_CARD);
//       } else {
//         navigate(-1);
//       }
//     }
//     if (message.PrimaryBtn === "Exit App") {
//       exitToDesktopUtil();
//     }
//   };

//   const handlePrimaryBtnOut = () => {
//     setDown(false);
//   };

//   const handleSecondaryBtnOut = () => {
//     setPressed(false);
//   };

//   const handleKeyDownPrimary = (keyEvent: { key: string }) => {
//     if (keyEvent.key === "Enter") {
//       handlePrimaryBtnDown();
//     }
//   };

//   const handleKeyDownSecondary = (keyEvent: { key: string }) => {
//     if (keyEvent.key === "Enter") {
//       handleSecondaryBtnDown();
//     }
//   };

//   const handleKeyUpPrimary = (keyEvent: { key: string }) => {
//     if (keyEvent.key === "Enter") {
//       handlePrimaryBtnUp();
//       if (PrimaryBtnFn) {
//         PrimaryBtnFn();
//       }
//     }
//   };

//   const handleKeyUpSecondary = (keyEvent: { key: string }) => {
//     if (keyEvent.key === "Enter") {
//       handleSecondaryBtnDown();
//       if (SecondaryBtnFn) {
//         SecondaryBtnFn();
//       }
//     }
//   };

//   return (
//     <>
//       <div className="general_msg_container fade_in_animation_for_container">
//         <div className="general_msg_header">{message.Header}</div>
//         <hr className="general_msg_hr" />
//         <div className="general_msg_items_container">
//           <div className="general_msg_tobe">
//             <img
//               draggable="false"
//               className="general_msg_tobe_img"
//               src={tobeImg}
//               alt="Tob-E"
//             />
//           </div>
//           <div className="general_msg_content">
//             <div className="general_msg_subheader">{message.Subheader}</div>
//             <div className="general_msg_text">
//               {message.P1}
//               <br />
//               <br />
//               {message.P2}
//               {message.P3.length > 0 ? (
//                 <>
//                   <br />
//                   <br />
//                   {message.P3}
//                 </>
//               ) : null}
//             </div>
//             <div className="general_msg_link">
//               {message.NavLink?.length > 0 && (
//                 <Link to={message.NavLink}>This is Link</Link>
//               )}
//             </div>
//             <div
//               className={` ${
//                 String(errorCode) === "UPGRADE_1001"
//                   ? "general_msg_for_upgrade_info"
//                   : "general_msg_btns"
//               }`}
//             >
//               {message.SecondaryBtn?.length > 0 && (
//                 <button
//                   className={`${
//                     String(errorCode) === "UPGRADE_1001"
//                       ? `general_msg_primary_btn ${
//                           down ? "light_blue_btn_pressed" : "light_blue_btn"
//                         }`
//                       : `general_msg_secondary_btn ${
//                           pressed
//                             ? "thick_purple_btn_pressed"
//                             : "thick_purple_btn"
//                         }`
//                   }`}
//                   onPointerDown={handleSecondaryBtnDown}
//                   onPointerUp={handleSecondaryBtnUp}
//                   onKeyDown={handleKeyDownSecondary}
//                   onKeyUp={handleKeyUpSecondary}
//                   onPointerOut={handleSecondaryBtnOut}
//                 >
//                   {message.SecondaryBtn}
//                 </button>
//               )}
//               {message.PrimaryBtn?.length > 0 && (
//                 <button
//                   className={`general_msg_primary_btn ${
//                     down ? "light_blue_btn_pressed" : "light_blue_btn"
//                   }`}
//                   onPointerDown={handlePrimaryBtnDown}
//                   onPointerUp={handlePrimaryBtnUp}
//                   onKeyDown={handleKeyDownPrimary}
//                   onKeyUp={handleKeyUpPrimary}
//                   onPointerOut={handlePrimaryBtnOut}
//                 >
//                   {message.PrimaryBtn}
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default GeneralMessage;

// import React from "react";

const GeneralMessage = () => {
  return <div>General Message</div>;
};
export default GeneralMessage;
