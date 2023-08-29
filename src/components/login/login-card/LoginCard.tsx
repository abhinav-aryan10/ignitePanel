// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable jsx-a11y/no-autofocus */
// /* eslint-disable import/no-unresolved */
// /* eslint-disable import/no-named-as-default */
// /* eslint-disable jsx-a11y/label-has-associated-control */
// /* eslint-disable jsx-a11y/no-static-element-interactions */
// /* eslint-disable jsx-a11y/click-events-have-key-events */
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { emailMaxLength } from '../../../configs/Login.config';
// import UiLables from '../../../constants/UiLables.constants';
// import { ILoginValidations } from '../../../interfaces/Login.interface';
// import Regex from '../../../utils/Regex.util';
// import './LoginCard.scss';
// import buttonClickSound from '../../../utils/ButtonClick.util';
// import { getUserDetails, loginUser } from '../../../services/Auth.service';
// import { RoutePaths } from '../../../constants/Routepaths.constants';
// import CircularLoader from '../../generic/circular-loader/CircularLoader';
// import exitToDesktopUtil from '../../../utils/ExitToDesktop.util';
// import log from 'loglevel';
// import ErrorMessagePopup from '../../generic/validation-tooltip/ValidationTooltip';
// import Errors from '../../../constants/Error.constants';
// import Global from '../../../constants/Global.constants';
// import getExploreWpsDetails from '../../../services/exploreWps.service';
// import { logoutUser } from '../../../utils/AwsCognito.util';
// import React from 'react';

// const showPasswordIcon = require('../../../assets/icons/show_password.png');
// const dontShowPasswordIcon = require('../../../assets/icons/dont_show_password.png');

// interface IProps {
//   setLoginDetails: (data: any) => void;
//   setEulaDetails: (data: any) => void;
//   productDetails: any;
//   setGeneralMessage: (data: any) => void;
//   setIsLogoutOnAccessPanel: (data: any) => void;
//   setDisplayGearBox: (data: any) => void;
// }

// const validateInputsObject: ILoginValidations = {
//   email: {
//     display: false,
//     message: ''
//   },
//   password: {
//     display: false,
//     message: ''
//   }
// };

// const LoginCard: React.FC<IProps> = ({
//   setLoginDetails,
//   // setEulaDetails,
//   // productDetails,
//   setGeneralMessage,
//   setIsLogoutOnAccessPanel,
//   setDisplayGearBox
// }: IProps) => {
//   const navigate = useNavigate();
//   const setPath = (navigatePath: string) => {
//     // console.log(navigatePath);
//     navigate(navigatePath);
//   };

//   const [isShowPasswordEnabled, setIsShowPasswordEnabled] = useState(true);
//   const [emailAddress, setEmailAddress] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginPressed, setLoginPressed] = useState(false);
//   const [forgetPasswordPressed, setForgetPasswordPressed] = useState(false);
//   const [validateInputs, setValidateInputs] = useState(validateInputsObject);
//   const [isLoginInprogress, setIsLoginInprogress] = useState(false);
//   const [showCircularLoader, setShowCircularLoader] = useState(false);
//   const [disableInputs, setDisableInputs] = useState(false);

//   // const eulaAcceptedVersion = localStorage.getItem('acceptedEulaVersion');
//   let acceptedEulaUserDetails: any = localStorage.getItem('acceptedEulaUserDetails');
//   // let loggedInUserDetails: {
//   //   status: string;
//   //   data: {
//   //     token: '';
//   //     idToken: '';
//   //     email: '';
//   //     exp: '';
//   //     refreshToken: '';
//   //     sub: '';
//   //   };
//   // };

//   let loggedInUserDetails: any;

//   let userId: any;
//   const eulaLatestVersion = 1.0;
//   let userIndex: any;
//   if (acceptedEulaUserDetails) {
//     acceptedEulaUserDetails = JSON.parse(acceptedEulaUserDetails);
//   } else {
//     acceptedEulaUserDetails = [];
//   }

