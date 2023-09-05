
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
import './Eula.scss';
// import UiLables from 'renderer/constants/UiLables.constants';
// import buttonClickSound from 'renderer/utils/ButtonClick.util';
// import { acceptEula } from 'renderer/services/Auth.service';
// import log from 'loglevel';
// import RoutePaths from 'renderer/constants/RoutePaths.constants';
// import getExploreWpsDetails from 'renderer/services/exploreWps.service';
// import { logoutUser } from 'renderer/utils/AwsCognito.util';

// interface IProps {
//   productDetails: any;
//   loginDetails: any;
//   eulaDetails: any;
//   setGeneralMessage: any;
//   setLoginDetails: (data: any) => void;
//   setEulaDetails: (data: any) => void;
//   setIsLogoutOnAccessPanel: (data: boolean) => void;
//   startInactivityTimer: () => void;
// }

// const Eula: React.FC<IProps> = ({
//   productDetails,
//   loginDetails,
//   eulaDetails,
//   setGeneralMessage,
//   setLoginDetails,
//   setEulaDetails,
//   setIsLogoutOnAccessPanel,
//   startInactivityTimer,
// }: IProps) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   let hasVerticalScrollbar: boolean;
//   let scrollBarBottom: boolean;
//   let eulaButton: any;

//   const [isEulaAccepted, setIsEulaAccepted] = useState(false);
//   const [eulaObject, setEulaObject] = useState({
//     version: '',
//     content: '',
//   });
//   const [bottom, setBottom] = useState(false);
//   const [down, setDown] = useState(false);
//   const [pressed, setPressed] = useState(false);
//   const [press, setPress] = useState(false);
//   const eulaLatestVersion = localStorage.getItem('eulaLatestVersion');
//   const userId = localStorage.getItem('userId');
//   const [eulaContentFromS3, setEulaContentFromS3] = useState('');

//   if (Object.keys(loginDetails).length !== 0 && isEulaAccepted) {
//     startInactivityTimer();
//   }
//   window.electron.ipcRenderer.sendMessage('destroy-browser-view', []);

//   let acceptedEulaUserDetails: any = localStorage.getItem(
//     'acceptedEulaUserDetails'
//   );

//   if (acceptedEulaUserDetails) {
//     acceptedEulaUserDetails = JSON.parse(acceptedEulaUserDetails);
//   } else {
//     acceptedEulaUserDetails = [];
//   }

//   let userIndex: any;
//   const eulaContentFromLocalStorage: any = JSON.parse(
//     localStorage.getItem('productDetails')
//   );

//   useEffect(() => {
//     if (Object.keys(loginDetails).length === 0) {
//       setEulaObject(productDetails.eula);
//     } else {
//       userIndex = acceptedEulaUserDetails.findIndex(
//         (element: any) => element.userId === userId
//       );
//       if (userIndex !== -1) {
//         if (
//           acceptedEulaUserDetails[userIndex].eulaVersion === eulaLatestVersion
//         ) {
//           setIsEulaAccepted(true);
//         } else {
//           setIsEulaAccepted(false);
//         }
//       } else {
//         setIsEulaAccepted(false);
//       }
//       setEulaObject(productDetails.eula);
//     }
//     const s3Link = eulaContentFromLocalStorage.eulaContent;
//     const getEulaContent = async () => {
//       const response = await fetch(s3Link);
//       const text = response.text();
//       setEulaContentFromS3(await text);
//     };

//     getEulaContent();

//     const scrollableArea: any =
//       document.getElementsByClassName('eula_text_area');
//     hasVerticalScrollbar =
//       scrollableArea.eula_content.scrollHeight >
//       scrollableArea.eula_content.clientHeight;
//     if (hasVerticalScrollbar && scrollBarBottom) {
//       setBottom(!hasVerticalScrollbar);
//     } else if (!hasVerticalScrollbar) {
//       setBottom(true);
//     }
//   }, [loginDetails, eulaDetails, isEulaAccepted, setIsEulaAccepted]);

//   // handles and reports when scroll bar touches the bottom
//   const handleScroll = (e: any) => {
//     if (!bottom) {
//       scrollBarBottom =
//         e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
//       setBottom(scrollBarBottom);
//     }
//     if (Object.keys(loginDetails).length !== 0 && isEulaAccepted) {
//       startInactivityTimer();
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('userIdToken');
//     localStorage.removeItem('refreshToken');
//     localStorage.removeItem('userIdtokenExpiry');
//     localStorage.removeItem('email');
//     localStorage.removeItem('userId');
//     setLoginDetails({});
//     navigate(RoutePaths.LOGIN_CARD);
//     setIsLogoutOnAccessPanel(true);
//     sessionStorage.removeItem('upgradePopupDisplayed');
//     window.electron.ipcRenderer.sendMessage(
//       'remove_classlink_clever_cookies',
//       []
//     );
//   };

