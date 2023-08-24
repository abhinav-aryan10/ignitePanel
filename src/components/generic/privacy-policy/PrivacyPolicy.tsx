// /* eslint-disable react/no-danger */
// /* eslint-disable promise/always-return */
// /* eslint-disable no-console */
// /* eslint-disable import/no-unresolved */
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
// /* eslint-disable import/no-named-as-default */
// import { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import UiLables from 'renderer/constants/UiLables.constants';
// import buttonClickSound from 'renderer/utils/ButtonClick.util';
// import './PrivacyPolicy.scss';
// import RoutePaths from 'renderer/constants/RoutePaths.constants';

// interface IProps {
//   productDetails: any;
//   loginDetails: any;
//   startInactivityTimer: () => void;
// }

// const PrivacyPolicy = ({ productDetails, loginDetails, startInactivityTimer }: IProps) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [press, setPress] = useState(false);
//   const [policyDetails, setPolicyDetails] = useState('');

//   if (Object.keys(loginDetails).length !== 0) {
//     startInactivityTimer();
//   }
//   window.electron.ipcRenderer.sendMessage('destroy-browser-view', []);

//   useEffect(() => {
//     const getPrivacyDetails = async () => {
//       const response = await fetch(productDetails.privacyPolicy);
//       const text = response.text();
//       setPolicyDetails(await text);
//     };
//     getPrivacyDetails();
//   }, []);

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

//   const htmlCode = policyDetails;
//   const div = document.getElementById('privacy_policy_content');
//   if (div) {
//     div.innerHTML = htmlCode;
//     const policyText = div.textContent;
//   }

//   const handleScroll = (e: any) => {
//     if (Object.keys(loginDetails).length !== 0) {
//       startInactivityTimer();
//     }
//   };

//   return (
//     <div className="privacy_policy_container fade_in_animation_for_container">
//       <div className="privacy_policy_heading">
//         {UiLables.LABELS.PRIVACY_POLICY}
//       </div>
//       <div
//         className="privacy_policy_text_area"
//         id="privacy_policy_text_area"
//         tabIndex={0}
//         onScroll={handleScroll}
//       >
//         <div className="privacy_policy_content" id="privacy_policy_content" />
//       </div>
//       <div className="privacy_policy_btn_container">
//         <button
//           type="button"
//           data-testid="back"
//           className={`privacy_policy_btn_back ${
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
//     </div>
//   );
// };

// export default PrivacyPolicy;

import React from "react";

const PrivacyPolicy = () => {
  return <div>This is Privacy Policy </div>;
};

export default PrivacyPolicy;