//   const checkIfLatestEulaAccepted = () => {
//     userId = localStorage.getItem('userId');
//     userIndex = acceptedEulaUserDetails.findIndex((element: any) => element.userId === userId);
//     if (userIndex !== -1) {
//       if (acceptedEulaUserDetails[userIndex].eulaVersion === eulaLatestVersion) {
//         getExploreWpsDetails()
//           .then((res: any) => {
//             localStorage.setItem('gameDetails', JSON.stringify(res));
//           })
//           .catch((error: any) => {
//             log.error(error);
//             if (error.response.status === 422) {
//               logoutUser();
//               localStorage.removeItem('userIdToken');
//               localStorage.removeItem('refreshToken');
//               localStorage.removeItem('userIdtokenExpiry');
//               localStorage.removeItem('email');
//               localStorage.removeItem('accessToken');
//               localStorage.removeItem('userId');
//               localStorage.removeItem('sub');
//               sessionStorage.removeItem('upgradePopupDisplayed');
//               setGeneralMessage({
//                 errorCode: 'API_EMAIL_UPDATE_1001',
//                 PrimaryBtnFn: continueToLoginCard,
//                 SecondaryBtnFn: ''
//               });
//               setPath(RoutePaths.GENERAL_MESSAGE);
//             } else {
//               navigate(RoutePaths.GENERAL_MESSAGE, {
//                 state: {
//                   errorCode: 'API-1001',
//                   P2: error.response.status,
//                   P3: error.message
//                 }
//               });
//             }
//           });
//         navigate(RoutePaths.DYNAMIC_LOADER);
//       } else {
//         navigate(RoutePaths.EULA);
//       }
//     } else {
//       navigate(RoutePaths.EULA);
//     }

//     setIsLoginInprogress(false);
//     setShowCircularLoader(false);
//   };

//   // TO DO: Login persistent
//   const setLoginLocalStorage = (accessToken: string, idToken: string, refreshToken: string, expiry: any, email: any, sub: any) => {
//     localStorage.removeItem('accessToken');
//     localStorage.setItem('accessToken', accessToken);
//     localStorage.removeItem('userIdToken');
//     localStorage.setItem('userIdToken', idToken);
//     localStorage.removeItem('refreshToken');
//     localStorage.setItem('refreshToken', refreshToken);
//     localStorage.removeItem('userIdtokenExpiry');
//     localStorage.setItem('userIdtokenExpiry', expiry);
//     localStorage.removeItem('email');
//     localStorage.setItem('email', email);
//     localStorage.removeItem('sub');
//     localStorage.setItem('sub', sub);
//   };

//   // TO DO: Re login
//   const reLoginToCognito = () => {
//     loginUser({
//       email: emailAddress.toLowerCase(),
//       password
//     });
//   };
//   const logout = () => {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('userIdToken');
//     localStorage.removeItem('refreshToken');
//     localStorage.removeItem('userIdtokenExpiry');
//     localStorage.removeItem('email');
//     localStorage.removeItem('userId');
//     localStorage.removeItem('sub');
//     sessionStorage.removeItem('upgradePopupDisplayed');
//     setLoginDetails({});
//   };

//   const continueToLoginCard = () => {
//     setPath(RoutePaths.LOGIN_CARD);
//   };