//   // handle back button pressed
//   const handleBackPress = () => {
//     buttonClickSound();
//     setPress(true);
//   };

//   // handle back button release
//   const handleBackRelease = () => {
//     setPress(false);
//     navigate(-1);
//   };

//   // handle back button out of focus
//   const handleBackOut = () => {
//     setPress(false);
//   };

//   // handle accept button pressed
//   const pressAccept = () => {
//     setDown(true);
//     buttonClickSound();
//   };

//   const setPath = (navigatePath: string) => {
//     navigate(navigatePath);
//   };

//   const continueToLoginCard = () => {
//     setPath(RoutePaths.LOGIN_CARD);
//   };

//   // handle accept button released
//   const releaseAccept = () => {
//     // To Do integrate info wrt Api
//     setBottom(false);
//     setDown(false);
//     // console.log('Eula is accepted', );
//     const requestBody = {
//       // TO DO: licience
//       // licience: '1234',
//       userId: localStorage.getItem('userId'),
//     };
//     getExploreWpsDetails()
//       .then((res) => {
//         localStorage.setItem('gameDetails', JSON.stringify(res));
//       })
//       .catch((error) => {
//         log.error(error);
//         if (error.response.status === 422) {
//           logoutUser();
//           localStorage.removeItem('userIdToken');
//           localStorage.removeItem('refreshToken');
//           localStorage.removeItem('userIdtokenExpiry');
//           localStorage.removeItem('email');
//           localStorage.removeItem('accessToken');
//           localStorage.removeItem('userId');
//           localStorage.removeItem('sub');
//           sessionStorage.removeItem('upgradePopupDisplayed');
//           window.electron.ipcRenderer.sendMessage(
//             'remove_classlink_clever_cookies',
//             []
//           );
//           setGeneralMessage({
//             errorCode: 'API_EMAIL_UPDATE_1001',
//             PrimaryBtnFn: continueToLoginCard,
//             SecondaryBtnFn: '',
//           });
//           setPath(RoutePaths.GENERAL_MESSAGE);
//         } else {
//           navigate(RoutePaths.GENERAL_MESSAGE, {
//             state: {
//               errorCode: 'API-1001',
//               P2: error.response.status,
//               P3: error.message,
//             },
//           });
//         }
//       });

//     acceptEula(requestBody)
//       .then((res) => {
//         if (res && res.statusCode === 200) {
//           setIsEulaAccepted(true);
//           navigate(RoutePaths.DYNAMIC_LOADER);
//           userIndex = acceptedEulaUserDetails.findIndex(
//             (element: any) => element.userId === userId
//           );
//           if (userIndex === -1) {
//             acceptedEulaUserDetails.push({
//               userId,
//               eulaVersion: eulaLatestVersion,
//             });
//           } else {
//             acceptedEulaUserDetails[userIndex].eulaVersion = eulaLatestVersion;
//           }
//           localStorage.setItem(
//             'acceptedEulaUserDetails',
//             JSON.stringify(acceptedEulaUserDetails)
//           );
//         }
//       })
//       .catch((error) => {
//         log.error(error);
//         navigate(RoutePaths.GENERAL_MESSAGE, {
//           state: {
//             errorCode: 'API-1001',
//             P2: error.response.status,
//             P3: error.message,
//           },
//         });
//       });
//     setIsLogoutOnAccessPanel(true);
//   };

//   // handle when pointer goes out of button
//   const outOfAccept = () => {
//     setDown(false);
//   };

//   // handle decline button pressed
//   const pressDecline = () => {
//     buttonClickSound();
//     setPressed(true);
//   };

//   // handle decline button pressed
//   const releaseDecline = () => {
//     setPressed(false);
//     logout();
//   };

//   // handle when pointer goes out of button
//   const outOfDecline = () => {
//     setPressed(false);
//   };

//   // Handling KeyBoardAccessiblities
//   // handle decline button pressed
//   const handleKeyDownDecline = (keyEvent: { key: string }) => {
//     if (keyEvent.key === 'Enter') {
//       pressDecline();
//     }
//   };