//   const checkValidations = async () => {
//     if (emailAddress !== '' && password !== '' && !isLoginInprogress) {
//       buttonClickSound();
//       setDisableInputs(true);
//       setIsLoginInprogress(true);
//       setShowCircularLoader(true);
//       if (!Regex.email.test(emailAddress)) {
//         setValidateInputs({
//           email: {
//             display: true,
//             message: UiLables.VALIDATIONS.EMAIL_NOT_VALID
//           },
//           password: {
//             display: false,
//             message: ''
//           }
//         });
//         setIsLoginInprogress(false);
//         setShowCircularLoader(false);
//         setDisableInputs(false);
//         document.getElementById('emailInput')?.focus();
//       } else {
//         // TO DO: login API call will happen here
//         // sample loginResponse 0 -> No userInfo, 1 -> Liceince expired, 2 -> Logged in
//         loggedInUserDetails = await loginUser({
//           email: emailAddress.toLowerCase(),
//           password
//         }).catch((error: any) => {
//           console.log(error);
//           if (
//             error.rejectErrorCode === Global.Constants.incorrectLoginCredentials &&
//             error.rejectError === Global.Constants.expiredUserText
//           ) {
//             setValidateInputs({
//               email: {
//                 display: true,
//                 message: ''
//               },
//               password: {
//                 display: true,
//                 message: UiLables.VALIDATIONS.PASSWORD_LICIENCE_EXPIRED
//               }
//             });
//           } else if (
//             error.rejectErrorCode === Global.Constants.incorrectLoginCredentials ||
//             error.rejectErrorCode === Global.Constants.userDoesNotExistText
//           ) {
//             setValidateInputs({
//               email: {
//                 display: true,
//                 message: ''
//               },
//               password: {
//                 display: true,
//                 message: UiLables.VALIDATIONS.PASSWORD_INCORRECT1
//               }
//             });
//           }
//           // if we get any errors from AWS it will navigate to general message
//           else {
//             navigate(RoutePaths.GENERAL_MESSAGE, {
//               state: {
//                 errorCode: Errors.AWS_COGNITO_ERROR,
//                 P2: error.rejectErrorCode
//               }
//             });
//           }
//           setShowCircularLoader(false);
//           setDisableInputs(false);
//         });
//         try {
//           if (loggedInUserDetails.status === 'logged-in') {
//             setLoginDetails(loggedInUserDetails?.data);
//             setLoginLocalStorage(
//               loggedInUserDetails?.data.token,
//               loggedInUserDetails?.data.idToken,
//               loggedInUserDetails?.data.refreshToken,
//               loggedInUserDetails?.data.exp,
//               loggedInUserDetails?.data.email,
//               loggedInUserDetails?.data.sub
//             );
//             setValidateInputs({
//               email: {
//                 display: false,
//                 message: ''
//               },
//               password: {
//                 display: false,
//                 message: ''
//               }
//             });
//             getUserDetails()
//               .then((userRes: any) => {
//                 userId = localStorage.setItem('userId', userRes.payload.data.user[0].id);
//                 const previousLoginTimestamp: any = new Date().getTime();
//                 localStorage.setItem('previousLoginTimestamp', JSON.stringify(previousLoginTimestamp));
//                 localStorage.setItem('loggedInVia', 'cognito');
//                 if (userRes.payload.data.user[0].role.includes('5')) {
//                   if (userRes.payload.data.license.success !== true) {
//                     setGeneralMessage({
//                       errorCode: 'R-1002',
//                       PrimaryBtnFn: exitToDesktopUtil,
//                       SecondaryBtnFn: logout
//                     });
//                     setIsLogoutOnAccessPanel(false);
//                     setDisplayGearBox(false);
//                     setPath(RoutePaths.GENERAL_MESSAGE);
//                   } else if (userRes.payload.data.user[0].resetRequired === 1) {
//                     sessionStorage.setItem('temporaryPassword', password);
//                     navigate(RoutePaths.CHANGE_PASSWORD);
//                     setIsLoginInprogress(false);
//                   } else {
//                     checkIfLatestEulaAccepted();
//                   }
//                 } else {
//                   setValidateInputs({
//                     email: {
//                       display: true,
//                       message: UiLables.VALIDATIONS.ONLY_TEACHER_CAN_USE_APP
//                     },
//                     password: {
//                       display: true,
//                       message: ''
//                     }
//                   });
//                   setDisableInputs(false);
//                   logout();
//                 }
//               })
//               .catch((error: any) => {
//                 log.error(error);
//                 if (error.response.status === 422) {
//                   logoutUser();
//                   localStorage.removeItem('userIdToken');
//                   localStorage.removeItem('refreshToken');
//                   localStorage.removeItem('userIdtokenExpiry');
//                   localStorage.removeItem('email');
//                   localStorage.removeItem('accessToken');
//                   localStorage.removeItem('userId');
//                   localStorage.removeItem('sub');
//                   sessionStorage.removeItem('upgradePopupDisplayed');
//                   setGeneralMessage({
//                     errorCode: 'API_EMAIL_UPDATE_1001',
//                     PrimaryBtnFn: continueToLoginCard,
//                     SecondaryBtnFn: ''
//                   });
//                   setPath(RoutePaths.GENERAL_MESSAGE);
//                 } else {
//                   navigate(RoutePaths.GENERAL_MESSAGE, {
//                     state: {
//                       errorCode: 'API-1001',
//                       P2: error.response.status,
//                       P3: error.message
//                     }
//                   });
//                 }
//               });
//           } else if (loggedInUserDetails?.status === 're-login') {
//             loggedInUserDetails = await reLoginToCognito();
//           } else {
//             console.log('User authentication failed');
//           }
//           document.getElementById('emailInput')?.focus();
//           setIsLoginInprogress(false);
//           setShowCircularLoader(false);
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     }
//   };