//   // handle decline button released
//   const handleKeyUpDecline = (keyEvent: { key: string }) => {
//     if (keyEvent.key === 'Enter') {
//       releaseDecline();
//     }
//   };

//   // handle accept button pressed
//   const handleKeyDownAccept = (keyEvent: { key: string }) => {
//     if (keyEvent.key === 'Enter') {
//       pressAccept();
//     }
//   };

//   // handle accept button released
//   const handleKeyUpAccept = (keyEvent: { key: string }) => {
//     if (keyEvent.key === 'Enter') {
//       releaseAccept();
//     }
//   };

//   // handle back button pressed
//   const handleKeyDownBack = (keyEvent: { key: string }) => {
//     if (keyEvent.key === 'Enter') {
//       handleBackPress();
//     }
//   };

//   // handle back button released
//   const handleKeyUpBack = (keyEvent: { key: string }) => {
//     if (keyEvent.key === 'Enter') {
//       handleBackRelease();
//     }
//   };

//   const htmlCode = eulaContentFromS3;
//   const div = document.getElementById('eulaContent');
//   if (div) {
//     div.innerHTML = htmlCode;
//     const eulaContent = div.textContent;
//   }

//   // display the EULA content
//   const content = <div id="eulaContent" />;

//   if (Object.keys(loginDetails).length === 0) {
//     eulaButton = (
//       <div className="eula_btn_container">
//         <button
//           type="button"
//           data-testid="back"
//           className={`eula_btn_accept ${
//             press ? 'light_blue_btn_pressed' : 'light_blue_btn'
//           }`}
//           onPointerDown={handleBackPress}
//           onKeyDown={handleKeyDownBack}
//           onPointerUp={handleBackRelease}
//           onKeyUp={handleKeyUpBack}
//           onPointerOut={handleBackOut}
//         >
//           {' '}
//           Back{' '}
//         </button>
//       </div>
//     );
//   } else if (!isEulaAccepted) {
//     eulaButton = (
//       <div className="eula_btn_container">
//         <button
//           type="button"
//           data-testid="decline"
//           className={`eula_btn_decline ${
//             pressed ? 'thick_purple_btn_pressed' : 'thick_purple_btn'
//           }`}
//           onPointerDown={pressDecline}
//           onKeyDown={handleKeyDownDecline}
//           onPointerUp={releaseDecline}
//           onKeyUp={handleKeyUpDecline}
//           onPointerOut={outOfDecline}
//         >
//           Decline{' '}
//         </button>
//         <button
//           type="button"
//           data-testid="accept"
//           className={`eula_btn_accept ${
//             down ? 'light_blue_btn_pressed' : 'light_blue_btn'
//           }`}
//           disabled={!bottom}
//           onPointerDown={pressAccept}
//           onKeyDown={handleKeyDownAccept}
//           onPointerUp={releaseAccept}
//           onKeyUp={handleKeyUpAccept}
//           onPointerOut={outOfAccept}
//         >
//           {' '}
//           Accept{' '}
//         </button>
//       </div>
//     );
//   } else if (isEulaAccepted) {
//     eulaButton = (
//       <div className="eula_btn_container">
//         <button
//           type="button"
//           data-testid="back"
//           className={`eula_btn_accept ${
//             press ? 'light_blue_btn_pressed' : 'light_blue_btn'
//           }`}
//           onPointerDown={handleBackPress}
//           onKeyDown={handleKeyDownBack}
//           onPointerUp={handleBackRelease}
//           onKeyUp={handleKeyUpBack}
//           onPointerOut={handleBackOut}
//         >
//           {' '}
//           Back{' '}
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="eula_page_container fade_in_animation_for_container">
//       <div className="eula_page_heading">{UiLables.LABELS.EULA_HEADING}</div>
//       {/* To Do : Update the version wrt api */}
//       <div className="eula_version">
//         {`${UiLables.LABELS.EULA} ${UiLables.LABELS.VERSION}: v${
//           eulaObject && eulaObject?.version
//             ? eulaObject.version
//             : productDetails?.eula?.version
//         }`}
//       </div>
//       <div
//         className="eula_text_area"
//         id="eula_content"
//         tabIndex={0}
//         onScroll={handleScroll}
//       >
//         {content}
//       </div>
//       {eulaButton}
//     </div>
//   );
// };

// export default Eula;

// import React from "react";

const Eula = () => {
  return (
    <>
    <div className='eula_page_container'>
      Eula Page
    </div>
    </>
  );
};

export default Eula;