//   const focusPasswordInput = (keyEvent: { key: string }) => {
//     if (keyEvent.key === 'Enter') {
//       document.getElementById('passwordInput')?.focus();
//     }
//   };

//   const focusLoginButton = (keyEvent: { key: string; preventDefault: () => void }) => {
//     if (keyEvent.key === 'Enter') {
//       document.getElementById('loginButton')?.focus();
//       setShowCircularLoader(true);
//       setDisableInputs(true);
//       checkValidations();
//       keyEvent.preventDefault();
//     }
//   };

//   const focusClasslinkLoginBtn = (keyEvent: any) => {
//     if (keyEvent?.key === 'Enter') {
//       document.getElementById('classlink_login_btn')?.focus();
//       buttonClickSound();
//       setPath(RoutePaths.CLASSLINK_LOGIN);
//       keyEvent.preventDefault();
//     }
//   };

//   const focusCleverLoginBtn = (keyEvent: any) => {
//     if (keyEvent?.key === 'Enter') {
//       document.getElementById('clever_login_btn')?.focus();
//       buttonClickSound();
//       setPath(RoutePaths.CLEVER_LOGIN);
//       keyEvent?.preventDefault();
//     }
//   };

//   const handleClassLinkBtn = (position: any) => {
//     if (position === 'down') {
//       buttonClickSound();
//     } else if (position === 'up') {
//       setPath(RoutePaths.CLASSLINK_LOGIN);
//     }
//   };

//   const handleCleverBtn = (position: any) => {
//     if (position === 'down') {
//       buttonClickSound();
//     } else if (position === 'up') {
//       setPath(RoutePaths.CLEVER_LOGIN);
//     }
//   };

//   return (
//     <div className="login_card_container">
//       <div className="login_card_container_layout fade_in_animation_for_container">
//         <div className="login_card_container_inputs">
//           <div className="login_card_container_input_email">
//             <label className="login_card_container_input_label">
//               {UiLables.LABELS.EMAIL_ADDRESS}
//             </label>
//             <input
//               autoFocus
//               id="emailInput"
//               tabIndex={0}
//               className={`${
//                 validateInputs.email.display
//                   ? 'login_card_container_input_box_error'
//                   : ''
//               } login_card_container_input_box`}
//               type="text"
//               maxLength={emailMaxLength}
//               disabled={disableInputs}
//               style={disableInputs ? { color: 'gray' } : { color: '' }}
//               placeholder={UiLables.LABELS.EMAIL_PLACEHOLDER}
//               onKeyDown={focusPasswordInput}
//               onChange={(event) => {
//                 setEmailAddress(event.target.value);
//                 setValidateInputs(validateInputsObject);
//               }}
//               value={emailAddress}
//             />
//             {validateInputs.email.display &&
//             validateInputs.email.message !== '' ? (
//               <span className="login_card_container_input_error">
//                 <ErrorMessagePopup
//                   errorMessage={validateInputs.email.message}
//                 />
//               </span>
//             ) : (
//               <></>
//             )}
//           </div>
//           <div className="login_card_container_input_password">
//             <label className="login_card_container_input_label">
//               {UiLables.LABELS.PASSWORD}
//             </label>
//             {isShowPasswordEnabled ? (
//               <input
//                 id="passwordInput"
//                 className={`${
//                   validateInputs.password.display
//                     ? 'login_card_container_input_box_error'
//                     : ''
//                 } login_card_container_input_box`}
//                 type="password"
//                 placeholder={UiLables.LABELS.PASSWORD_PLACEHOLDER}
//                 disabled={disableInputs}
//                 style={disableInputs ? { color: 'gray' } : { color: '' }}
//                 onKeyDown={focusLoginButton}
//                 onChange={(event) => {
//                   setPassword(event.target.value);
//                   setValidateInputs(validateInputsObject);
//                 }}
//                 value={password}
//               />
//             ) : (
//               <input
//                 id="passwordInput"
//                 className={`${
//                   validateInputs.password.display
//                     ? 'login_card_container_input_box_error'
//                     : ''
//                 } login_card_container_input_box`}
//                 type="text"
//                 placeholder={UiLables.LABELS.PASSWORD_PLACEHOLDER}
//                 disabled={disableInputs}
//                 style={disableInputs ? { color: 'gray' } : { color: '' }}
//                 onKeyDown={focusLoginButton}
//                 onChange={(event) => {
//                   setPassword(event.target.value);
//                   setValidateInputs(validateInputsObject);
//                 }}
//                 value={password}
//               />
//             )}
//             <button
//               type="button"
//               id="passwordRevealButton"
//               className="login_card_container_input_password_showicon"
//               onClick={() => {
//                 setIsShowPasswordEnabled(!isShowPasswordEnabled);
//               }}
//             >
//               {isShowPasswordEnabled ? (
//                 <img
//                   draggable="false"
//                   src={showPasswordIcon}
//                   alt="Show Password"
//                 />
//               ) : (
//                 <img
//                   draggable="false"
//                   src={dontShowPasswordIcon}
//                   alt="Don't Show Password"
//                 />
//               )}
//             </button>
//             {validateInputs.password.display &&
//             validateInputs.password.message !== '' ? (
//               <span className="login_card_container_input_error">
//                 <ErrorMessagePopup
//                   errorMessage={validateInputs.password.message}
//                 />
//               </span>
//             ) : (
//               <></>
//             )}
//           </div>
//         </div>
//         <div className="login_card_container_forgetps_bt">
//           <button
//             onPointerDown={() => {
//               setForgetPasswordPressed(true);
//             }}
//             onPointerUp={() => {
//               setForgetPasswordPressed(false);
//             }}
//             onPointerOut={() => {
//               setForgetPasswordPressed(false);
//             }}
//             className={`${
//               forgetPasswordPressed
//                 ? 'thick_purple_btn_pressed'
//                 : 'thick_purple_btn'
//             }`}
//             type="button"
//             onClick={() => {
//               buttonClickSound();
//               navigate(RoutePaths.FORGET_PASSWORD);
//             }}
//           >
//             {UiLables.LABELS.FORGOT_PASSWORD}
//           </button>
//         </div>
//         {!showCircularLoader ? (
//           <div className="login_card_container_login_bt">
//             <button
//               disabled={emailAddress === '' || password === ''}
//               id="loginButton"
//               onPointerDown={() => {
//                 setLoginPressed(true);
//               }}
//               onPointerUp={() => {
//                 setLoginPressed(false);
//               }}
//               onPointerOut={() => {
//                 setLoginPressed(false);
//                 setShowCircularLoader(false);
//               }}
//               className={`${
//                 loginPressed ? 'light_blue_btn_pressed' : 'light_blue_btn'
//               } ${
//                 emailAddress === '' || password === '' ? 'btn_disabled' : ''
//               } ${isLoginInprogress ? 'btn_deactivated' : ''}`}
//               type="button"
//               onClick={checkValidations}
//             >
//               {UiLables.LABELS.LOG_IN}
//             </button>
//           </div>
//         ) : (
//           <div className="login_card_container_login_bt">
//             <CircularLoader />
//           </div>
//         )}
//       </div>
//       <div className="classlink_clever_containers">
//         <div className="clever_container">
//           <button
//             className="clever_login_btn"
//             id="clever_login_btn"
//             type="button"
//             onPointerDown={() => handleCleverBtn('down')}
//             onPointerOut={() => handleCleverBtn('out')}
//             onPointerUp={() => handleCleverBtn('up')}
//             onKeyDown={(event) => focusCleverLoginBtn(event)}
//           >
//             <img
//               src={require(`../../../../renderer/assets/images/clever.png`)}
//               alt="clever-image"
//               className="clever_image"
//               draggable="false"
//             />
//           </button>
//         </div>
//         <div className="classlink_container">
//           <button
//             className="classlink_login_btn"
//             id="classlink_login_btn"
//             type="button"
//             onPointerDown={() => handleClassLinkBtn('down')}
//             onPointerOut={() => handleClassLinkBtn('out')}
//             onPointerUp={() => handleClassLinkBtn('up')}
//             onKeyDown={(event) => focusClasslinkLoginBtn(event)}
//           >
//             <img
//               src={require(`../../../../renderer/assets/images/classlink.png`)}
//               alt="classLink-image"
//               className="classlink_image"
//               draggable="false"
//             />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginCard;
//
// import React from "react";

const LoginCard = () => {
  console.log('login card loaded');
  return <div>This is Login Card</div>;
};

export default LoginCard;
